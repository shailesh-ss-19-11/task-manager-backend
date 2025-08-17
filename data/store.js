// In-memory "database"
const store = {
  users: new Map(),  // userId -> { id, name, email }
  tasks: new Map(),  // taskId -> { id, title, desc, priority, status, assignedTo, deps }
};

module.exports = store;
