import './constants.js';
import express from "express";
import cors from "cors";
import { connectDB } from "./DB/Database.js";
import bodyParser from "body-parser";
import helmet from "helmet";
import morgan from "morgan";
import sleepRoutes from "./Routers/sleepRoutes.js";
import moodRoutes from "./Routers/moodRoutes.js"; 
import userRoutes from "./Routers/userRoutes.js";
import postRoutes from "./Routers/postRoutes.js";

const app = express();
const port = process.env.PORT || 10000; // fallback in case PORT is not set

// Connect to MongoDB
connectDB();

// ✅ Add your own frontend URL here
const allowedOrigins = [
  'http://localhost:5173',
  'http://localhost:3000',
  'https://raga-main.vercel.app',  // ✅ Your deployed frontend
];

app.use(express.json());
app.use(helmet());
app.use(morgan("dev"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(
  cors({
    origin: allowedOrigins,
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE"],
  })
);

// API Routes
app.use("/api/v1/sleep", sleepRoutes); 
app.use("/api/v1/mood", moodRoutes);   
app.use("/api/v1/user", userRoutes);
app.use("/api/v1/post", postRoutes);

// Health Check or root
app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(port, () => {
  console.log(`✅ Server is running on http://localhost:${port}`);
});
