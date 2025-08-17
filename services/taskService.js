const store = require("./../data/store");
const { v4: uuidv4 } = require("uuid");

class TaskService {
  createTask(title, description, priority, assignedTo, status) {
    console.log(title, description, priority,assignedTo, status, "title, description, priority,assignedTo, status")
    const id = uuidv4();
    const task = { id, title, description, priority, status, assignedTo, dependencies: [] };
    store.tasks.set(id, task);
    return task;
  }

  getAllTasks() {
    return Array.from(store.tasks.values());
  }

  assignUser(taskId, userId) {
    const task = store.tasks.get(taskId);
    if (!task) throw new Error("Task not found");
    if (!store.users.has(userId)) throw new Error("User not found");
    task.assignedTo = userId;
    return task;
  }

  addDependency(taskId, dependencyId) {
    const task = store.tasks.get(taskId);
    if (!task) throw new Error("Task not found");
    if (!store.tasks.has(dependencyId)) throw new Error("Dependency task not found");
    task.dependencies.push(dependencyId);
    return task;
  }

  updateTask(taskId, updates) {
    const task = store.tasks.get(taskId);
    if (!task) throw new Error("Task not found");
    Object.assign(task, updates);
    return task;
  }

  deleteTask(taskId) {
    if (!store.tasks.has(taskId)) throw new Error("Task not found");
    store.tasks.delete(taskId);
    return { message: "Task deleted" };
  }

  markComplete(taskId) {
    const task = store.tasks.get(taskId);
    if (!task) throw new Error("Task not found");
    // Check dependencies
    const blocked = task.dependencies.some(depId => {
      const depTask = store.tasks.get(depId);
      return depTask && depTask.status !== "Done";
    });
    if (blocked) throw new Error("Cannot complete task: dependencies incomplete");

    task.status = "Done";
    return task;
  }

  getTasksByUser(userId) {
    return Array.from(store.tasks.values()).filter(task => task.assignedTo === userId);
  }

  getBlockedTasks() {
    return Array.from(store.tasks.values()).filter(task =>
      task.dependencies.some(depId => {
        const depTask = store.tasks.get(depId);
        return depTask && depTask.status !== "Done";
      })
    );
  }
}

module.exports = new TaskService();
