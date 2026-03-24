'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const indexesToRemove = [
      'ranks_rank_abbr_key', 'ranks_rank_abbr_key1', 'ranks_rank_abbr_key2',
    ];

    for (const indexName of indexesToRemove) {
      try {
        await queryInterface.removeConstraint('ranks', indexName);
      } catch (error) {
        console.log(`el indice ${indexName} no existe.`);
      }
    }

    await queryInterface.addConstraint('ranks', {
      fields: ['rank_abbr'],
      type: 'unique',
      name: 'ranks_rank_abbr_unique'
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeConstraint('ranks', 'ranks_rank_abbr_unique');
  }
};
