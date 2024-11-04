const express = require("express");
const mongoose = require("mongoose");
const errorHandler = require("./middleware/errorHandler");
const morgan = require("morgan");
const cors = require("cors");
const dotenv = require("dotenv");
const taskRoutes = require("./routes/taskRoutes");

dotenv.config();

const app = express();

// Global Middleware
app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

// Connect to MongoDB
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.log(err));

// Define Routes
app.use("/api", taskRoutes);

// Routes Placeholder
app.get("/", (req, res) => res.send("API is running..."));

// Catch-All for Undefined Routes (404 Handler)
app.use((req, res, next) => {
  const error = new Error("Not Found");
  error.status = 404;
  next(error);
});

// Error Handler Middleware
app.use(errorHandler);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
