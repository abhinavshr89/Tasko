import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import authRoutes from "./routes/auth.routes.js";
import todoRoutes from "./routes/todo.routes.js";

const app = express();
dotenv.config();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 5000;

app.use("/api/auth", authRoutes);
app.use("/api/todo", todoRoutes);

app.get("/", (req, res) => {
    res.send("Hello from the server!");
    }
);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
