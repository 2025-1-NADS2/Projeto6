import Curso from '../models/Curso.js';

const cursoController = {
  criarCurso: async (req, res) => {
    try {
      const { titulo, descricao, cargaHoraria, nivel, link } = req.body;
      const imagem = req.file ? req.file.filename : null;

      if (!imagem) {
        return res.status(400).json({ message: 'Imagem obrigatória' });
      }

      const novoCurso = await Curso.create({
        titulo,
        descricao,
        cargaHoraria,
        nivel,
        link,
        imagem
      });

      res.status(201).json(novoCurso);
    } catch (error) {
      console.error('Erro ao criar curso:', error);
      res.status(500).json({ message: 'Erro no servidor' });
    }
  },

  listarCursos: async (req, res) => {
    try {
      const cursos = await Curso.findAll();
      res.status(200).json(cursos);
    } catch (error) {
      res.status(500).json({ message: 'Erro ao buscar cursos' });
    }
  }
};

export default cursoController;
