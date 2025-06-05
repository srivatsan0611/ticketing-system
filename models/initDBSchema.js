// Initialise the Database Schema for the Tables

import { connectDB } from '../db.js';

export async function initDB() {
  const db = await connectDB();

  await db.exec(`
    CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      role TEXT CHECK(role IN ('employee', 'support')) NOT NULL
    );
    
  `); // Seed Data

  

  await db.exec(`
    CREATE TABLE IF NOT EXISTS tickets (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      title TEXT,
      description TEXT,
      status TEXT CHECK(status IN ('open', 'in_progress', 'closed')) DEFAULT 'open',
      createdAt TEXT,
      updatedAt TEXT,
      createdBy INTEGER,
      assignedTo INTEGER,
      FOREIGN KEY(createdBy) REFERENCES users(id),
      FOREIGN KEY(assignedTo) REFERENCES users(id)
    );
  `);
}
