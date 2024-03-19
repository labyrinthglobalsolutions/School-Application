import express from "express";
import {
  getStudentsByGuardianEmail,
  parentLogin,
} from "../controllers/parentController.js";
import { isAuthenticatedParent } from "../middleware/auth.js";
export const parentRouter = express.Router();

parentRouter.post("/parentlogin", parentLogin);
parentRouter.get(
  "/getStudentsByGuardianEmail",
  isAuthenticatedParent,
  getStudentsByGuardianEmail
);
