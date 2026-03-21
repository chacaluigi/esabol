import { sequelize } from '../config/database.js';
import { DataTypes } from 'sequelize';

const Rank = sequelize.define('Rank', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  rankAbbr: {
    type: DataTypes.STRING,
    unique: 'ranks_rank_abbr_unique',
    allowNull: false,
  },
  orderPriority: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
});

export default Rank;
