import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import helmet from "helmet";
import compression from "compression";
import rateLimit from "express-rate-limit";
import sequelize from "./config/db.js";

import authRoutes from "./routes/authRoutes.js";
import eventoRoutes from "./routes/eventoRoutes.js";

dotenv.config();

const app = express();
//middlewares globais
app.use(cors());
app.use(helmet());
app.use(compression());
app.use(express.json());
app.use("/uploads", express.static("uploads"));

// Rotas
app.use("/auth", authRoutes);
app.use("/eventos", eventoRoutes);

// Rate Limiter
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
});
app.use(limiter);

// Teste
app.get("/", (req, res) => {
  res.send("API está funcionando!");
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});



