import request from "supertest";
import express from "express";
import pool from "../config/db.js";
import taskRouter from "../routes/task.route.js";

const app = express();
app.use(express.json());
app.use("/api/tasks", taskRouter);

let testUserId;

beforeAll(async () => {
  // recreate table in test DB
  await pool.query(`
    CREATE TABLE IF NOT EXISTS users (
      id SERIAL PRIMARY KEY,
      name VARCHAR(255) NOT NULL,
      email TEXT,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );

    CREATE TABLE IF NOT EXISTS tasks (
      id SERIAL PRIMARY KEY,
      title VARCHAR(255) NOT NULL,
      description TEXT,
      user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE, 
      status VARCHAR(50) DEFAULT 'pending',
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );
  `);

  const insertUser = await pool.query(`
  INSERT INTO users (name, email)
  VALUES ('Test User', 'test@example.com')
  ON CONFLICT DO NOTHING
  RETURNING id;
`);

  testUserId = insertUser.rows[0].id;
});

beforeEach(async () => {
  // clean table before each test
  await pool.query("DELETE FROM tasks");
});

afterAll(async () => {
  await pool.end();
});

describe("Task API", () => {
  it("should create a new task", async () => {
    const res = await request(app).post("/api/tasks").send({
      title: "Test Task",
      description: "Created via test",
      userID: testUserId,
    });

    expect(res.statusCode).toBe(201);
    expect(res.body.title).toBe("Test Task");
  });

  it("should fetch all tasks", async () => {
    await pool.query(
      "INSERT INTO tasks (title, description, user_id) VALUES ($1, $2, $3)",
      ["Seed Task", "For fetch test", testUserId]
    );

    const res = await request(app).get("/api/tasks");
    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
    expect(res.body.length).toBeGreaterThan(0);
  });

  it("should update a task status", async () => {
    const insert = await pool.query(
      "INSERT INTO tasks (title, description, user_id) VALUES ($1, $2, $3) RETURNING *",
      ["Update Task", "Needs update", testUserId]
    );
    const task = insert.rows[0];

    const res = await request(app)
      .put(`/api/tasks/${task.id}`)
      .send({ status: "completed" });

    expect(res.statusCode).toBe(200);
    expect(res.body.status).toBe("completed");
  });
});
