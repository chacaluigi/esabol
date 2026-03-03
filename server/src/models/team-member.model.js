import { DataTypes } from 'sequelize';
import { sequelize } from '../config/database.js';

const TeamMember = sequelize.define(
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

export default TeamMember;
