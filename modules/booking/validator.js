import Joi from "joi";
import mongoose from "mongoose";

class BookingValidator {
  // Validate booking creation data
  createBooking(data) {
    const schema = Joi.object({
      bikeId: Joi.string().required().custom((value, helpers) => {
        if (!mongoose.Types.ObjectId.isValid(value)) {
          return helpers.message("Invalid Bike ID");
        }
        return value;
      }),
      date: Joi.date().greater("now").required().messages({
        "date.base": "Date must be valid",
        "date.greater": "Date must be in the future"
      }),
      time: Joi.string().pattern(/^([01]?[0-9]|2[0-3]):[0-5][0-9]$/).required().messages({
        "string.pattern.base": "Time must be in HH:mm format (24-hour)"
      }),
      city: Joi.string().min(2).required()
    });
    return schema.validate(data);
  }
}

export default new BookingValidator();
