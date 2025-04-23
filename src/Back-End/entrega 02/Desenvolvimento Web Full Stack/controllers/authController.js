import User from '../models/user.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

// Cadastro de usuário
export const register = async (req, res) => {
  const { nome, email, senha } = req.body;

  try {
    const existeUsuario = await User.findOne({ where: { email } });
    if (existeUsuario) {
      return res.status(400).json({ mensagem: "E-mail já cadastrado." });
    }

    const senhaHash = await bcrypt.hash(senha, 10);
    const novoUsuario = await User.create({ nome, email, senha: senhaHash });

    res.status(201).json({
      mensagem: "Usuário cadastrado com sucesso!",
      usuario: novoUsuario,
    });
  } catch (erro) {
    res.status(500).json({ mensagem: "Erro ao cadastrar usuário.", erro });
  }
};

// Login do usuário
export const login = async (req, res) => {
  const { email, senha } = req.body;

  try {
    const usuario = await User.findOne({ where: { email } });
    if (!usuario) {
      return res.status(400).json({ mensagem: "Usuário não encontrado." });
    }

    const senhaCorreta = await bcrypt.compare(senha, usuario.senha);
    if (!senhaCorreta) {
      return res.status(401).json({ mensagem: "Senha incorreta." });
    }

    const token = jwt.sign({ id: usuario.id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    res.json({ mensagem: "Login realizado com sucesso!", token });
  } catch (erro) {
    res.status(500).json({ mensagem: "Erro ao fazer login.", erro });
  }
};
