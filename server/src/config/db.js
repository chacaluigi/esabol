import { Sequelize } from 'sequelize';

import { DB_DATABASE, DB_HOST, DB_PASSWORD, DB_USER } from './config.js';

export const sequelize = new Sequelize(DB_DATABASE, DB_USER, DB_PASSWORD, {
  host: DB_HOST,
  dialect: 'postgres',
  define: {
    underscored: true,
    freezeTableName: false,
    timestamps: true,
  },
});
