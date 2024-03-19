import CatchAsyncError from "../middleware/catchAsyncError.js";
import Timetable from "../models/timeTable.js";

export const getClassesByTeacherId = CatchAsyncError(async (req, res, next) => {
  console.log("called get classes");
  console.log("user", req.user, "user");
  const teacherId = req.user._id;
  console.log(teacherId, "id teacher");
  try {
    // Query the Timetable collection to find classes based on the provided teacherId
    const classes = await Timetable.find({ teacherId: teacherId });
    console.log(classes, "classes");

    res.json(classes);
  } catch (error) {
    console.error("Error fetching classes by teacher ID:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});
