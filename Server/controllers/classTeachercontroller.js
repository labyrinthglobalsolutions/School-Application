import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import CatchAsyncError from "../middleware/catchAsyncError.js";
import ClassTeacher from "../models/classTeacher.js";
import Student from "../models/studentModel.js";
import Attendance from "../models/attendenceModel.js";
import Homework from "../models/homeworkModel.js";

export const classTeacherLogin = CatchAsyncError(async (req, res) => {
  const { email, password } = req.body;
  const classTeacher = await ClassTeacher.findOne({
    email: email.toLowerCase(),
  });
  if (!classTeacher) {
    return res.status(401).json({ message: "Invalid email or password" });
  }
  const isPasswordValid = await bcrypt.compare(password, classTeacher.password);
  if (!isPasswordValid) {
    return res.status(401).json({ message: "Invalid email or password" });
  }
  const token = jwt.sign(
    { email: classTeacher.email },
    process.env.JWT_SECRET,
    {
      expiresIn: "72h",
    }
  );
  res.status(200).json({ token });
});

// export const getStudentsListByClassTeacherAttendence = CatchAsyncError(
//   async (req, res) => {
//     try {
//       const students = await Student.find({}); // Fetch only name and rollNumber fields
//       console.log(students, "students");
//       res.json(students);
//     } catch (error) {
//       console.error("Error fetching students:", error);
//       res.status(500).json({ error: "Internal server error" });
//     }
//   }
// );

export const getStudentsListByClassTeacherAttendence = CatchAsyncError(
  async (req, res) => {
    try {
      console.log("called");
      console.log(req.query, "year");
      const month = parseInt(req.query.month);
      const year = parseInt(req.query.year);
      console.log(year, "year");
      console.log(month, "month");
      const students = await Student.find({}, "fullName rollNumber");
      const currentDate = new Date();
      // const year = currentDate.getFullYear();
      console.log(year, "year");
      const firstDayOfMonth = new Date(year, month - 1, 1);
      const lastDayOfMonth = new Date(year, month, 0);
      const attendanceData = await Attendance.find({
        date: { $gte: firstDayOfMonth, $lte: lastDayOfMonth },
      }).populate("studentId", "fullName"); // Assuming the studentId field in Attendance model references the Student model
      console.log(firstDayOfMonth, lastDayOfMonth, "date");
      console.log(attendanceData, "attendanceData");
      const formattedAttendanceData = {};
      attendanceData.forEach((attendance) => {
        const studentId = attendance.studentId._id;
        const date = attendance.date.toISOString().split("T")[0]; // Get the date in 'YYYY-MM-DD' format
        formattedAttendanceData[studentId] =
          formattedAttendanceData[studentId] || {};
        formattedAttendanceData[studentId][date] = attendance.status;
      });
      console.log(formattedAttendanceData, "attendance");
      res.json({ students, attendanceData: formattedAttendanceData });
    } catch (error) {
      console.error("Error fetching students and attendance data:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  }
);

export const postAttendanceData = CatchAsyncError(async (req, res) => {
  const { studentId, date, status } = req.body;

  console.log(studentId, date, status);

  try {
    // Update or create attendance record in the database
    await Attendance.updateOne(
      { studentId, date },
      { status },
      { upsert: true }
    );

    res.status(200).json({ message: "Attendance data updated successfully" });
  } catch (error) {
    console.error("Error updating attendance data:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// export const getStudentsWithHomework = async (req, res) => {
//   try {
//     const { year, month, day } = req.query;

//     // Construct date filter based on query parameters
//     const dateFilter = {};
//     if (year && month && day) {
//       const startDate = new Date(year, month - 1, day);
//       const endDate = new Date(year, month - 1, day + 1);
//       dateFilter.dueDate = { $gte: startDate, $lt: endDate };
//     }

//     // Fetch students with assigned homework
//     const studentsWithHomework = await Homework.find(dateFilter)
//       .populate("student", "fullName") // Assuming the student field in Homework schema references the Student schema
//       .select("student");

//     res.status(200).json({ students: studentsWithHomework });
//   } catch (error) {
//     console.error("Error fetching students with assigned homework:", error);
//     res.status(500).json({ error: "Internal server error" });
//   }
// };

export const getStudentsWithHomework = async (req, res) => {
  try {
    const { year, month, day } = req.query;
    console.log(year, month, day, "year month day");
    // Construct date filter based on query parameters
    const dateFilter = {};
    // if (year && month && day) {
    //   const startDate = new Date(year, month - 1, day);
    //   const endDate = new Date(year, month - 1, day + 1);
    //   dateFilter.createdAt = { $gte: startDate, $lt: endDate };
    //   // dateFilter.createdAt = startDate;
    // }

    if (year && month && day) {
      const startDate = new Date(year, month - 1, day);
      startDate.setHours(0, 0, 0, 0); // Set time to start of day
      const endDate = new Date(year, month - 1, day);
      endDate.setHours(23, 59, 59, 999); // Set time to end of day
      dateFilter.createdAt = { $gte: startDate, $lte: endDate };
    }

    // Fetch students with assigned homework
    const studentsWithHomework = await Homework.find(dateFilter)
      .populate("student", "fullName") // Assuming the student field in Homework schema references the Student schema
      .select("student title description subject dueDate"); // Selecting required fields

    // Fetch all students
    const allStudents = await Student.find({}, "fullName");

    // Combine data
    const combinedData = allStudents.map((student) => {
      const studentHomework = studentsWithHomework.find((hw) =>
        hw.student._id.equals(student._id)
      );

      return {
        student: student,
        homework: studentHomework ? studentHomework : null,
      };
    });
    console.log(combinedData[0], "combinedData");

    res.status(200).json({ studentsWithHomework: combinedData });
  } catch (error) {
    console.error("Error fetching students with assigned homework:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const postHomework = async (req, res) => {
  try {
    const classId = 6;
    const section = "A";
    const { title, description, subject, dueDate, studentId } = req.body;
    console.log(req.body);
    // Create homework
    const homework = new Homework({
      title,
      description,
      subject,
      dueDate,
      class: classId,
      section: section,
      student: studentId,
      // createdBy: req.user._id, // Assuming you have user authentication middleware to get the user ID
    });

    // Save homework
    await homework.save();

    res.status(201).json({ message: "Homework created successfully" });
  } catch (error) {
    console.error("Error posting homework:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

// Controller function for GET request to get the list of students with assigned homework
