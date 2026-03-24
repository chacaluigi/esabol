'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    const indexesToRemove = [
      'users_email_key', 'users_email_key1', 'users_email_key2',
      'users_email_key3', 'users_email_key4',
      'users_username_key', 'users_username_key1',
      'users_username_key2', 'users_username_key3', 'users_username_key4'
    ];

    for (const indexName of indexesToRemove) {
      try {
        await queryInterface.removeConstraint('users', indexName);
      } catch (error) {
        console.log(`el indice ${indexName} no existe.`);
      }
    }

    await queryInterface.addConstraint('users', {
      fields: ['email'],
      type: 'unique',
      name: 'users_email_unique'
    });

    await queryInterface.addConstraint('users', {
      fields: ['username'],
      type: 'unique',
      name: 'users_username_unique'
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeConstraint('users', 'users_email_unique');
    await queryInterface.removeConstraint('users', 'users_username_unique');
  }
};