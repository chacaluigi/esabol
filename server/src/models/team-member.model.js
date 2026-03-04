import { DataTypes } from 'sequelize';
import { sequelize } from '../config/database.js';

const TeamMember = sequelize.define(
  'TeamMember',
  {
    teamId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      unique: 'team_user_unique',
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      unique: 'team_user_unique',
    },
  },
  { createdAt: 'joinedAt', updatedAt: false },
);

export default TeamMember;
