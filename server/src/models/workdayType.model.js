import { sequelize } from '../config/database.js';
import { DataTypes } from 'sequelize';

sequelize.define('WorkdayType', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});
