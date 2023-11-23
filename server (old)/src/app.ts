import * as dotenv from "dotenv";
dotenv.config({ path: "../../Forum_Site/server/.env" });
const uri = process.env.MONGO_URI;

import express, { Request, Response, NextFunction } from "express";

import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from "cors";

const app = express();
const userRoutes = require("./routes/userRoutes");
const postRoutes = require("./routes/postRoutes");

app.use(bodyParser.json());
app.use(cors());

app.use("/api/users", userRoutes); // => api/users/....

app.use("/api/posts", postRoutes); // => api/posts/....

app.use((error: any, req: Request, res: Response, next: NextFunction) => {
  // checks if headers were sent
  if (res.headersSent) {
    // doesnt allow further responses to be sent
    return next(error);
  }
  res.status(error.code || 500);
  res.json({ message: error.message || "Unknown Error Occured" });
});

// start server
mongoose
  .connect(uri!, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    app.listen(5000);
  })
  .catch((err) => {
    console.log(err);
  });
