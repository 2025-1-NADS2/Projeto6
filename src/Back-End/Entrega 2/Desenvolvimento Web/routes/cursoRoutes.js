import express from 'express';
import cursoController from '../controllers/cursoController.js';
import upload from '../uploadconfig.js';
import verifyToken from '../middlewares/verifyToken.js';

const router = express.Router();

// Criar curso
router.post('/', verifyToken, upload.single('imagem'), cursoController.criarCurso);

// Listar todos os cursos
router.get('/', cursoController.listarCursos);

// Atualizar curso
router.put('/:id', verifyToken, upload.single('imagem'), cursoController.atualizarCurso);

// Deletar curso
router.delete('/:id', verifyToken, cursoController.deletarCurso);

export default router;
