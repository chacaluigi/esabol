import { sequelize } from '../config/database.js';
import { DataTypes } from 'sequelize';

export const DailyReport = sequelize.define('DailyReport', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  taskId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  workdayTypeId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  date: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  percentComplete: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  hoursWorked: {
    type: DataTypes.INTEGER,
  },
  attachments: {
    type: DataTypes.ARRAY(DataTypes.STRING),
  },
  comment: {
    type: DataTypes.TEXT,
  },
});
