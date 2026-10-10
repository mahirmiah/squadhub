import express from "express";
import cors from "cors";

import playerRoutes from "./routes/playerRoutes";
import generateTeamRoutes from "./routes/generateTeamRoutes";
import authRoutes from "./routes/authRoutes";

const app = express();

// Allow frontend to communicate with backend
app.use(
  cors({
    origin: ["http://localhost:5173", "http://localhost:3001"],
    credentials: true,
  })
);

// Parse incoming JSON requests
app.use(express.json());

// API routes
app.use("/players", playerRoutes);
app.use("/teams", generateTeamRoutes);
app.use("/auth", authRoutes);

const PORT = 3000;

// Start Express server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
