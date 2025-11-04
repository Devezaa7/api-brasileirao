import express from 'express';
import timeController from '../controllers/timeController.js';

const router = express.Router();

router.post('/', timeController.create);
router.get('/', timeController.findAll);
router.get('/:id', timeController.findById);
router.put('/:id', timeController.update);
router.patch('/:id/pontos', timeController.patchPontos);
router.delete('/:id', timeController.remove);

export default router;
