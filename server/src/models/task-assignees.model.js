import { DataTypes } from 'sequelize';
import { sequelize } from '../config/database.js';

const TaskAssignee = sequelize.define(
  'TaskAssignee',
  {
    taskId: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false,
    },
    userId: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false,
    },
  },
);

export default TaskAssignee;
