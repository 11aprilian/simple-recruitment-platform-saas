const { DataTypes } = require('sequelize')
const sequelize = require('../config/database')

const db = {}

db.sequelize = sequelize
db.Sequelize = DataTypes

// models
db.Company = require('./company')(sequelize, DataTypes)
db.User = require('./user')(sequelize, DataTypes)
db.Position = require('./position')(sequelize, DataTypes)
db.Applicant = require('./applicant')(sequelize, DataTypes)

// relations
db.Company.hasMany(db.User, { foreignKey: 'companyId' })
db.User.belongsTo(db.Company, { foreignKey: 'companyId' })

db.Company.hasMany(db.Position, { foreignKey: 'companyId' })
db.Position.belongsTo(db.Company, { foreignKey: 'companyId' })

db.User.hasMany(db.Position, { foreignKey: 'createdBy' })
db.Position.belongsTo(db.User, {
  foreignKey: 'createdBy',
  as: 'creator',
})

db.Position.hasMany(db.Applicant, { foreignKey: 'positionId' })
db.Applicant.belongsTo(db.Position, { foreignKey: 'positionId' })

module.exports = db
