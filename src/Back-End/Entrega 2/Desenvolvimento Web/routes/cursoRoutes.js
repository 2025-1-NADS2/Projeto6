import express from 'express';
import { criarCurso } from '../controllers/cursoController.js';
import upload from '../uploadconfig.js'; // este é o Multer
import verifyToken from '../middlewares/verifyToken.js';

const router = express.Router();

// rota protegida com token e com envio de imagem
router.post('/api/cursos', upload.single('imagem'), criarCurso);

export default router;

