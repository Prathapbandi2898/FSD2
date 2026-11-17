import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/db.js";

dotenv.config();
const PORT = process.env.PORT || 8000;
const MONGO_URI = process.env.MONGO_URI;

const app = express();
app.use(express.json());

// establishing connection with mongodb
if (MONGO_URI) {
  connectDB(MONGO_URI);
}

// Notice: mvc_auc_app is an in-progress lab module missing routes/movieRoutes.js,
// authenticate middleware, and auth controller methods.
app.get("/api/v1/auc", (req, res) => {
  res.json({ message: "mvc_auc_app service placeholder (routes pending implementation)" });
});

//404
app.use((req, res) => {
  res.status(404);
  res.json({ message: "Route Not Found" });
});
//Error handling middleware
app.use((err, req, res, next) => {
  const status = err.status || 500;
  const message = err.message || "Internal Server Error";
  res.status(status).json({ message });
});

if (!process.env.VERCEL) {
  app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
  });
}

export default app;