require("dotenv").config({ path: "../../Forum_Site/backend/.env" });
const uri = process.env.MONGO_URI;

const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const cors = require("cors");
const app = express();
const userRoutes = require("./routes/userRoutes");
const postRoutes = require("./routes/postRoutes");

app.use(bodyParser.json());
app.use(cors());

app.use("/api/users", userRoutes); // => api/users/....

app.use("/api/posts", postRoutes); // => api/posts/....

app.use((error, req, res, next) => {
  // checks if headers were sent
  if (res.headerSent) {
    // doesnt allow further responses to be sent
    return next(error);
  }
  res.status(error.code || 500);
  res.json({ message: error.message || "Unknown Error Occured" });
});

// start server
mongoose
  .connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    app.listen(5000);
  })
  .catch((err) => {
    console.log(err);
  });
