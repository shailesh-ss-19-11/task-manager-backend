const { v4: uuidv4 } = require("uuid");
const store = require("./../data/store")
class UserService {
  createUser(name, email) {
    const id = uuidv4();
    const user = { id, name, email };
    store.users.set(id, user);
    return user;
  }

  getAllUsers() {
    return Array.from(store.users.values());
  }

  loginUser(email) {
    // Mock login: find user by email
    const user = Array.from(store.users.values()).find(u => u.email === email);
    if (!user) throw new Error("User not found");
    return user;
  }
}

module.exports = new UserService();
