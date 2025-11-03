import express from 'express';
import dotenv from 'dotenv';
import router from './routes/timeRoutes.js';
import sequelize from './config/database.js';
import Time from './models/timeModel.js'; // garante que o model é carregado

dotenv.config();

const app = express();
app.use(express.json());
app.use('/api', router);

async function syncDb() {
  try {
    await sequelize.authenticate();
    await sequelize.sync();
    console.log('Banco sincronizado com sucesso');
  } catch (err) {
    console.error('Erro ao sincronizar DB:', err);
  }
}

syncDb();

export default app;