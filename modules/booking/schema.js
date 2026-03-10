import mongoose from 'mongoose';

const bookingSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User',
    },
    bikeId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'Bike',
    },
    date: {
      type: Date,
      required: false,
    },
    time: {
      type: String,
      required: true,
    }, // HH:mm 24h format
    city: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      enum: ["Pending", "Confirmed", "Cancelled", "Completed"],
      default: "Pending"
    }

  },
  { timestamps: true }
);

bookingSchema.index({ bikeId: 1, date: 1, time: 1 }, { unique: true });

const Booking = mongoose.model('Booking', bookingSchema);

export default Booking;
