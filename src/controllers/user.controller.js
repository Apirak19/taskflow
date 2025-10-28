import { getAllUsers, createUser } from "../services/user.service.js";

export const getUsers = async (req, res) => {
  try {
    const users = await getAllUsers();
    res.json(users);
  } catch (e) {
    console.log("error: ", e);
    res.status(500).json({ error: "Fail to get users" });
  }
};

export const addUser = async (req, res) => {
  try {
    const { name, email } = req.body;
    const newUser = await createUser(name, email);
    res.status(201).json(newUser);
  } catch (e) {
    console.log("error: ", e);
    res.status(500).json({ error: "Fail to create user" });
  }
};
