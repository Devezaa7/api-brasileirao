import express from 'express';
import dotenv from 'dotenv';
import router from './routes/timeRoutes.js';
import sequelize from './config/database.js';
import Time from './models/timeModel.js'; // garante que o model é carregado

dotenv.config();

const app = express();

// 🔹 Middleware para ler JSON e formulários
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// 🔹 Prefixo das rotas da API
app.use('/api', router);

// 🔹 Teste rápido (opcional) — rota raiz
app.get('/', (req, res) => {
  res.send('API do Brasileirão está rodando! ⚽');
});

// 🔹 Conexão e sincronização do banco
async function syncDb() {
  try {
    await sequelize.authenticate();
    console.log('Conexão com o banco estabelecida com sucesso.');

    await sequelize.sync({ alter: true }); // cria/atualiza o banco conforme os models
    console.log('Banco sincronizado com sucesso.');
  } catch (err) {
    console.error('Erro ao sincronizar DB:', err);
  }
}

syncDb();

export default app;
