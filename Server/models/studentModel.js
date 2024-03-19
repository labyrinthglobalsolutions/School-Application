import mongoose from "mongoose";

const studentSchema = new mongoose.Schema({
  fullName: { type: String, required: true },
  dateOfBirth: { type: Date, required: true },
  gender: { type: String, enum: ["male", "female", "other"], required: true },
  classID: { type: String, required: true },
  section: {
    type: String,
    required: true,
  },
  address: { type: String, required: true },
  phoneNumber: { type: String, required: true },
  email: { type: String },
  guardianName: { type: String, required: true },
  guardianPhoneNumber: { type: String, required: true },
  guardianEmail: { type: String },
  profilePic: { type: String },
  status: { type: Boolean, default: true },
  active: { type: Boolean, default: true },
  enrollmentDate: { type: Date, default: Date.now },
});

// Define the 'Student' model using the studentSchema
const Student = mongoose.model("Student", studentSchema);

export default Student;
