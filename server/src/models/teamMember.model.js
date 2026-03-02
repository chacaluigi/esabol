import { DataTypes } from 'sequelize';
import { sequelize } from '../config/database';

export const TeamMember = sequelize.define(
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
