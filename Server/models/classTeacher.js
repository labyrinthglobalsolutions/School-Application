import mongoose from "mongoose";

const ClassTeacherSchema = new mongoose.Schema({
  class: {
    type: String,
    required: true,
  },
  section: {
    type: String,
    required: true,
  },
  teacherId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Teacher", // Reference to the Teacher model
    required: true,
  },
});

const ClassTeacher = mongoose.model("ClassTeacher", ClassTeacherSchema);

export default ClassTeacher;
