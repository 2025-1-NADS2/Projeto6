import Evento from "../models/eventos.js";

const criarEvento = async (req, res) => {
  try {
    const { titulo, descricao, data, local } = req.body;
    const imagem = req.file ? req.file.filename : null;

    if (!imagem) {
      return res.status(400).json({ mensagem: "Imagem obrigatória!" });
    }

    const novoEvento = await Evento.create({
      titulo,
      descricao,
      data,
      local,
      imagem,
      UserId: req.userId // vem do token
    });

    res.status(201).json({
      mensagem: "Evento criado com sucesso!",
      evento: novoEvento
    });
  } catch (erro) {
    res.status(500).json({ mensagem: "Erro ao criar evento.", erro: erro.message });
  }
};
export default {
  criarEvento
};
