import mongoose from "mongoose";

const parentSchema = new mongoose.Schema({
  fullName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  phoneNumber: { type: String, required: true },
  address: { type: String, required: true },
  status: { type: Boolean, default: true },
  active: { type: Boolean, default: true },
});

const Parent = mongoose.model("parent", parentSchema);

export default Parent;
