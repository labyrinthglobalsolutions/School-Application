import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import bodyParser from "body-parser";
import addWwwToUrl from "./utils/mulUrl.js";
import connectDatabase from "./db.js";
import { adminRouter } from "./routes/adminRoute.js";
import ErrorMiddleware from "./middleware/error.js";
import { parentRouter } from "./routes/parentRoute.js";
import { teacherRoute } from "./routes/teacherRoute.js";
import { classTeacherRoute } from "./routes/classTeacherRoute.js";

dotenv.config();

const app = express();
const port = process.env.PORT || 3009;
const frontendURL = process.env.FRONT_END_URL;
const allowedOrigins = [frontendURL, addWwwToUrl(frontendURL)];
console.log("setting cors origins to: " + allowedOrigins);

app.use(express.json());
app.use(express.static("uploads"));
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: false }));
app.use(
  cors({
    origin: allowedOrigins,
    credentials: true,
  })
);

// Example of using express.Router() for API versioning
const apiRouterV1 = express.Router();
apiRouterV1.get("/", (req, res) => {
  res.send("API version 1");
});
app.use(
  "/api/v1",
  apiRouterV1,
  adminRouter,
  parentRouter,
  teacherRoute,
  classTeacherRoute
);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
  connectDatabase(); // Assuming connectDatabase() is your MongoDB connection function
});

app.use(ErrorMiddleware);
