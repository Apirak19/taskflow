import express from "express";
import {
  addTask,
  fetchAllTasks,
  modifyTask,
  removeTask,
} from "../controllers/task.controller.js";

const router = express.Router();

router.get("/", fetchAllTasks);
router.post("/", addTask);
router.put("/:id", modifyTask);
router.delete("/:id", removeTask);

export default router;
