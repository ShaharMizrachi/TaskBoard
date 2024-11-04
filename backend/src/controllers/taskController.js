const Task = require("../models/Task");

exports.createTask = async (req, res, next) => {
  try {
    const { title, description } = req.body;
    const priority = calculatePriority(description); // Placeholder for priority calculation
    const task = await Task.create({ title, description, priority });
    res.status(201).json(task);
  } catch (error) {
    next(error);
  }
};

exports.getTask = async (req, res, next) => {
  try {
    const task = await Task.findById(req.params.id);
    if (!task) return res.status(404).json({ message: "Task not found" });
    res.json(task);
  } catch (error) {
    next(error);
  }
};

exports.updateTask = async (req, res, next) => {
  try {
    const { title, description } = req.body;
    const task = await Task.findById(req.params.id);
    if (!task) return res.status(404).json({ message: "Task not found" });
    task.title = title || task.title;
    task.description = description || task.description;
    if (description) task.priority = calculatePriority(description);
    await task.save();
    res.json(task);
  } catch (error) {
    next(error);
  }
};

const calculatePriority = (description) => {
  // Implement your priority calculation logic here
  return Math.random(); // Placeholder priority calculation
};
