const express = require("express");
const router = express.Router();
const { createTask, getTask, updateTask, getTasks } = require("../controllers/taskController");
const { validateTask } = require("../middleware/validators");

router.post("/tasks", validateTask, createTask);
router.put("/tasks/:id", validateTask, updateTask);
router.get("/tasks", getTasks);
router.get("/tasks/:id", getTask);

module.exports = router;
