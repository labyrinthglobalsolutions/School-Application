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
    type: String,
    enum: [
      "Period 1",
      "Period 2",
      "Period 3",
      "Period 4",
      "Period 5",
      "Period 6",
      "Period 7",
      "Period 8",
    ],
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
  // Define teacher and room details for each subject if needed
});

const Timetable = mongoose.model("Timetable", timetableSchema);

export default Timetable;
