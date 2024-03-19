import mongoose from "mongoose";

const teacherSchema = new mongoose.Schema({
  fullName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  phoneNumber: { type: String, required: true },
  address: { type: String, required: true },
  subjects: [{ type: String, required: true }],
  classes: [{ type: String, required: true }],
  profilePic: { type: String },
  status: { type: Boolean, default: true },
  isActive: { type: Boolean, default: true },
  joinDate: { type: Date, default: Date.now },
});

// Define the 'Teacher' model using the teacherSchema
const Teacher = mongoose.model("Teacher", teacherSchema);

export default Teacher;
