import { sequelize } from '../config/database.js';
import { DataTypes } from 'sequelize';

export const Role = sequelize.define('Role', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  name: DataTypes.STRING,
});
