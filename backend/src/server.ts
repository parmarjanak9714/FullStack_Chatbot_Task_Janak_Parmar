import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./config/db";
import enquiryRoutes from "./routes/enquiryRoutes";


dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());
app.use("/api/enquiries", enquiryRoutes);
connectDB();

app.get("/", (_req, res) => {
  res.json({ message: "Backend is running" });
});

const PORT = 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});