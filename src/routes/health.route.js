import express from "express";
import pool from "../config/db.js";

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const result = await pool.query("SELECT NOW()");
    res.json({
      status: "ok",
      message: "Server and database are healthy",
      time: result.rows[0].now,
    });
  } catch (e) {
    console.log("error: ", e);

    res.status(500).json({
      status: "error",
      message: "Database connection error",
    });
  }
});

export default router;
