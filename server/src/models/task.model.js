import { sequelize } from '../config/database.js';
import { DataTypes } from 'sequelize';

const Task = sequelize.define('Task', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  description: {
    type: DataTypes.TEXT,
  },
  creatorId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  assigneeTeamId: {
    type: DataTypes.INTEGER,
  },
  priority: {
    type: DataTypes.STRING,
    defaultValue: 'Media',
    allowNull: false,
  },
  status: {
    type: DataTypes.STRING,
    defaultValue: 'TO_DO',
    allowNull: false,
  },
  estimatedDays: {
    type: DataTypes.INTEGER,
  },
  dueDate: {
    type: DataTypes.DATE,
  },
});

export default Task;
