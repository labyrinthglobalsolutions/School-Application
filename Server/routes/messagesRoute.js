import express from "express";
import {
  getAllMessagesByTeacher,
  getMessagesStudentList,
  getTeacherId,
  sendMessageByTeacher,
} from "../controllers/messageController.js";

export const messageRoute = express.Router();

messageRoute.get("/getTeacherId", getTeacherId);
messageRoute.get("/messagesStudentlist", getMessagesStudentList);
messageRoute.post("/sendMessageByTeacher", sendMessageByTeacher);
messageRoute.get(
  "/getAllMessagesByTeacher/:studentId",
  getAllMessagesByTeacher
);
