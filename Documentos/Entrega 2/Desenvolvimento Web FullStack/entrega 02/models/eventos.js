import { DataTypes } from 'sequelize';
import sequelize from '../config/db.js';
import User from './user.js';

const Evento = sequelize.define('Evento', {
  titulo: {
    type: DataTypes.STRING,
    allowNull: false
  },
  descricao: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  data: {
    type: DataTypes.STRING,
    allowNull: false
  },
  local: {
    type: DataTypes.STRING,
    allowNull: false
  },
  imagem: {
    type: DataTypes.STRING,
    allowNull: false
  }
});

// Relacionamentos
Evento.belongsTo(User);  // cria a chave estrangeira UserId
User.hasMany(Evento);    // um usuário pode ter vários eventos

export default Evento;
