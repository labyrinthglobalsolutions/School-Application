import mongoose from "mongoose";

const timetableSchema = new mongoose.Schema({
  classId: {
    type: String,
    required: true,
  },
  teacherId: {
    type: String,
    required: true,
  },
  section: {
    type: String,
    required: true,
  },
  period: {
    type: Number,
    required: true,
  },
  subject: {
    type: String,
    enum: [
      "Telugu",
      "Hindi",
      "English",
      "Maths",
      "Science",
      "Social",
      "Sports",
      "GK",
    ],
    required: true,
  },
});

const Timetable = mongoose.model("Timetable", timetableSchema);

export default Timetable;
