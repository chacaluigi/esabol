'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * IMPORTANTE: Si ya existe un índice único genérico, 
     * Sequelize podría dar error al intentar crear uno nuevo.
     * Primero lo añadimos con el nombre que queremos.
     */
    await queryInterface.addConstraint('positions', {
      fields: ['pos_abbr'],
      type: 'unique',
      name: 'positions_pos_abbr_unique'
    });
  },

  async down(queryInterface, Sequelize) {
    // Para revertir, simplemente eliminamos la restricción por su nombre
    await queryInterface.removeConstraint('positions', 'positions_pos_abbr_unique');
  }
};