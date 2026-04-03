'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.removeConstraint('tasks', 'tasks_assignee_user_id_fkey');
    await queryInterface.removeColumn('tasks', 'assignee_user_id');
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.addColumn('tasks', 'assignee_user_id', {
      type: Sequelize.INTEGER,
      references: {
        model: 'users',
        key: 'id'
      },
      onUpdate: 'CASCADE',
      onDelete: 'SET NULL'
    });
  }
};
