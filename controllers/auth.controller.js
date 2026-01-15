const db = require('../models')
const { hashPassword, comparePassword } = require('../utils/password')
const { signToken } = require('../utils/jwt')

//create user admin & company
exports.register = async (req, res, next) => {
  try {
    const { companyName, email, password, fullName, phone } = req.body

    const existingUser = await db.User.findOne({ where: { email } })
    if (existingUser) {
      return res.status(400).json({ message: 'Email already used' })
    }

    const company = await db.Company.create({
      name: companyName,
      email,
      phone,
    })

    const user = await db.User.create({
      companyId: company.id,
      email,
      password: await hashPassword(password),
      fullName,
      role: 'ADMIN',
    })

    const token = signToken({
      id: user.id,
      role: user.role,
      companyId: company.id,
    })

    res.status(201).json({
      token,
      user: {
        id: user.id,
        email: user.email,
        role: user.role,
        companyId: company.id,
      },
    })
  } catch (err) {
    next(err)
  }
}

//user login
exports.login = async (req, res, next) => {
  try {
    const { email, password } = req.body

    const user = await db.User.findOne({ where: { email } })
    if (!user) {
      return res.status(401).json({ message: 'Invalid credentials' })
    }

    const isValid = await comparePassword(password, user.password)
    if (!isValid) {
      return res.status(401).json({ message: 'Invalid credentials' })
    }

    const token = signToken({
      id: user.id,
      role: user.role,
      companyId: user.companyId,
    })

    res.json({
      token,
      user: {
        id: user.id,
        email: user.email,
        role: user.role,
        companyId: user.companyId,
      },
    })
  } catch (err) {
    next(err)
  }
}
