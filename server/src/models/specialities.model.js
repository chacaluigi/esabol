import { sequelize } from '../config/database.js';
import { DataTypes } from 'sequelize';

const Speciality = sequelize.define('Speciality', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

export default Speciality;
