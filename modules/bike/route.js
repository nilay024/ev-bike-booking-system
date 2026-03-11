import express from 'express';
import BikeController from './controller.js';

const router = express.Router();

/**
 * @route POST /api/bikes
 * @desc Get all bikes
 * @access Public
 */
router.get('/', BikeController.getAllBikes);

/**
 * @route GET /api/bikes/:id
 * @desc Get a bike by ID
 * @access Public
 */
router.get('/:id', BikeController.getBikeById);

export default router;
