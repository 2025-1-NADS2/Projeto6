import express from 'express';
import upload from '../uploadconfig.js';
import eventoController from '../controllers/eventoController.js';
import verifyToken from '../middlewares/verifyToken.js';

const router = express.Router();

router.post("/", verifyToken, upload.single("imagem"), eventoController.criarEvento);

export default router;


