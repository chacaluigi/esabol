'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    // Eliminamos el índice generado automáticamente por Sequelize
    await queryInterface.removeConstraint('positions', 'positions_pos_abbr_key');
  },

  async down(queryInterface, Sequelize) {
    // Si deshacemos la migración, restauramos el índice original
    await queryInterface.addConstraint('positions', {
      fields: ['pos_abbr'],
      type: 'unique',
      name: 'positions_pos_abbr_key'
    });
  }
};