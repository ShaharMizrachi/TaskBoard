const Task = require("../models/Task");
const NodeCache = require("node-cache");
const cache = new NodeCache({ stdTTL: 100, checkperiod: 120 }); // Cache for 100 seconds

exports.createTask = async (req, res, next) => {
  try {
    const { title, description } = req.body;
    const priority = calculatePriority(description, title);
    const task = await Task.create({ title, description, priority });

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

exports.getTasks = async (req, res, next) => {
  try {
    const { page = 1, limit = 10, priority, title, sortBy = "createdAt", order = "asc" } = req.query;

    // filter object for querying tasks
    const filter = {};
    if (priority) filter.priority = priority; // Filter by priority
    if (title) filter.title = { $regex: title, $options: "i" }; // Case-insensitive search for title

    // Fetching tasks from the database with filtering, sorting, and pagination
    const tasks = await Task.find(filter)
      .sort({ [sortBy]: order === "asc" ? 1 : -1 }) // Sort tasks based on sortBy and order
      .skip((page - 1) * limit) // Skip tasks for previous pages
      .limit(parseInt(limit)); // Limit the number of tasks per page

    // Counting total tasks that match the filter for pagination metadata
    const totalTasks = await Task.countDocuments(filter);
    const totalPages = Math.ceil(totalTasks / limit); // Calculating total pages

    res.json({
      tasks,
      meta: {
        totalTasks,
        totalPages,
        currentPage: parseInt(page),
        tasksPerPage: parseInt(limit),
      },
    });
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

    // Update fields and recalculate priority if description or title is updated
    task.title = title || task.title;
    task.description = description || task.description;
    if (description || title) {
      task.priority = calculatePriority(task.description, task.title);
    }

    await task.save();

    // Update the cache
    cache.set(id, task);

    res.json(task);
  } catch (error) {
    next(error);
  }
};

const calculatePriority = (description, title) => {
  let score = 0;

  // Description Length
  if (description.length < 10) {
    score += 1;
  } else if (description.length <= 20) {
    score += 2;
  } else {
    score += 3;
  }

  // Title Length
  if (title.length < 5) {
    score += 0.5;
  } else if (title.length <= 15) {
    score += 1;
  } else {
    score += 1.5;
  }

  // Keyword Presence
  const keywords = {
    urgent: 2,
    important: 1.5,
    "low-priority": -1,
  };
  const keywordKeys = Object.keys(keywords);

  for (const keyword of keywordKeys) {
    if (description.toLowerCase().includes(keyword) || title.toLowerCase().includes(keyword)) {
      score += keywords[keyword];
    }
  }

  // Normalize the score to a range of 0-1
  const maxScore = 8;
  const normalizedScore = Math.min(score / maxScore, 1);

  return normalizedScore;
};
