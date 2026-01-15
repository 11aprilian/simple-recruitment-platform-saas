const db = require("../models");
const { hashPassword } = require("../utils/password");

//create recruiter(admin only)
exports.create = async (req, res, next) => {
  try {
    const { email, password, fullName, role } = req.body;

    // role validation (admin cannot be created here)
    if (role !== "RECRUITER") {
      return res.status(400).json({ message: "Invalid role" });
    }

    const exists = await db.User.findOne({ where: { email } });
    if (exists) {
      return res.status(400).json({ message: "Email already used" });
    }

    const user = await db.User.create({
      companyId: req.user.companyId,
      email,
      password: await hashPassword(password),
      fullName,
      role: "RECRUITER",
    });

    res.status(201).json({
      id: user.id,
      email: user.email,
      fullName: user.fullName,
      role: user.role,
    });
  } catch (err) {
    next(err);
  }
};

//get users
exports.findAll = async (req, res, next) => {
  try {
    const page = Math.max(parseInt(req.query.page) || 1, 1);
    const limit = Math.min(parseInt(req.query.limit) || 10, 50);
    const offset = (page - 1) * limit;

    const { rows, count } = await db.User.findAndCountAll({
      where: { companyId: req.user.companyId },
      attributes: { exclude: ["password"] },
      limit,
      offset,
      order: [["createdAt", "DESC"]],
    });

    res.json({
      data: rows,
      meta: {
        page,
        limit,
        totalItems: count,
        totalPages: Math.ceil(count / limit),
      },
    });
  } catch (err) {
    next(err);
  }
};

//get users detail
exports.findOne = async (req, res, next) => {
  try {
    const user = await db.User.findOne({
      where: {
        id: req.params.id,
        companyId: req.user.companyId,
      },
      attributes: ["id", "email", "fullName", "role", "createdAt"],
    });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json(user);
  } catch (err) {
    next(err);
  }
};

//detail users
exports.remove = async (req, res, next) => {
  try {
    const user = await db.User.findOne({
      where: {
        id: req.params.id,
        companyId: req.user.companyId,
      },
    });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // admin cannot delete themselves
    if (user.id === req.user.id) {
      return res.status(400).json({ message: "Cannot delete yourself" });
    }

    await user.destroy();
    res.json({ message: "User deleted" });
  } catch (err) {
    next(err);
  }
};
