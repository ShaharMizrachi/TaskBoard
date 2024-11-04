const express = require("express");
const router = express.Router();
const { createTask, getTask, updateTask } = require("../controllers/taskController");

router.post("/tasks", createTask);
router.get("/tasks/:id", getTask);
router.put("/tasks/:id", updateTask);

module.exports = router;
