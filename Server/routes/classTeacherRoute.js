import express from "express";
import { isAuthenticatedTeacher } from "../middleware/auth.js";
import {
  getStudentsListByClassTeacherAttendence,
  getStudentsWithHomework,
  postAttendanceData,
  postHomework,
} from "../controllers/classTeachercontroller.js";

export const classTeacherRoute = express.Router();

classTeacherRoute.get(
  "/getStudentsListByClassTeacherAttendence",
  getStudentsListByClassTeacherAttendence
);

classTeacherRoute.post("/postAttendanceData", postAttendanceData);
classTeacherRoute.get("/getStudentsWithHomework", getStudentsWithHomework);
classTeacherRoute.post("/postHomework", postHomework);
