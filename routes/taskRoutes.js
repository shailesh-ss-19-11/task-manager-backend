const express = require("express");
const router = express.Router();
const taskController = require("../controllers/taskController");

router.post("/", taskController.createTask);
router.get("/", taskController.getAllTasks);
router.post("/assign", taskController.assignUser);
router.post("/dependency", taskController.addDependency);
router.put("/:taskId", taskController.updateTask);
router.delete("/:taskId", taskController.deleteTask);
router.post("/complete", taskController.markComplete);
router.get("/user/:userId", taskController.getTasksByUser);
router.get("/blocked", taskController.getBlockedTasks);

module.exports = router;
