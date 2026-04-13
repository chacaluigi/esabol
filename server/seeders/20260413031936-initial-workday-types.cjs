'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.bulkInsert('workday_types', [
      {
        name: 'Día de trabajo',
        color: '#fff085',
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        name: 'Guardia entrante',
        color: '#ff6467',
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        name: 'Guardia saliente',
        color: '#ff8904',
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        name: 'Día de permiso',
        color: '#7bf1a8',
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        name: 'Vacación',
        color: '#51a2ff',
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        name: 'Comisión vuelo',
        color: '#67787c',
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        name: 'Comisión varios',
        color: '#cad5e2',
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        name: 'Otro',
        color: '#7c6d67',
        created_at: new Date(),
        updated_at: new Date()
      }
    ], {});
  },

  async down(queryInterface, Sequelize) {
    return queryInterface.bulkDelete('workday_types', {
      name: ['Día de trabajo', 'Guardia entrante', 'Guardia saliente', 'Día de permiso', 'Vacación', 'Comisión vuelo', 'Comisión varios', 'Otro']
    }, {});
  }
};
