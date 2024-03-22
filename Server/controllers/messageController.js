import Parent from "../models/parentModel.js";
import ParentToTeacherMessage from "../models/parentToTeacherMessageModel.js";
import Student from "../models/studentModel.js";

export const getTeacherId = async (req, res) => {
  try {
    // const teacherId = req.user._id;
    const teacherId = "65e982833b8b8d9160f0e516";

    res.status(200).json({ teacherId });
  } catch (error) {
    console.error("Error fetching teacher ID:", error);
    res.status(500).json({ error: "Failed to fetch teacher ID" });
  }
};

export const getMessagesStudentList = async (req, res) => {
  try {
    const students = await Student.find();
    res.status(200).json({ students });
  } catch (error) {
    console.error("Error fetching students:", error);
    res.status(500).json({ error: "Failed to fetch students" });
  }
};
// export const sendMessageByTeacher = async (req, res) => {
//   try {
//     const { senderId, receiverId, message } = req.body;
//     console.log(receiverId, senderId, message, "receiverId");
//     const student = await Student.findById({ _id: receiverId });
//     const studentId = student._id;
//     const guardianEmail = student.guardianEmail;
//     console.log(guardianEmail, "email");

//     const gaurdian = await Parent.findById({
//       email: guardianEmail,
//     });
//     const gaurdianId = gaurdian._id;
//     // Create a new message instance
//     console.log(gaurdianId, "gaurdianId");
//     const newMessage = new ParentToTeacherMessage({
//       senderId,
//       receiverId: gaurdianId,
//       studentId: studentId,
//       message,
//     });

//     // Save the message to the database
//     await newMessage.save();

//     res.status(201).json({ message: "Message sent successfully" });
//   } catch (error) {
//     console.error("Error sending message:", error);
//     res.status(500).json({ error: "Failed to send message" });
//   }
// };

export const sendMessageByTeacher = async (req, res) => {
  try {
    const { senderId, receiverId, message } = req.body;
    console.log(receiverId, senderId, message, "receiverId");
    // Find the student by receiverId
    const student = await Student.findById(receiverId);
    if (!student) {
      return res.status(404).json({ message: "Student not found" });
    }

    // Find the parent by email
    const guardianEmail = student.guardianEmail;
    const guardian = await Parent.findOne({ email: guardianEmail });
    if (!guardian) {
      return res.status(404).json({ message: "Parent not found" });
    }
    console.log(guardian, "guardian");

    // Create a new message instance
    const newMessage = new ParentToTeacherMessage({
      senderId,
      receiverId: guardian._id, // Use the _id of the parent
      studentId: student._id,
      message,
    });

    // Save the message to the database
    await newMessage.save();
    console.log("successfully", "newMessage");
    res.status(201).json({ message: "Message sent successfully" });
  } catch (error) {
    console.error("Error sending message:", error);
    res.status(500).json({ error: "Failed to send message" });
  }
};

// Controller to get all messages sent from teacher to parent
export const getAllMessagesByTeacher = async (req, res) => {
  try {
    // Fetch all messages from the database
    const studentId = req.params.studentId;
    const messages = await ParentToTeacherMessage.find({
      studentId: studentId,
    });

    console.log(messages, "messages");

    res.status(200).json({ messages });
  } catch (error) {
    console.error("Error fetching messages:", error);
    res.status(500).json({ error: "Failed to fetch messages" });
  }
};

// Controller to get messages sent from a specific teacher to a specific parent
export const getMessagesByTeacherAndParent = async (req, res) => {
  try {
    const { teacherId, parentId } = req.params;

    // Fetch messages from the database based on teacher and parent IDs
    const messages = await TeacherToParentMessage.find({
      senderId: teacherId,
      receiverId: parentId,
    });

    res.status(200).json({ messages });
  } catch (error) {
    console.error("Error fetching messages:", error);
    res.status(500).json({ error: "Failed to fetch messages" });
  }
};
