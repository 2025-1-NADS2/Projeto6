import { Sequelize } from "sequelize";
import dotenv from "dotenv";

dotenv.config();

const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASS,
  {
    host: process.env.DB_HOST,
    dialect: "mysql",
    port: process.env.DB_PORT,
    logging: false,
  }
);

sequelize
  .authenticate()
  .then(() => console.log("Conexão com o banco de dados bem-sucedida!"))
  .catch((err) => console.error("Erro ao conectar com o banco:", err));

export default sequelize;