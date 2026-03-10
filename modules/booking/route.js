import express from "express";
import BookingController from "./controller.js";
import BookingValidator from "./validator.js";
import auth from "../../middleware/auth.js";
import admin from "../../middleware/admin.js";
import validate from "../../middleware/validate.js";

const router = express.Router();

/**
 * @route POST /api/bookings
 * @desc Create a test ride booking (authenticated user)
 * @access User
 */
router.post(
  "/",
  auth,
  validate(BookingValidator.createBooking),
  BookingController.createBooking
);

/**
 * @route GET /api/bookings
 * @desc Admin: Get all bookings
 * @access Admin
 */
router.get(
  "/",
  auth,
  admin,
  BookingController.getAllBookings
);

/**
 * @route PATCH /api/bookings/:id/status
 * @desc Admin: Update booking status (Pending / Confirmed / Cancelled / Completed)
 * @access Admin
 */
router.patch(
  "/:id/status",
  auth,
  admin,
  BookingController.updateBookingStatus
);

export default router;
