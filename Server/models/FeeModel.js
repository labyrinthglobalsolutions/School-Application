import mongoose from "mongoose";

const FeeDetailsSchema = new mongoose.Schema({
  class: {
    type: String,
    required: true,
    unique: true,
  },
  tuitionFee: {
    type: Number,
    required: true,
  },
  examFee: {
    type: Number,
    required: true,
  },
  transportationFee: {
    type: Number,
    required: true,
  },
  booksFee: {
    type: Number,
    required: true,
  },
  uniformFee: {
    type: Number,
    required: true,
  },
  otherFees: {
    type: Number,
    required: true,
  },
});

// Create model for fee details
const FeeDetails = mongoose.model("FeeDetails", FeeDetailsSchema);

export default FeeDetails;
