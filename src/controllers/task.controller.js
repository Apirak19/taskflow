import {
  getAllTasks,
  createTask,
  updateTaskStatus,
  deleteTask,
} from "../services/task.service.js";

export const fetchAllTasks = async (req, res) => {
  try {
    const tasks = await getAllTasks();
    res.json(tasks);
  } catch (e) {
    console.log("error: ", e);
    res.status(500).json({ error: "Failed to fetch tasks" });
  }
};

export const addTask = async (req, res) => {
  try {
    const { title, description, userID } = req.body;
    const newTask = await createTask(title, description, userID);
    res.status(201).json(newTask);
  } catch (e) {
    console.log("error: ", e);
    res.status(500).json({ error: "Failed to add task" });
  }
};

export const modifyTask = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;
    const modifiedTask = await updateTaskStatus(id, status);
    res.json(modifiedTask);
  } catch (e) {
    console.log("error: ", e);
    res.status(500).json({ error: "Failed to modify task" });
  }
};

export const removeTask = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedTask = await deleteTask(id);
    res.json(deletedTask);
  } catch (e) {
    console.log("error: ", e);
    res.status(500).json({ error: "Failed to remove task" });
  }
};
