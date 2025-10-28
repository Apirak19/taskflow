import pool from "../config/db.js";

export const getAllTasks = async () => {
  const res = await pool.query("SELECT * FROM tasks");
  return res.rows;
};

export const createTask = async (title, description, userID) => {
  const res = await pool.query(
    "INSERT INTO tasks (title, description, user_id) VALUES ($1, $2, $3) RETURNING *",
    [title, description, userID]
  );

  // In case there are webhooks
  if (false) {
    await fetch("https://webhook.site/aacaedc8-e811-4493-845c-6d9913a1f2fa", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        newTask: res.rows[0],
      }),
    });
  }

  return res.rows[0];
};

export const updateTaskStatus = async (id, status) => {
  const res = await pool.query(
    "UPDATE tasks SET status = $1 WHERE id = $2 RETURNING *",
    [status, id]
  );
  return res.rows[0];
};

export const deleteTask = async (id) => {
  const res = await pool.query("DELETE FROM tasks WHERE id = $1 RETURNING *", [
    id,
  ]);
  return res.rows[0];
};
