import CatchAsyncError from "./catchAsyncError.js";
import ErrorHandler from "../utils/ErrorHandler.js";
import jwt from "jsonwebtoken";
import Parent from "../models/parentModel.js";
import Teacher from "../models/TeacherModel.js";

// authenticated user
export const isAuthenticated = CatchAsyncError(async (req, res, next) => {
  const authorizationHeader = req.headers.authorization;
  if (!authorizationHeader) {
    return next(new ErrorHandler("Please provide an access token", 400));
  }
  const access_token = authorizationHeader.split(" ")[1];
  if (!access_token) {
    return next(new ErrorHandler("Please login to access this resource", 400));
  }

  try {
    const decoded = jwt.verify(access_token, process.env.SECRET_KEY);
    if (!decoded) {
      return next(new ErrorHandler("Access token is not valid", 400));
    }

    // Query the user data from your MySQL database
    connection.query(
      "SELECT * FROM staff_table WHERE email = ?",
      [decoded.email],
      (error, results) => {
        if (error) {
          return next(new ErrorHandler("Error while fetching staff data", 500));
        }

        if (results.length === 0) {
          return next(new ErrorHandler("Staff not found", 404));
        }

        const user = results[0];
        if (user.status === 0) {
          return next(
            new ErrorHandler("Your account has been deactivated", 404)
          );
        }
        req.user = user;
        next();
      }
    );
  } catch (error) {
    return next(new ErrorHandler("Error while verifying access token", 400));
  }
});

// validate user role
export const authorizeRoles = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role || "")) {
      return next(
        new ErrorHandler(
          `Role: ${req.user.role} is not allowed to access this resource`,
          403
        )
      );
    }
    next();
  };
};

// authenticated customer
export const isAuthenticatedParent = async (req, res, next) => {
  const authorizationHeader = req.headers.authorization;
  if (!authorizationHeader) {
    return res.status(400).json({ message: "Please provide an access token" });
  }
  const access_token = authorizationHeader.split(" ")[1];
  if (!access_token) {
    return res
      .status(400)
      .json({ message: "Please login to access this resource" });
  }
  console.log(access_token, "called", process.env.JWT_SECRET);

  try {
    const decoded = jwt.verify(access_token, process.env.JWT_SECRET);
    console.log(decoded, "decoded");
    if (!decoded) {
      return res.status(400).json({ message: "Access token is not valid" });
    }
    console.log(decoded, "email");
    const parent = await Parent.findOne({ email: decoded.email });
    if (!parent) {
      return res.status(404).json({ message: "Parent not found" });
    }
    if (!parent.status) {
      return res
        .status(404)
        .json({ message: "Your account has been deactivated" });
    }
    req.user = parent;
    next();
  } catch (error) {
    return res
      .status(400)
      .json({ message: "Error while verifying access token" });
  }
};

export const isAuthenticatedTeacher = async (req, res, next) => {
  console.log("called");
  const authorizationHeader = req.headers.authorization;
  if (!authorizationHeader) {
    return res.status(400).json({ message: "Please provide an access token" });
  }
  const access_token = authorizationHeader.split(" ")[1];
  if (!access_token) {
    return res
      .status(400)
      .json({ message: "Please login to access this resource" });
  }
  console.log(access_token, "called", process.env.JWT_SECRET);

  try {
    const decoded = jwt.verify(access_token, process.env.JWT_SECRET);
    console.log(decoded, "decoded");
    if (!decoded) {
      return res.status(400).json({ message: "Access token is not valid" });
    }
    console.log(decoded, "email");
    const teacher = await Teacher.findOne({ email: decoded.user1.email });
    console.log(teacher, "teacher");
    if (!teacher) {
      return res.status(404).json({ message: "Teacher not found" });
    }
    if (!teacher.status) {
      return res
        .status(404)
        .json({ message: "Your account has been deactivated" });
    }
    req.user = teacher;
    next();
  } catch (error) {
    return res
      .status(400)
      .json({ message: "Error while verifying access token" });
  }
};
