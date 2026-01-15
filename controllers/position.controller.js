const db = require('../models')

//create position
exports.create = async (req, res, next) => {
  try {
    const { title, location, type, description, salary } = req.body

    const position = await db.Position.create({
      companyId: req.user.companyId,
      title,
      location,
      type,
      description,
      salary,
      createdBy: req.user.id,
    })

    res.status(201).json(position)
  } catch (err) {
    next(err)
  }
}

//get positions
exports.findAll = async (req, res, next) => {
  try {
    const positions = await db.Position.findAll({
      where: { companyId: req.user.companyId },
      order: [['createdAt', 'DESC']],
    })

    res.json(positions)
  } catch (err) {
    next(err)
  }
}

//get positions detail
exports.findOne = async (req, res, next) => {
  try {
    const position = await db.Position.findOne({
      where: {
        id: req.params.id,
        companyId: req.user.companyId,
      },
    })

    if (!position) {
      return res.status(404).json({ message: 'Position not found' })
    }

    res.json(position)
  } catch (err) {
    next(err)
  }
}

//update positions
exports.update = async (req, res, next) => {
  try {
    const position = await db.Position.findOne({
      where: {
        id: req.params.id,
        companyId: req.user.companyId,
      },
    })

    if (!position) {
      return res.status(404).json({ message: 'Position not found' })
    }

    await position.update(req.body)
    res.json(position)
  } catch (err) {
    next(err)
  }
}

//delete positions
exports.remove = async (req, res, next) => {
  try {
    const position = await db.Position.findOne({
      where: {
        id: req.params.id,
        companyId: req.user.companyId,
      },
    })

    if (!position) {
      return res.status(404).json({ message: 'Position not found' })
    }

    await position.destroy()
    res.json({ message: 'Position deleted' })
  } catch (err) {
    next(err)
  }
}
