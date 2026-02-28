import { DataTypes } from 'sequelize';
import { sequelize } from '../config/database';

sequelize.define(
  'TeamMember',
  {
    teamId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  { createdAt: 'joinedAt', updatedAt: false },
);
