import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import Parent from "../models/parentModel.js";
import CatchAsyncError from "../middleware/catchAsyncError.js";
import Student from "../models/studentModel.js";

export const parentLogin = CatchAsyncError(async (req, res) => {
  const { email, password } = req.body;
  const parent = await Parent.findOne({ email: email.toLowerCase() });
  if (!parent) {
    return res.status(401).json({ message: "Invalid email or password" });
  }
  const isPasswordValid = await bcrypt.compare(password, parent.password);
  if (!isPasswordValid) {
    return res.status(401).json({ message: "Invalid email or password" });
  }
  const token = jwt.sign({ email: parent.email }, process.env.JWT_SECRET, {
    expiresIn: "72h",
  });
  res.status(200).json({ token });
});

export const getStudentsByGuardianEmail = async (req, res) => {
  const { email } = req.user;
  console.log(email, "email");
  try {
    const students = await Student.find({ guardianEmail: email });
    if (students.length === 0) {
      return res
        .status(404)
        .json({ message: "No students found for the guardian email" });
    }
    res.status(200).json({ students });
  } catch (error) {
    console.error("Error fetching students:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
