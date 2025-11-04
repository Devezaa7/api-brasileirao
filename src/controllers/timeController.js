import { Op } from 'sequelize';
import Time from '../models/timeModel.js';

class TimeController {
  // Criar time
  static async create(req, res, next) {
    try {
      const { nome, pontos, vitorias, empates, derrotas, posicao } = req.body;
      const time = await Time.create({ nome, pontos, vitorias, empates, derrotas, posicao });
      res.status(201).json(time);
    } catch (err) {
      next(err);
    }
  }

  // Buscar todos (com filtros)
  static async findAll(req, res, next) {
    try {
      const { nome, pontosMin, pontosMax } = req.query;
      const where = {};

      if (nome) where.nome = { [Op.like]: `%${nome}%` };
      if (pontosMin || pontosMax) {
        where.pontos = {};
        if (pontosMin) where.pontos[Op.gte] = pontosMin;
        if (pontosMax) where.pontos[Op.lte] = pontosMax;
      }

      const times = await Time.findAll({ where });
      res.status(200).json(times);
    } catch (err) {
      next(err);
    }
  }

  // Buscar por ID
  static async findById(req, res, next) {
    try {
      const { id } = req.params;
      const time = await Time.findByPk(id);
      if (!time) return res.status(404).json({ erro: 'Time não encontrado' });
      res.status(200).json(time);
    } catch (err) {
      next(err);
    }
  }

  // Atualizar time inteiro
  static async update(req, res, next) {
    try {
      const { id } = req.params;
      const [updated] = await Time.update(req.body, { where: { id } });
      if (!updated) return res.status(404).json({ erro: 'Time não encontrado' });
      const time = await Time.findByPk(id);
      res.status(200).json(time);
    } catch (err) {
      next(err);
    }
  }

  // Atualizar apenas os pontos (PATCH)
  static async patchPontos(req, res, next) {
    try {
      const { id } = req.params;
      const { pontos } = req.body;
      const time = await Time.findByPk(id);
      if (!time) return res.status(404).json({ erro: 'Time não encontrado' });

      time.pontos = pontos;
      await time.save();

      res.status(200).json(time);
    } catch (err) {
      next(err);
    }
  }

 // Deletar time
static async remove(req, res, next) {
  try {
    const { id } = req.params;
    const deleted = await Time.destroy({ where: { id } });

    if (deleted) {
      res.status(200).json({ message: `Time com ID ${id} deletado com sucesso.` });
    } else {
      res.status(404).json({ message: `Time com ID ${id} não encontrado.` });
    }
  } catch (err) {
    next(err);
  }
}
// Atualizar apenas a posição (PATCH)
static async patchPosicao(req, res) {
  try {
    const { id } = req.params;
    const { posicao } = req.body;

    const time = await Time.findByPk(id);
    if (!time) {
      return res.status(404).json({ message: 'Time não encontrado' });
    }

    time.posicao = posicao;
    await time.save();

    res.status(200).json({ message: 'Posição atualizada com sucesso!', time });
  } catch (error) {
    res.status(500).json({ message: 'Erro ao atualizar posição', error: error.message });
  }
}
}
export default TimeController;
