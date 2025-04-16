const { Sequelize } = require("sequelize");
require("dotenv").config();

const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASS,
  {
    host: process.env.DB_HOST,
    dialect: "mysql",
    port: process.env.DB_PORT,
    logging: false, // deixa o console mais limpo
  }
);

sequelize.authenticate()
  .then(() => console.log("Conexão com o banco de dados bem-sucedida!"))
  .catch(err => console.error("Erro ao conectar com o banco:", err));

module.exports = sequelize;