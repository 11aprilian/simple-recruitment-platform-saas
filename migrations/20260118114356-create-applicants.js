'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('applicants', {
      id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true,
      },
      positionId: {
        type: Sequelize.UUID,
        allowNull: false,
        references: {
          model: 'positions',
          key: 'id',
        },
        onDelete: 'CASCADE',
      },
      fullName: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      email: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      phone: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      education: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      experience: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      resumeUrl: {
        type: Sequelize.STRING,
      },
      status: {
        type: Sequelize.ENUM(
          'APPLIED',
          'REVIEWED',
          'INTERVIEW',
          'ACCEPTED',
          'REJECTED'
        ),
        defaultValue: 'APPLIED',
      },
      notes: {
        type: Sequelize.TEXT,
      },
      createdAt: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      updatedAt: {
        type: Sequelize.DATE,
        allowNull: false,
      },
    })
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('applicants')
    await queryInterface.sequelize.query(
      'DROP TYPE IF EXISTS "enum_applicants_status";'
    )
  },
};
