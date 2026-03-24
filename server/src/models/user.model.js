import { sequelize } from '../config/database.js';
import { DataTypes } from 'sequelize';

const User = sequelize.define('User', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  rankId: {
    type: DataTypes.INTEGER,
    //allowNull: false,
  },
  positionId: {
    type: DataTypes.INTEGER,
    //allowNull: false,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  surname: {
    type: DataTypes.STRING,
    //allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: 'users_email_unique',
  },
  username: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: 'users_username_unique',
  },
  status: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: true,
  },
  roleId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
});

export default User;
