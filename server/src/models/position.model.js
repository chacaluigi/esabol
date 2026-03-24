import { sequelize } from '../config/database.js';
import { DataTypes } from 'sequelize';

const Position = sequelize.define('Position', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  posAbbr: {
    type: DataTypes.STRING,
    unique: 'positions_pos_abbr_unique',
    allowNull: false,
  },
  orderPriority: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
});

export default Position;
