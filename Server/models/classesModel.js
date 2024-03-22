import mongoose from "mongoose";

const ClassSchema = new mongoose.Schema({
  className: {
    type: String,
    required: true,
  },
  sectionName: {
    type: String,
    required: true,
  },
  noOfPeriods: {
    type: Number,
    required: true,
  },
});

const Classes = mongoose.model("Classes", ClassSchema);

export { Classes };
