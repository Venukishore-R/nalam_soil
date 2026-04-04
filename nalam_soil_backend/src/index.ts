import express from "express";
import cors from "cors";
import { soilTestRouter } from "./routes/soil-test";
import { authRouter } from "./routes/auth";
import { sensorRouter } from "./routes/sensor";

const app = express();
const PORT = process.env.PORT || 6001;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use("/api", authRouter);
app.use("/api", soilTestRouter);
app.use("/api", sensorRouter);

// Health check
app.get("/health", (req, res) => {
  res.json({ status: "OK", timestamp: new Date().toISOString() });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
