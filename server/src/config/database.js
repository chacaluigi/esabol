import { Sequelize } from 'sequelize';

import { DB_DATABASE, DB_HOST, DB_PASSWORD, DB_USER } from './config.js';

export const sequelize = new Sequelize(DB_DATABASE, DB_USER, DB_PASSWORD, {
  host: DB_HOST,
  dialect: 'postgres',
  define: {
    //para cambiar los nombres de columnas de camelCase a snake_case en la bd
    underscored: true,
    //en false para pluralizar nombres de tablas: User --> users
    freezeTableName: false,
    timestamps: true,
  },
});
