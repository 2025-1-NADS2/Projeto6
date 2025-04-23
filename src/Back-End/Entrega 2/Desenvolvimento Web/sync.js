import sequelize from "./config/db.js";
import User from "./models/user.js";
import Evento from "./models/eventos.js";

async function syncDB() {
  try {
    await sequelize.sync({ force: true });
    console.log("Tabelas criadas com sucesso!");
    process.exit();
  } catch (err) {
    console.error("Erro ao criar tabelas:", err);
  }
}

syncDB();