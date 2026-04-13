import { sequelize } from '../config/database.js';
import { DataTypes } from 'sequelize';

const WorkdayType = sequelize.define('WorkdayType', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  color: {
    type: DataTypes.STRING(7),
    allowNull: true,
    defaultValue: '#3b82f6'
  }
});

export default WorkdayType;
