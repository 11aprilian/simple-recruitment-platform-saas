const db = require("../models");

//public apply
exports.apply = async (req, res, next) => {
  try {
    const {
      positionId,
      fullName,
      email,
      phone,
      education,
      experience,
      resumeUrl,
    } = req.body;

    // position must be active
    const position = await db.Position.findOne({
      where: { id: positionId, isActive: true },
    });

    if (!position) {
      return res.status(404).json({ message: "Position not found" });
    }

    const applicant = await db.Applicant.create({
      positionId,
      fullName,
      email,
      phone,
      education,
      experience,
      resumeUrl,
      status: "APPLIED",
    });

    res.status(201).json(applicant);
  } catch (err) {
    next(err);
  }
};

//get applicants
exports.findAll = async (req, res, next) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const offset = (page - 1) * limit;

    const wherePosition = {
      companyId: req.user.companyId,
    };

    if (req.query.positionId) {
      wherePosition.id = req.query.positionId;
    }

    const { rows, count } = await db.Applicant.findAndCountAll({
      limit,
      offset,
      include: {
        model: db.Position,
        where: wherePosition,
        attributes: ["id", "title"],
      },
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

//applicants detail
exports.findOne = async (req, res, next) => {
  try {
    const applicant = await db.Applicant.findOne({
      where: { id: req.params.id },
      include: {
        model: db.Position,
        where: { companyId: req.user.companyId },
        attributes: ["id", "title"],
      },
    });

    if (!applicant) {
      return res.status(404).json({ message: "Applicant not found" });
    }

    res.json(applicant);
  } catch (err) {
    next(err);
  }
};

//update applicants status
exports.updateStatus = async (req, res, next) => {
  try {
    const { status } = req.body;

    const applicant = await db.Applicant.findOne({
      where: { id: req.params.id },
      include: {
        model: db.Position,
        where: { companyId: req.user.companyId },
      },
    });

    if (!applicant) {
      return res.status(404).json({ message: "Applicant not found" });
    }

    await applicant.update({ status });
    res.json(applicant);
  } catch (err) {
    next(err);
  }
};

//update applicants notes
exports.updateNotes = async (req, res, next) => {
  try {
    const { notes } = req.body;

    const applicant = await db.Applicant.findOne({
      where: { id: req.params.id },
      include: {
        model: db.Position,
        where: { companyId: req.user.companyId },
      },
    });

    if (!applicant) {
      return res.status(404).json({ message: "Applicant not found" });
    }

    await applicant.update({ notes });
    res.json(applicant);
  } catch (err) {
    next(err);
  }
};

//delete applicants
exports.remove = async (req, res, next) => {
  try {
    const applicant = await db.Applicant.findOne({
      where: { id: req.params.id },
      include: {
        model: db.Position,
        where: { companyId: req.user.companyId },
      },
    });

    if (!applicant) {
      return res.status(404).json({ message: "Applicant not found" });
    }

    await applicant.destroy();
    res.json({ message: "Applicant deleted" });
  } catch (err) {
    next(err);
  }
};
