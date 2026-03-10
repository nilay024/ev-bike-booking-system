import express from 'express';

import authRoutes from '../modules/auth/route.js';
import bikeRoutes from '../modules/bike/route.js';
import bookingRoutes from '../modules/booking/route.js';

const router = express.Router();

router.use('/auth', authRoutes);
router.use('/bikes', bikeRoutes);
router.use('/bookings', bookingRoutes);

// Health check or welcome route
router.get('/', (req, res) => {
  res.send('Welcome to the EV Bike Booking System API!');
});

export default router;
