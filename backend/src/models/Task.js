const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema({
  title: { type: String, required: true, trim: true },
  description: { type: String, required: true, trim: true },
  priority: { type: Number, required: true, min: 0, max: 1 }, // priority ranges from 0 to 1
});

const Task = mongoose.model("Task", taskSchema);
module.exports = Task;
