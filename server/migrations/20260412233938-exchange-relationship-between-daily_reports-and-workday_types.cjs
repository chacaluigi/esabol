'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const transaction = await queryInterface.sequelize.transaction();

    try {
      await queryInterface.removeConstraint(
        'workday_types',
        'workday_types_workday_type_id_fkey',
        { transaction }
      );

      await queryInterface.removeColumn(
        'workday_types',
        'workday_type_id',
        { transaction }
      );

      await queryInterface.addConstraint('daily_reports', {
        fields: ['workday_type_id'],
        type: 'foreign key',
        name: 'daily_reports_workday_type_id_fkey',
        references: {
          table: 'workday_types',
          field: 'id'
        },
        onDelete: 'RESTRICT',
        onUpdate: 'CASCADE',
        transaction
      });

      await transaction.commit();
    } catch (error) {
      await transaction.rollback();
      throw error;
    }
  },

  async down(queryInterface, Sequelize) {
    const transaction = await queryInterface.sequelize.transaction();

    try {
      await queryInterface.removeConstraint(
        'daily_reports',
        'daily_reports_workday_type_id_fkey',
        { transaction }
      );

      await queryInterface.addColumn(
        'workday_types',
        'workday_type_id',
        {
          type: Sequelize.INTEGER,
          allowNull: true,
        },
        { transaction }
      );

      await queryInterface.addConstraint('workday_types', {
        fields: ['workday_type_id'],
        type: 'foreign key',
        name: 'workday_types_workday_type_id_fkey',
        references: {
          table: 'daily_reports',
          field: 'id'
        },
        onDelete: 'SET NULL',
        onUpdate: 'CASCADE',
        transaction
      });

      await transaction.commit();
    } catch (error) {
      await transaction.rollback();
      throw error;
    }
  }
};
