import { DataTypes } from 'sequelize';
import sequelize from '../config/db.js';

const User = sequelize.define('User', {
  nome: DataTypes.STRING,
  email: DataTypes.STRING,
  senha: DataTypes.STRING
});

export default User;
