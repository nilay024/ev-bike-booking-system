import mongoose from 'mongoose';
import { errorResponse, successResponse } from '../../utils/response.js';
import Bike from '../bike/schema.js';
import Booking from './schema.js';

class BookingController {
  // User: create booking
  async createBooking(req, res) {
    try {
      const allowMultipleBikesPerUser = false; // Set to true if users can book multiple bikes at the same date/time

      const { bikeId, date, time, city } = req.body;

      const userId = new mongoose.Types.ObjectId(req.user.id);

      const bike = await Bike.findById(bikeId).select('availability bikeName').lean();

      if (!bike) return errorResponse({ res, message: 'Bike not found', statusCode: 404 });
      if (!bike.availability) return errorResponse({ res, message: 'Bike not available' });

      // Prevent double booking for same bike/date/time
      const existingBooking = await Booking.findOne({ bikeId, date, time });
      if (existingBooking)
        return errorResponse({ res, message: 'Bike already booked for this slot' });

      // Optional: prevent same user booking multiple bikes at the same date/time
      if (!allowMultipleBikesPerUser) {
        const userBookingExists = await Booking.findOne({ userId, date, time });
        if (userBookingExists)
          return errorResponse({ res, message: 'You already have a booking at this time' });
      }

      const newBooking = new Booking({ userId, bikeId, date, time, city, status: 'Pending' });
      const savedBooking = await newBooking.save();

      // exclude unwanted fields
      const { __v, createdAt, updatedAt, ...booking } = savedBooking.toObject();

      return successResponse({ res, message: 'Booking created', data: booking, statusCode: 201 });
    } catch (error) {
      console.error('Error creating booking:', error);
      return errorResponse({ res, message: 'Internal server error', statusCode: 500 });
    }
  }

  // Admin: get all bookings
  async getAllBookings(req, res) {
    try {
      const bookings = await Booking.find()
        .populate('userId', 'name email phone')
        .populate('bikeId', 'bikeName model range price')
        .select('-__v')
        .lean();

      return successResponse({ res, message: 'Bookings fetched', data: bookings });
    } catch (error) {
      console.error('Error fetching bookings:', error);
      return errorResponse({ res, message: 'Internal server error', statusCode: 500 });
    }
  }

  // Admin: update booking status
  async updateBookingStatus(req, res) {
    try {
      const { id } = req.params;
      const { status } = req.body;
      const validStatuses = ['Pending', 'Confirmed', 'Cancelled', 'Completed'];

      console.log('Updating booking status:', { id, status });
      if (!validStatuses.includes(status))
        return errorResponse({ res, message: 'Invalid status', statusCode: 400 });

      const booking = await Booking.findByIdAndUpdate(id, { status }, { new: true })
        .select('-__v')
        .lean();

      if (!booking) return errorResponse({ res, message: 'Booking not found', statusCode: 404 });

      return successResponse({ res, message: 'Booking status updated', data: booking });
    } catch (error) {
      console.error('Error updating booking status:', error);
      return errorResponse({ res, message: 'Internal server error', statusCode: 500 });
    }
  }
}

export default new BookingController();
