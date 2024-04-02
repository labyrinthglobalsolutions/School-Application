import Student from "../models/studentModel.js";
import bcrypt from "bcrypt";
import ErrorHandler from "../utils/ErrorHandler.js";
import nodemailerConfig from "../utils/nodemailerConfig.js";
import CatchAsyncError from "../middleware/catchAsyncError.js";
import Teacher from "../models/TeacherModel.js";
import FeeDetails from "../models/FeeModel.js";
import ClassTeacher from "../models/classTeacher.js";
import Parent from "../models/parentModel.js";
import Timetable from "../models/timeTable.js";
import { Admin } from "../models/adminModel.js";
import jwt from "jsonwebtoken";
import Subject from "../models/addSubjects.js";
import { Classes } from "../models/classesModel.js";

export const AdminLogin = async (req, res) => {
  try {
    const { email, password } = req.body;
    console.log(email, password, "login");
    let user;
    user = await Admin.findOne({ email: email.toLowerCase() });

    if (user) {
      // if (user.packageExpired) {
      //   return res
      //     .status(405)
      //     .json({ message: "Your package has expired", packageExpired: true });
      // }
      // if (user.requestAccepted === false) {
      //   return res
      //     .status(400)
      //     .json({ message: "Your request is not accepted by Admin yet" });
      // }
      console.log(user.status);
      if (!user.status) {
        return res.status(400).json({ message: "You Account is disabled" });
      }

      const isMatch = await bcrypt.compare(password, user.password);
      console.log(isMatch);
      if (!isMatch) {
        return res.status(400).json({ message: "Incorrect password" });
      }
      // Create a JWT token with user payload
      const payload = {
        user: {
          id: user.id,
          email: user.email,
        },
      };
      console.log(payload, "payload");
      jwt.sign(
        payload,
        process.env.JWT_SECRET,
        { expiresIn: "72h" },
        (err, token) => {
          if (err) {
            console.log(err);
            throw err;
          }
          console.log("success");
          res
            .status(200)
            .json({ message: "Login successful", token, role: "Admin" });
        }
      );
    }
    if (!user) {
      const user1 = await Teacher.findOne({ email: email.toLowerCase() });
      if (!user1) {
        return res.status(404).json({ message: "User not found" });
      }

      if (user1.status === false) {
        return res.status(400).json({ message: "You Account is disabled" });
      }

      // if (!user.isVerified) {
      //   return res.status(400).json({
      //     message: "User not verified. Check your email for verification.",
      //   });
      // }
      const isMatch = await bcrypt.compare(password, user1.password);

      if (!isMatch) {
        return res.status(400).json({ message: "Incorrect password" });
      }
      // Create a JWT token with user payload
      const payload = {
        user1: {
          id: user1.id,
          email: user1.email,
        },
      };

      jwt.sign(
        payload,
        process.env.JWT_SECRET,
        { expiresIn: "72h" },
        (err, token) => {
          if (err) {
            throw err;
          }
          res
            .status(200)
            .json({ message: "Login successful", token, role: "teacher" });
        }
      );
    }
  } catch (error) {
    return res.status(500).json({ message: "Internal server error" });
  }
};

export const AddStudent = CatchAsyncError(async (req, res) => {
  try {
    const {
      fullName,
      dateOfBirth,
      gender,
      classID,
      address,
      phoneNumber,
      email,
      guardianName,
      guardianPhoneNumber,
      guardianEmail,
      profilePic,
      active,
      section,
      enrollmentDate,
    } = req.body;

    // Check if the email already exists in the Student collection
    const existingStudent = await Student.findOne({
      email: email.toLowerCase(),
    });

    if (existingStudent) {
      return res.status(400).json({ message: "Email already exists" });
    }

    const student = new Student({
      fullName,
      dateOfBirth,
      gender,
      classID,
      address,
      phoneNumber,
      section,
      email: email.toLowerCase(), // Convert email to lowercase
      guardianName,
      guardianPhoneNumber,
      guardianEmail: guardianEmail.toLowerCase(), // Convert email to lowercase
      profilePic: req.file ? req.file.filename : "",
      active,
      enrollmentDate,
    });

    // Hash the password if needed
    // const saltRounds = 10;
    // const hashedPassword = await bcrypt.hash(password, saltRounds);
    // student.password = hashedPassword;

    const savedStudent = await student.save();

    // // Send email notification
    // const transporter = nodemailer.createTransport({
    //   host: process.env.SMTP_HOST,
    //   port: process.env.SMTP_PORT,
    //   auth: {
    //     user: process.env.SMTP_USER,
    //     pass: process.env.SMTP_PASSWORD,
    //   },
    // });

    // const mailOptions = {
    //   from: process.env.SMTP_MAIL,
    //   to: email,
    //   subject: "Student Account Created",
    //   html: `
    //     <p>Dear ${fullName},</p>
    //     <p>Your student account has been created successfully.</p>
    //   `,
    // };

    // await transporter.sendMail(mailOptions);

    res
      .status(201)
      .json({ message: "Student added successfully", student: savedStudent });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
});

export const getStudents = async (req, res) => {
  try {
    const students = await Student.find();
    res.status(200).json({ students });
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
};

export const AddTeacher = CatchAsyncError(async (req, res) => {
  console.log(req.body);
  try {
    const {
      fullName,
      email,
      password,
      phoneNumber,
      address,
      subjects,
      classes,
      joinDate,
      profilePic,
      isActive,
    } = req.body;

    // Check if the email already exists in the Teacher collection
    const existingTeacher = await Teacher.findOne({
      email: email.toLowerCase(),
    });

    if (existingTeacher) {
      return res.status(400).json({ message: "Email already exists" });
    }

    // Encrypt the password using bcrypt
    const hashedPassword = await bcrypt.hash(password, 10);

    const teacher = new Teacher({
      fullName,
      email: email.toLowerCase(), // Convert email to lowercase
      password: hashedPassword, // Store the hashed password
      phoneNumber,
      address,
      subjects,
      classes,
      profilePic,
      isActive,
      joinDate,
    });

    await teacher.save();

    res.status(201).json({ message: "Teacher added successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
});

export const getTeachers = async (req, res) => {
  try {
    const teachers = await Teacher.find();
    res.status(200).json({ teachers });
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
};

export const updateStatusOfStudent = async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;
  console.log(status, "status");
  try {
    const student = await Student.findByIdAndUpdate(
      id,
      { $set: { status } },
      { new: true }
    );
    console.log(student);
    if (!student) {
      return res.status(404).json({ message: "student not found" });
    }
    console.log("updared");
    res.status(201).json({ message: "student status updated successfully" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

export const updateStatusOfTeacher = CatchAsyncError(async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;
  console.log(status, "status");
  try {
    const teacher = await Teacher.findByIdAndUpdate(
      id,
      { $set: { status } },
      { new: true }
    );
    console.log(teacher);
    if (!teacher) {
      return res.status(404).json({ message: "teacher not found" });
    }
    console.log("updared");
    res.status(201).json({ message: "teacher status updated successfully" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
});

export const getStudentById = CatchAsyncError(async (req, res) => {
  const { id } = req.params; // Extract the ID from the request params
  console.log(id);
  try {
    const student = await Student.findById(id);
    if (!student) {
      // If no student found with the given ID, return 404 Not Found
      return res.status(405).json({ message: "Student not found" });
    }
    res.status(200).json(student);
  } catch (error) {
    console.error("Error retrieving student:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

export const UpdateStudentById = CatchAsyncError(async (req, res) => {
  console.log(req.body, "called");
  try {
    const {
      fullName,
      dateOfBirth,
      gender,
      classID,
      address,
      phoneNumber,
      email,
      guardianName,
      guardianPhoneNumber,
      guardianEmail,
      active,
      section,
      enrollmentDate,
    } = req.body;

    const { id } = req.params;
    const existingStudent = await Student.findById(id);

    if (!existingStudent) {
      return res.status(404).json({ message: "Student not found" });
    }

    existingStudent.fullName = fullName;
    existingStudent.dateOfBirth = dateOfBirth;
    existingStudent.gender = gender;
    existingStudent.classID = classID;
    existingStudent.address = address;
    existingStudent.section = section;
    existingStudent.phoneNumber = phoneNumber;
    existingStudent.email = email.toLowerCase(); // Convert email to lowercase
    existingStudent.guardianName = guardianName;
    existingStudent.guardianPhoneNumber = guardianPhoneNumber;
    existingStudent.guardianEmail = guardianEmail.toLowerCase();
    if (req.file) existingStudent.profilePic = req.file.filename;
    existingStudent.active = active;
    existingStudent.enrollmentDate = enrollmentDate;

    // Save the updated student details
    const updatedStudent = await existingStudent.save();

    res.json({
      message: "Student updated successfully",
      student: updatedStudent,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
});

export const getTeacherById = CatchAsyncError(async (req, res) => {
  const { id } = req.params; // Extract the ID from the request params
  console.log("get id teacher called");
  try {
    const teacher = await Teacher.findById(id);
    if (!teacher) {
      return res.status(404).json({ message: "Teacher not found" });
    }
    res.status(200).json(teacher);
  } catch (error) {
    console.error("Error retrieving teacher:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

export const updateTeacherById = CatchAsyncError(async (req, res) => {
  console.log("update teacher called");
  console.log(req.body.classes);
  try {
    const {
      fullName,
      email,
      password,
      phoneNumber,
      address,
      subjects,
      classes,
      profilePic,
      status,
      isActive,
      joinDate,
    } = req.body;

    const { id } = req.params;
    const existingTeacher = await Teacher.findById(id);

    if (!existingTeacher) {
      return res.status(404).json({ message: "Teacher not found" });
    }

    existingTeacher.fullName = fullName;
    existingTeacher.email = email;
    existingTeacher.password = password;
    existingTeacher.phoneNumber = phoneNumber;
    existingTeacher.address = address;
    existingTeacher.subjects = subjects;
    existingTeacher.classes = classes;
    existingTeacher.profilePic = profilePic;
    existingTeacher.status = status;
    existingTeacher.isActive = isActive;
    existingTeacher.joinDate = joinDate;

    // Save the updated teacher details
    const updatedTeacher = await existingTeacher.save();

    res.json({
      message: "Teacher updated successfully",
      teacher: updatedTeacher,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
});

export const deleteStudent = async (req, res) => {
  const { id } = req.params;
  const { active } = req.body;
  try {
    const student = await Student.findByIdAndUpdate(
      id,
      { $set: { active: active, status: false } },
      { new: true }
    );

    if (!student) {
      return res.status(404).json({ message: "Student not found" });
    }
    return res.json({ message: "Student deleted Successfully" });
  } catch (error) {
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

export const deleteTeacher = async (req, res) => {
  const { id } = req.params;
  const { active } = req.body;
  try {
    const teacher = await Teacher.findByIdAndUpdate(
      id,
      { $set: { active: active, status: false } },
      { new: true }
    );

    if (!teacher) {
      return res.status(404).json({ message: "Teacher not found" });
    }
    return res.json({ message: "Teacher deleted Successfully" });
  } catch (error) {
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

export const addFeeDetails = CatchAsyncError(async (req, res) => {
  console.log("add fee details called");
  console.log(req.body);
  try {
    const {
      classId,
      tuitionFee,
      examFee,
      transportationFee,
      booksFee,
      uniformFee,
      otherFees,
    } = req.body;
    const feeDetails = new FeeDetails({
      class: classId,
      tuitionFee,
      examFee,
      transportationFee,
      booksFee,
      uniformFee,
      otherFees,
    });
    await feeDetails.save();
    res.status(201).json({ message: "Fee details added successfully" });
  } catch (error) {
    console.error("Error adding fee details:", error.message);
    res.status(500).json({ message: "Internal server error" });
  }
});

export const getFeeList = async (req, res) => {
  try {
    const feeList = await FeeDetails.find();
    res.status(200).json({ feeList });
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
};

export const getFeeDetailsById = CatchAsyncError(async (req, res) => {
  const { id } = req.params; // Extract the ID from the request params
  console.log(id);
  try {
    const feeDetails = await FeeDetails.findById(id);
    if (!feeDetails) {
      // If no student found with the given ID, return 404 Not Found
      return res.status(405).json({ message: "Fee Details not found" });
    }
    res.status(200).json(feeDetails);
  } catch (error) {
    console.error("Error retrieving feeDetails:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

export const updateFeeDetailsById = CatchAsyncError(async (req, res) => {
  console.log("add fee details called");
  console.log(req.body);
  try {
    const {
      classId,
      tuitionFee,
      examFee,
      transportationFee,
      booksFee,
      uniformFee,
      otherFees,
    } = req.body;
    const existingFeeDetails = await FeeDetails.findById(req.params.id);
    if (!existingFeeDetails) {
      return res.status(404).json({ message: "Fee Details not found" });
    }
    existingFeeDetails.class = classId;
    existingFeeDetails.tuitionFee = tuitionFee;
    existingFeeDetails.examFee = examFee;
    existingFeeDetails.transportationFee = transportationFee;
    existingFeeDetails.booksFee = booksFee;
    existingFeeDetails.uniformFee = uniformFee;
    existingFeeDetails.otherFees = otherFees;
    const updatedFeeDetails = await existingFeeDetails.save();
    res.status(201).json({ message: "Fee details added successfully" });
  } catch (error) {
    console.error("Error adding fee details:", error.message);
    res.status(500).json({ message: "Internal server error" });
  }
});

export const addClassTeacher = CatchAsyncError(async (req, res, next) => {
  // console.log("Add class teacher called");
  // console.log(req.body);
  try {
    const { classId, section, teacherId } = req.body;
    // Check if the class teacher already exists
    const existingClassTeacher = await ClassTeacher.findOne({
      class: classId,
      section,
    });
    // console.log(existingClassTeacher);
    if (existingClassTeacher) {
      console.log("called error");
      return next(new ErrorHandler("class teacher already exists ", 400));
    }

    const classTeacher = new ClassTeacher({
      class: classId,
      section,
      teacherId,
    });

    await classTeacher.save();
    res.status(201).json({ message: "Class teacher added successfully" });
  } catch (error) {
    console.log("catch called");
    console.error("Error adding class teacher:", error.message);
    res.status(500).json({ message: "Internal server error" });
  }
});

export const getclassTeacherList = async (req, res) => {
  try {
    // Fetch all class teachers
    const classTeachers = await ClassTeacher.find();

    // Populate the teacher details for each class teacher
    const populatedClassTeachers = await Promise.all(
      classTeachers.map(async (classTeacher) => {
        const teacher = await Teacher.findById(classTeacher.teacherId);
        return {
          _id: classTeacher._id,
          class: classTeacher.class,
          section: classTeacher.section,
          fullName: teacher.fullName,
          email: teacher.email,
          phoneNumber: teacher.phoneNumber,
        };
      })
    );

    res.status(200).json({ classTeachers: populatedClassTeachers });
  } catch (error) {
    console.error("Error fetching class teachers:", error.message);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const getClassTeacherById = CatchAsyncError(async (req, res) => {
  const { id } = req.params; // Extract the ID from the request params
  console.log(id);
  try {
    const classTeacher = await ClassTeacher.findById({ _id: id });
    if (!classTeacher) {
      // If no student found with the given ID, return 404 Not Found
      return res.status(405).json({ message: "Fee Details not found" });
    }
    res.status(200).json(classTeacher);
  } catch (error) {
    console.error("Error retrieving feeDetails:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

export const updateClassTeacherById = CatchAsyncError(
  async (req, res, next) => {
    console.log(req.body);
    const id = req.params.id;
    try {
      const { classId, section, teacherId } = req.body;

      const existingClassTeacher = await ClassTeacher.findOne({
        _id: id,
      });

      existingClassTeacher.class = classId;
      existingClassTeacher.section = section;
      existingClassTeacher.teacherId = teacherId;

      await existingClassTeacher.save();
      res.status(201).json({ message: "Class teacher updated successfully" });
    } catch (error) {
      console.log("catch called");
      console.error("Error adding class teacher:", error.message);
      res.status(500).json({ message: "Internal server error" });
    }
  }
);

export const AddParent = CatchAsyncError(async (req, res) => {
  const { fullName, password, email, phoneNumber, address } = req.body;
  try {
    // Check if the email already exists
    const existingParent = await Parent.findOne({ email: email.toLowerCase() });
    if (existingParent) {
      return res.status(400).json({ message: "Email already exists" });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const parent = new Parent({
      fullName,
      password: hashedPassword,
      email: email.toLowerCase(),
      phoneNumber,
      address,
    });
    await parent.save();
    res.status(201).json({ message: "Parent added successfully" });
  } catch (error) {
    console.error("Error adding parent:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

export const getParents = async (req, res) => {
  try {
    const parents = await Parent.find();
    res.status(200).json({ parents });
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
};

export const updateStatusOfParent = CatchAsyncError(async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;
  console.log(status, "status");
  try {
    const parent = await Parent.findByIdAndUpdate(
      id,
      { $set: { status } },
      { new: true }
    );
    console.log(parent);
    if (!parent) {
      return res.status(404).json({ message: "parent not found" });
    }
    console.log("updated");
    res.status(201).json({ message: "parent status updated successfully" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
});

export const deleteParent = async (req, res) => {
  const { id } = req.params;
  const { active } = req.body;
  try {
    const parent = await Parent.findByIdAndUpdate(
      id,
      { $set: { active: active, status: false } },
      { new: true }
    );

    if (!parent) {
      return res.status(404).json({ message: "Parent not found" });
    }
    return res.json({ message: "Parent deleted Successfully" });
  } catch (error) {
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

export const createOrUpdateTimetable = CatchAsyncError(async (req, res) => {
  const { classId, period, subject, teacherId, section } = req.body;
  console.log(classId, period, subject);
  try {
    let timetable = await Timetable.findOne({ classId, period, section });
    console.log(timetable);
    if (timetable) {
      timetable.subject = subject;
      timetable.teacherId = teacherId;
      timetable.section = section;
      await timetable.save();
      res.status(200).json({ message: "Timetable updated successfully" });
    } else {
      timetable = new Timetable({ classId, period, subject, teacherId });
      timetable.section = section;
      await timetable.save();
      res.status(201).json({ message: "Timetable created successfully" });
    }
  } catch (error) {
    console.error("Error creating or updating timetable:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

export const getTimetable = CatchAsyncError(async (req, res) => {
  try {
    const table = await Timetable.find();
    const timetable = await Promise.all(
      table.map(async (item) => {
        const teacher = await Teacher.findById(item.teacherId);
        return {
          _id: item._id,
          classId: item.classId,
          period: item.period,
          subject: item.subject,
          section: item.section,
          fullName: teacher.fullName,
        };
      })
    );
    console.log(timetable);
    res.json(timetable);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch timetable" });
  }
});

export const AddSubject = CatchAsyncError(async (req, res) => {
  try {
    const { subject } = req.body;

    const existingSubject = await Subject.findOne({
      subject: subject.toLowerCase(),
    });

    if (existingSubject) {
      return res.status(400).json({ message: "Subject already exists" });
    }

    const subjectAdd = new Subject({
      subject: subject.toLowerCase(),
    });

    const savedSubject = await subjectAdd.save();

    res.status(201).json({
      message: "Subject added successfully",
      subjectAdd: savedSubject,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
});

export const AddClass = CatchAsyncError(async (req, res) => {
  try {
    const { className, sectionName, noOfPeriods } = req.body; // Extracting noOfPeriods from req.body
    console.log(className, sectionName, noOfPeriods, req.body);

    const existingClass = await Classes.findOne({
      className: className.toLowerCase(),
      sectionName: sectionName.toLowerCase(),
    });

    if (existingClass) {
      return res.status(400).json({ message: "Class already exists" });
    }

    const newClass = new Classes({
      className: className.toLowerCase(),
      sectionName: sectionName.toLowerCase(),
      noOfPeriods: noOfPeriods, // Assigning noOfPeriods to the new class instance
    });
    await newClass.save();
    res.status(201).json({ message: "Class added successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
});

export const getClasses = async (req, res) => {
  try {
    const classes = await Classes.find();

    res.status(200).json({ classes });
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
};

export const getStudentsWithMarks = async (req, res) => {
  try {
    // Fetch all students with their marks
    const studentsWithMarks = await Student.find({})
      .populate({
        path: "marks",
        select: "marksObtained totalMarks", // Select only required fields from the Marks model
      })
      .select("fullName marks"); // Select only required fields from the Student model

    // Send the response with the fetched data
    res.status(200).json({ studentsWithMarks });
  } catch (error) {
    // Handle errors
    console.error("Error fetching students with marks:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};
export const getSubjects = async (req, res) => {
  try {
    const subjects = await Subject.find();
    res.status(200).json({ subjects });
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
};

export const updateStatusOfSubject = CatchAsyncError(async (req, res) => {
  const { id } = req.params;
  console.log(id, "kkkkkkkkkkkkkk");
  const { status } = req.body;
  console.log(status, "status");
  try {
    const subject = await Subject.findByIdAndUpdate(
      id,
      { $set: { status } },
      { new: true }
    );
    console.log(subject, "jjjjjjjjjjjj");
    if (!subject) {
      return res.status(404).json({ message: "subject not found" });
    }
    console.log("updated");
    res.status(201).json({ message: "subject status updated successfully" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
});

export const deleteSubject = async (req, res) => {
  const { id } = req.params;
  const { active } = req.body;
  try {
    const subject = await Subject.findByIdAndUpdate(
      id,
      { $set: { active: active, status: false } },
      { new: true }
    );

    if (!subject) {
      return res.status(404).json({ message: "Subject not found" });
    }
    return res.status(200).json({ message: "Subject deleted Successfully" });
  } catch (error) {
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

export const updateSubjectById = CatchAsyncError(async (req, res) => {
  console.log("add fee details called");
  console.log(req.body);
  try {
    const { subject } = req.body;
    const existingFeeDetails = await Subject.findById(req.params.id);
    if (!existingFeeDetails) {
      return res.status(404).json({ message: "Subject Details not found" });
    }
    existingFeeDetails.subject = subject;
    const updatedFeeDetails = await existingFeeDetails.save();
    res.status(201).json({ message: "Subject details updated successfully" });
  } catch (error) {
    console.error("Error adding subject details:", error.message);
    res.status(500).json({ message: "Internal server error" });
  }
});
