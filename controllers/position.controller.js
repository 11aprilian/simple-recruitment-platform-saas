const db = require("../models");

//create position
exports.create = async (req, res, next) => {
  try {
    const { title, location, type, description, salary } = req.body;

    const position = await db.Position.create({
      companyId: req.user.companyId,
      title,
      location,
      type,
      description,
      salary,
      createdBy: req.user.id,
    });

    res.status(201).json(position);
  } catch (err) {
    next(err);
  }
};

//get positions
exports.findAll = async (req, res, next) => {
  try {
    const page = Math.max(parseInt(req.query.page) || 1, 1);
    const limit = Math.min(parseInt(req.query.limit) || 10, 50);
    const offset = (page - 1) * limit;

    const { rows, count } = await db.Position.findAndCountAll({
      where: { companyId: req.user.companyId },
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

//get positions detail
exports.findOne = async (req, res, next) => {
  try {
    const position = await db.Position.findOne({
      where: {
        id: req.params.id,
        companyId: req.user.companyId,
      },
    });

    if (!position) {
      return res.status(404).json({ message: "Position not found" });
    }

    res.json(position);
  } catch (err) {
    next(err);
  }
};

//update positions
exports.update = async (req, res, next) => {
  try {
    const position = await db.Position.findOne({
      where: {
        id: req.params.id,
        companyId: req.user.companyId,
      },
    });

    if (!position) {
      return res.status(404).json({ message: "Position not found" });
    }

    await position.update(req.body);
    res.json(position);
  } catch (err) {
    next(err);
  }
};

//delete positions
exports.remove = async (req, res, next) => {
  try {
    const position = await db.Position.findOne({
      where: {
        id: req.params.id,
        companyId: req.user.companyId,
      },
    });

    if (!position) {
      return res.status(404).json({ message: "Position not found" });
    }

    await position.destroy();
    res.json({ message: "Position deleted" });
  } catch (err) {
    next(err);
  }
};
