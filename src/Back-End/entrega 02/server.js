const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const helmet = require("helmet");
const compression = require("compression");
const rateLimit = require("express-rate-limit");
const sequelize = require("./config/db");

dotenv.config();

const app = express();

// Middlewares globais
app.use(cors());
app.use(helmet());
app.use(compression());
app.use(express.json());
app.use("/uploads", express.static("uploads"));

// Rate Limiter
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutos
  max: 100, // limite por IP
});
app.use(limiter);

// Teste de rota raiz
app.get("/", (req, res) => {
  res.send("API está funcionando! 🚀");
});

// Iniciar servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});