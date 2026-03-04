import { sequelize } from '../config/database.js';
import { DataTypes } from 'sequelize';

const User = sequelize.define('User', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: 'user_email_unique',
  },
  username: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: 'user_username_unique',
  },
  active: {
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
