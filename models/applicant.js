module.exports = (sequelize, DataTypes) => {
  const Applicant = sequelize.define(
    'Applicant',
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },

      positionId: {
        type: DataTypes.UUID,
        allowNull: false,
      },

      fullName: {
        type: DataTypes.STRING,
        allowNull: false,
      },

      email: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          isEmail: true,
        },
      },

      phone: {
        type: DataTypes.STRING,
        allowNull: false,
      },

      education: {
        type: DataTypes.STRING,
        allowNull: false,
      },

      experience: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0,
      },

      resumeUrl: {
        type: DataTypes.STRING,
        allowNull: false,
      },

      status: {
        type: DataTypes.ENUM(
          'APPLIED',
          'REVIEWED',
          'INTERVIEW',
          'ACCEPTED',
          'REJECTED'
        ),
        allowNull: false,
        defaultValue: 'APPLIED',
      },

      notes: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
    },
    {
      tableName: 'applicants',
      timestamps: true,
    }
  )

  return Applicant
}
