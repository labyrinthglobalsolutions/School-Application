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

export const getStudentHomeworkForToday = CatchAsyncError(async (req, res) => {
  try {
    // Extract student ID from request parameters
    const { studentId } = req.params;
    const { year, month, day } = req.body;

    const dateFilter = {};

    if (year && month && day) {
      const startDate = new Date(year, month - 1, day);
      startDate.setHours(0, 0, 0, 0); // Set time to start of day
      const endDate = new Date(year, month - 1, day);
      endDate.setHours(23, 59, 59, 999); // Set time to end of day
      dateFilter.createdAt = { $gte: startDate, $lte: endDate };
    }

    // Query to find homework for the specified student updated today
    const studentHomework = await Homework.find({
      student: studentId,
      ...dateFilter,
    }).select("title description subject dueDate");
    res.status(200).json({ studentHomework });
  } catch (error) {
    console.error("Error fetching student homework:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});
