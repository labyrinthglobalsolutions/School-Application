import express from "express";
import { isAuthenticatedTeacher } from "../middleware/auth.js";
import {
  getStudentsListByClassTeacherAttendence,
  postAttendanceData,
} from "../controllers/classTeachercontroller.js";

export const classTeacherRoute = express.Router();

classTeacherRoute.get(
  "/getStudentsListByClassTeacherAttendence",
  getStudentsListByClassTeacherAttendence
);

classTeacherRoute.post("/postAttendanceData", postAttendanceData);
