import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import authRoutes from "./routes/auth.routes.js";
import todoRoutes from "./routes/todo.routes.js";
import connectDb from "./db/connectDb.js";
import cookieParser from "cookie-parser";

const app = express();
app.use(cors({
  origin: "http://localhost:5173", // change to your frontend's URL/port
  credentials: true
}));
dotenv.config();
app.use(express.json());
app.use(cookieParser());
connectDb();


const PORT = process.env.PORT || 5000;

app.use("/api/auth", authRoutes);
app.use("/api/todo", todoRoutes);



app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
