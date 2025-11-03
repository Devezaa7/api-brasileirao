import express from 'express';
import timeController from '../controllers/timeController.js';

const router = express.Router();

router.post('/times', timeController.create);
router.get('/times', timeController.findAll);
router.get('/times/:id', timeController.findById);
router.put('/times/:id', timeController.update);
router.patch('/times/:id/pontos', timeController.patchPontos);
router.delete('/times/:id', timeController.remove);

export default router;