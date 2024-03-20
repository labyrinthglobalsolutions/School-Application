import mongoose from "mongoose";

const AddSubjectSchema = new mongoose.Schema({
  subject: {
    type: String,
    required: true,
  },
  status: { type: Boolean, default: true },
  active: { type: Boolean, default: true },
});

const Subject = mongoose.model("AddSubject", AddSubjectSchema);

export default Subject;
