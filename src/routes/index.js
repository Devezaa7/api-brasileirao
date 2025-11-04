import express from 'express';
import timeRoutes from './timeRoutes.js'; // importa o Router de times

const router = express.Router();

// todas as rotas de "times" ficam acessíveis em /api/times
router.use('/times', timeRoutes);

export default router; // exporta Router
