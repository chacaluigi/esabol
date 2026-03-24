'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.removeConstraint('positions', 'positions_pos_abbr_key');
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.addConstraint('positions', {
      fields: ['pos_abbr'],
      type: 'unique',
      name: 'positions_pos_abbr_key'
    });
  }
};