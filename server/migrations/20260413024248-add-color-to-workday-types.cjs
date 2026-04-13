'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn('workday_types', 'color', {
      type: Sequelize.STRING(7),
      allowNull: true,
      defaultValue: '#3b82f6'
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeColumn('workday_types', 'color');
  }
};
