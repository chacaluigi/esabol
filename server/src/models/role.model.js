import { sequelize } from '../config/database.js';
import { DataTypes } from 'sequelize';

sequelize.define('Role', {
  roleId: DataTypes.INTEGER,
  name: DataTypes.STRING,
});
