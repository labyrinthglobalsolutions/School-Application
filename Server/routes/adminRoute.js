import express from "express";
import {
  AddClass,
  AddParent,
  AddStudent,
  AddSubject,
  AddTeacher,
  AdminLogin,
  UpdateStudentById,
  addClassTeacher,
  addFeeDetails,
  createOrUpdateTimetable,
  deleteParent,
  deleteStudent,
  deleteSubject,
  deleteTeacher,
  getClassTeacherById,
  getClasses,
  getFeeDetailsById,
  getFeeList,
  getParents,
  getStudentById,
  getStudents,
  getSubjects,
  getTeacherById,
  getTeachers,
  getTimetable,
  getclassTeacherList,
  updateClassTeacherById,
  updateFeeDetailsById,
  updateStatusOfParent,
  updateStatusOfStudent,
  updateStatusOfSubject,
  updateStatusOfTeacher,
  updateSubjectById,
  updateTeacherById,
} from "../controllers/adminController.js";
import multer from "multer";
import path from "path";
export const adminRouter = express.Router();

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./uploads");
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(
      null,
      file.fieldname + "school" + uniqueSuffix + path.extname(file.originalname)
    );
  },
});
const upload = multer({ storage });

adminRouter.post("/adminlogin", AdminLogin);

adminRouter.post("/addstudent", upload.single("profilePic"), AddStudent);
adminRouter.get("/getstudents", getStudents);
adminRouter.put("/updatestatusofstudent/:id", updateStatusOfStudent);
adminRouter.get("/getstudentdetailsbyid/:id", getStudentById);
adminRouter.put(
  "/UpdateStudentById/:id",
  upload.single("profilePic"),
  UpdateStudentById
);
adminRouter.put("/deleteStudent/:id", deleteStudent);

adminRouter.post("/addteacher", AddTeacher);
adminRouter.get("/getteachers", getTeachers);
adminRouter.put("/updatestatusofteacher/:id", updateStatusOfTeacher);
adminRouter.get("/getTeacherById/:id", getTeacherById);
adminRouter.put("/updateTeacherById/:id", updateTeacherById);
adminRouter.put("/deleteTeacher/:id", deleteTeacher);

adminRouter.post("/addFeeDetails", addFeeDetails);
adminRouter.get("/getFeeList", getFeeList);
adminRouter.get("/getFeeDetailsById/:id", getFeeDetailsById);
adminRouter.put("/updateFeeDetailsById/:id", updateFeeDetailsById);

adminRouter.post("/addClassTeacher", addClassTeacher);
adminRouter.get("/getclassTeacherList", getclassTeacherList);
adminRouter.get("/getClassTeacherById/:id", getClassTeacherById);
adminRouter.put("/updateClassTeacherById/:id", updateClassTeacherById);

adminRouter.post("/addparent", AddParent);
adminRouter.get("/getParents", getParents);
adminRouter.put("/updateStatusOfParent/:id", updateStatusOfParent);
adminRouter.put("/deleteParent/:id", deleteParent);
adminRouter.post("/addtimetable", createOrUpdateTimetable);
adminRouter.get("/gettimetable", getTimetable);

// Add Subject

adminRouter.post("/addSubject", AddSubject);
adminRouter.get("/getSubjects", getSubjects);
adminRouter.put("/updatesubjectstatus/:id", updateStatusOfSubject);
adminRouter.delete("/deleteSubject/:id", deleteSubject);
adminRouter.put("/updateSubject/:id", updateSubjectById);

adminRouter.post("/addClass", AddClass);

adminRouter.get("/getClasses", getClasses);
