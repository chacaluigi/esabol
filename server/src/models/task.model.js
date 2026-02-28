import { sequelize } from '../config/database.js';
import { DataTypes } from 'sequelize';

sequelize.define('Task', {
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
  assignee_user_id: {
    type: DataTypes.INTEGER,
  },
  assignee_team_id: {
    type: DataTypes.INTEGER,
  },
  priority: {
    type: DataTypes.STRING,
    defaultValue: 'Medium',
    allowNull: false,
  },
  status: {
    type: DataTypes.STRING,
    defaultValue: 'To do',
    allowNull: false,
  },
  estimated_days: {
    type: DataTypes.INTEGER,
  },
  dueDate: {
    type: DataTypes.DATE,
  },
});
