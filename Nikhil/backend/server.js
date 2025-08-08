import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { connectToDatabase } from "./utils/database.js";
import userRoutes from "./routes/userData-routes.js";
import generalRoute from "./routes/general-routes.js"

dotenv.config();

const app = express();
const port = process.env.PORT || 5000;

const corsOptions = {
  origin: 'http://localhost:5173',
  methods: ['GET', 'POST'], 
  allowedHeaders: ['Content-Type', 'Authorization'] 
};

app.use(cors(corsOptions));
app.use(express.json());

connectToDatabase().then(() => {
  app.use("/user", userRoutes);
  app.use("/general",generalRoute);
  app.listen(port, () => {
    console.log(`Server running on port ${port}`);
  });
}).catch((err) => {
  console.error("Failed to start server due to DB error:", err);
});
