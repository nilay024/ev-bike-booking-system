import mongoose from 'mongoose';

const bikeSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    model: {
      type: String,
      required: true,
      trim: true,
    },
    range: {
      type: Number,
      required: false,
      min: 0,
    },
    price: {
      type: Number,
      required: true,
      min: 0,
    },
    availability: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

bikeSchema.virtual("fullName").get(function () {
  return `${this.name} ${this.model}`;
});

const Bike = mongoose.model('Bike', bikeSchema);

export default Bike;
