const Task = require("../models/Task");
const NodeCache = require("node-cache");
const cache = new NodeCache({ stdTTL: 100, checkperiod: 120 }); // Cache for 100 seconds

exports.createTask = async (req, res, next) => {
  try {
    const { title, description } = req.body;
    const priority = calculatePriority(description); // Placeholder for priority calculation
    const task = await Task.create({ title, description, priority });
    // Cache the newly created task
    cache.set(task._id.toString(), task);
    res.status(201).json(task);
  } catch (error) {
    next(error);
  }
};

exports.getTask = async (req, res, next) => {
  try {
    const { id } = req.params;

    // Check if the task is in the cache
    const cachedTask = cache.get(id);
    if (cachedTask) {
      return res.json(cachedTask);
    }

    // If not cached, fetch from database
    const task = await Task.findById(id);
    if (!task) return res.status(404).json({ message: "Task not found" });

    // Store the task in cache
    cache.set(id, task);

    res.json(task);
  } catch (error) {
    next(error);
  }
};

exports.updateTask = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { title, description } = req.body;
    const task = await Task.findById(id);
    if (!task) return res.status(404).json({ message: "Task not found" });

    task.title = title || task.title;
    task.description = description || task.description;
    if (description) task.priority = calculatePriority(description);
    await task.save();

    cache.set(id, task);

    res.json(task);
  } catch (error) {
    next(error);
  }
};

const calculatePriority = (description) => {
  return Math.random();
};
