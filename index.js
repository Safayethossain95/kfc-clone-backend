const mongoose = require("mongoose");
const express = require("express");
const http = require("http");
const bodyParser = require("body-parser");
const session = require("express-session");
const cookieParser = require("cookie-parser");
const app = express();
const path = require("path");
app.use(bodyParser.json());
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));
const cors = require("cors");

const allowedOrigins = [
  "http://localhost:5173",
  "http://localhost:3000",
  "https://bpony-kfc-clone.vercel.app",
  "https://bpony-kfc-clone.vercel.app",
];
app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin || allowedOrigins.includes(origin)) {
        // Allow requests with no origin (e.g., mobile apps or Postman) or allowed origins
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
  })
);


require("dotenv").config();

const username = process.env.DB_USERNAME;
const password = process.env.DB_PASSWORD;
const cluster = process.env.DB_CLUSTER;
const dbname = process.env.DB_NAME;

const uri = `mongodb+srv://${username}:${password}@${cluster}/${dbname}?retryWrites=true&w=majority&appName=Cluster0`;

// const uri = 'mongodb://127.0.0.1:27017/ferrytech_backend';

const connectDB = async () => {
  try {
    await mongoose.connect(uri);
    console.log("Database Connected");
  } catch (err) {
    console.error("Database connection error:", err);
  }
};

connectDB();

const post_route = require("./routes/postRoute");

app.use("/api", post_route);

app.listen(8000, function () {
  console.log("Server is running");
});
