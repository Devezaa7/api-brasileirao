// src/middlewares/errorHandler.js
export default function errorHandler(err, req, res, next) {
  // Log completo no terminal (útil para debug)
  console.error("Erro capturado:", err);

  // Tratamento de erros de validação do Sequelize
  if (err && err.name === 'SequelizeValidationError') {
    const mensagens = err.errors.map(e => e.message);
    return res.status(400).json({ error: mensagens });
  }

  // Tratamento de erros de chave única (ex.: SequelizeUniqueConstraintError)
  if (err && err.name === 'SequelizeUniqueConstraintError') {
    const mensagens = err.errors.map(e => e.message);
    return res.status(409).json({ error: mensagens });
  }

  // Erros custom (se você lançar novos Error('...') em serviços/controllers)
  if (err && err.status && err.message) {
    return res.status(err.status).json({ error: err.message });
  }

  // Erro padrão de servidor
  return res.status(500).json({ error: err?.message || 'Erro interno no servidor' });
}
