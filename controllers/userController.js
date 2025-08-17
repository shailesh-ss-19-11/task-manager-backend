const userService = require("../services/userService");

exports.createUser = (req, res) => {
  try {
    const { name, email } = req.body;
    const user = userService.createUser(name, email);
    res.status(201).json(user);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.getAllUsers = (req, res) => {
  res.json(userService.getAllUsers());
};

exports.loginUser = (req, res) => {
  console.log(req.body)
  try {
    const { email } = req.body;
    const user = userService.loginUser(email);
    res.json(user);
  } catch (err) {
    res.status(404).json({ error: err.message });
  }
};
