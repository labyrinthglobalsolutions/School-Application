import express from "express";
import { isAuthenticatedTeacher } from "../middleware/auth.js";
import { getClassesByTeacherId } from "../controllers/teacherController.js";

export const teacherRoute = express.Router();

teacherRoute.get(
  "/getClassesByTeacherId",
  isAuthenticatedTeacher,
  getClassesByTeacherId
);
