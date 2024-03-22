import mongoose from "mongoose";

const parentToTeacherMessageSchema = new mongoose.Schema({
  senderId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Parent",
    required: true,
  },
  receiverId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Teacher",
    required: true,
  },
  studentId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Student",
    required: true,
  },
  message: { type: String, required: true },
  sentAt: { type: Date, default: Date.now },
  read: { type: Boolean, default: false }, // Indicates if the message has been read by the teacher
});

const ParentToTeacherMessage = mongoose.model(
  "ParentToTeacherMessage",
  parentToTeacherMessageSchema
);

export default ParentToTeacherMessage;
