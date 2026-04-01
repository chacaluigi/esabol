'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.changeColumn('tasks', 'priority', {
      type: Sequelize.STRING,
      defaultValue: 'Media',
      allowNull: false,
    });

    await queryInterface.changeColumn('tasks', 'status', {
      type: Sequelize.STRING,
      defaultValue: 'TO_DO',
      allowNull: false,
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.changeColumn('tasks', 'priority', {
      type: Sequelize.STRING,
      defaultValue: 'Medium',
      allowNull: false,
    });

    await queryInterface.changeColumn('tasks', 'status', {
      type: Sequelize.STRING,
      defaultValue: 'To do',
      allowNull: false,
    });
  }
};
