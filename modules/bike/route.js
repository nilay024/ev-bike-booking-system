import express from 'express';
import BikeController from './controller.js';

const router = express.Router();

router.get('/', BikeController.getAllBikes);

router.get('/:id', BikeController.getBikeById);

export default router;
