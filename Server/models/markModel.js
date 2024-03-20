import mongoose from "mongoose";

const markSchema = new mongoose.Schema({
  student: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Student",
    required: true,
  },
  subject: {
    // type: mongoose.Schema.Types.ObjectId,
    // ref: "Subject",
    type: String,
    required: true,
  },
  marksObtained: { type: Number, required: true },
  date: { type: Date, default: Date.now },
  examType: { type: String, required: true },
  class: { type: String, required: true },
  section: { type: String, required: true },
});

// Define the 'Mark' model using the markSchema
const Mark = mongoose.model("Mark", markSchema);

export default Mark;
