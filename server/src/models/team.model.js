import { DataTypes } from 'sequelize';
import { sequelize } from '../config/database.js';

sequelize.define('Team', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  leaderUserId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
});
