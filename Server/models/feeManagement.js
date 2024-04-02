import mongoose from "mongoose";

const studentFeeSchema = new mongoose.Schema({
  student: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Student",
    required: true,
  },
  feeDetails: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "FeeDetails",
    required: true,
  },
});

const transactionSchema = new mongoose.Schema({
  studentFee: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "StudentFee",
    required: true,
  },
  amountPaid: { type: Number, required: true },
  paymentDate: { type: Date, default: Date.now },
  paymentMethod: { type: String, required: true },
});

const termDivisionSchema = new mongoose.Schema({
  studentFee: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "StudentFee",
    required: true,
  },
  term: { type: String, required: true },
  feeAmount: { type: Number, required: true },
  startDate: { type: Date, required: true },
  endDate: { type: Date, required: true },
});

export const TermDivision = mongoose.model("TermDivision", termDivisionSchema);

export const Transaction = mongoose.model("Transaction", transactionSchema);

export const StudentFee = mongoose.model("StudentFee", studentFeeSchema);
