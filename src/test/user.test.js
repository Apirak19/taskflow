import request from "supertest";
import express from "express";
import pool from "../config/db.js";
import userRouter from "../routes/user.route.js";

const app = express();
app.use(express.json());
app.use("/api/users", userRouter);

beforeAll(async () => {
  await pool.query(`
      CREATE TABLE IF NOT EXISTS users (
      id SERIAL PRIMARY KEY,
      name VARCHAR(255) NOT NULL,
      email TEXT,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `);
});

beforeEach(async () => {
  await pool.query(`
      DELETE FROM tasks`);
  await pool.query(`
      DELETE FROM users
      `);
});

afterAll(async () => {
  await pool.end();
});

describe("User API", () => {
  it("should fetch all users", async () => {
    const res = await request(app).get("/api/users");

    expect(res.statusCode).toBe(200);
  });
});
