const taskService = require("../services/taskService");

exports.createTask = (req, res) => {
  try {
    const { title, description, priority, status,assignTo } = req.body;
    const task = taskService.createTask(title, description, priority,assignTo, status);
    res.status(201).json(task);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.getAllTasks = (req, res) => {
  res.json(taskService.getAllTasks());
};

exports.assignUser = (req, res) => {
  try {
    const { taskId, userId } = req.body;
    const task = taskService.assignUser(taskId, userId);
    res.json(task);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.addDependency = (req, res) => {
  try {
    const { taskId, dependencyId } = req.body;
    const task = taskService.addDependency(taskId, dependencyId);
    res.json(task);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.updateTask = (req, res) => {
  try {
    const { taskId } = req.params;
    const task = taskService.updateTask(taskId, req.body);
    res.json(task);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.deleteTask = (req, res) => {
  try {
    const { taskId } = req.params;
    const result = taskService.deleteTask(taskId);
    res.json(result);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.markComplete = (req, res) => {
  try {
    const { taskId } = req.body;
    const task = taskService.markComplete(taskId);
    res.json(task);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.getTasksByUser = (req, res) => {
  try {
    const { userId } = req.params;
    if (!isUuid(userId)) {
      return res.status(400).json({ error: "Invalid userId format. Must be a UUID." });
    }
    const tasks = taskService.getTasksByUser(userId);
    res.json(tasks);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.getBlockedTasks = (req, res) => {
  res.json(taskService.getBlockedTasks());
};
