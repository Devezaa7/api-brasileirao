import express from 'express';
import TimeController from '../controllers/timeController.js';

const router = express.Router();

router.post('/', TimeController.create);
router.get('/', TimeController.findAll);
router.get('/:id', TimeController.findById);
router.put('/:id', TimeController.update);
router.patch('/:id/pontos', TimeController.patchPontos);
router.delete('/:id', TimeController.remove);
router.patch('/:id/posicao', TimeController.patchPosicao);


export default router;
