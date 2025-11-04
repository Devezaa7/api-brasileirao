import express from 'express';
import morgan from 'morgan';
import routes from './routes/index.js';       // Router principal
import errorHandler from './middlewares/errorHandler.js';
import sequelize from './config/database.js';
import dotenv from 'dotenv';

dotenv.config(); // carrega variáveis do .env

const app = express();
const PORT = process.env.PORT || 3000;

// 🔹 Middleware para JSON e logs
app.use(express.json());
app.use(morgan('dev'));

// 🔹 Rota de boas-vindas (para testar no navegador)
app.get('/', (req, res) => {
  res.send('API do Brasileirão está rodando!');
});

// 🔹 Rotas principais (Router do Express)
app.use('/api', routes);

// 🔹 Middleware global de erro (sempre o último)
app.use(errorHandler);

// 🔹 Sincroniza o banco e inicia o servidor
sequelize.sync()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Servidor rodando em http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.error('Erro ao conectar no banco:', err);
  });

export default app;
