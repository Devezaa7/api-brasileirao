
import Time from '../models/timeModel.js';
export default {

  async create(req, res) {
    try {
      const { nome, pontos, vitorias, empates, derrotas, posicao } = req.body;
      const novo = await Time.create({ nome, pontos, vitorias, empates, derrotas, posicao });
      return res.status(201).json(novo);
    } catch (err) {
      console.error(err);
      return res.status(500).json({ error: 'Erro ao criar time' });
    }
  },

  async findAll(req, res) {
    try {
      const times = await Time.findAll({ order: [['posicao', 'ASC'], ['pontos', 'DESC']] });
      return res.json(times);
    } catch (err) {
      console.error(err);
      return res.status(500).json({ error: 'Erro ao listar times' });
    }
  },

  async findById(req, res) {
    try {
      const { id } = req.params;
      const time = await Time.findByPk(id);
      if (!time) return res.status(404).json({ error: 'Time não encontrado' });
      return res.json(time);
    } catch (err) {
      console.error(err);
      return res.status(500).json({ error: 'Erro ao buscar time' });
    }
  },

  async update(req, res) {
    try {
      const { id } = req.params;
      const campos = req.body;
      const [linhas] = await Time.update(campos, { where: { id } });
      if (linhas === 0) return res.status(404).json({ error: 'Time não encontrado' });
      const time = await Time.findByPk(id);
      return res.json(time);
    } catch (err) {
      console.error(err);
      return res.status(500).json({ error: 'Erro ao atualizar time' });
    }
  },

  async patchPontos(req, res) {
    try {
      const { id } = req.params;
      const { pontos } = req.body;
      const time = await Time.findByPk(id);
      if (!time) return res.status(404).json({ error: 'Time não encontrado' });
      time.pontos = pontos;
      await time.save();
      return res.json(time);
    } catch (err) {
      console.error(err);
      return res.status(500).json({ error: 'Erro ao atualizar pontos' });
    }
  },

  async remove(req, res) {
    try {
      const { id } = req.params;
      const linhas = await Time.destroy({ where: { id } });
      if (linhas === 0) return res.status(404).json({ error: 'Time não encontrado' });
      return res.status(204).send();
    } catch (err) {
      console.error(err);
      return res.status(500).json({ error: 'Erro ao deletar time' });
    }
  }
};
