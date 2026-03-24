'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addConstraint('team_members', {
      fields: ['team_id', 'user_id'],
      type: 'unique',
      name: 'team_members_team_user_unique'
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeConstraint('team_members', 'team_members_team_user_unique');
  }
};
