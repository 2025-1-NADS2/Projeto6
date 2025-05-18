import express from "express";
import upload from "../uploadconfig.js";
import eventoController from "../controllers/eventoController.js";
import verifyToken, { permitirPerfil } from "../middlewares/verifyToken.js";

const router = express.Router();

// Criar evento – apenas para admin
router.post(
  "/",
  verifyToken,
  permitirPerfil("admin"),
  upload.single("imagem"),
  eventoController.criarEvento
);

// Listar eventos – público
router.get("/", eventoController.listarEventos);

// Editar evento – apenas para admin
router.put(
  "/:id",
  verifyToken,
  permitirPerfil("admin"),
  upload.single("imagem"),
  eventoController.editarEvento
);

// Deletar evento – apenas para admin
router.delete(
  "/:id",
  verifyToken,
  permitirPerfil("admin"),
  eventoController.deletarEvento
);

export default router;
