import sqlite3 from 'sqlite3';
import { open } from 'sqlite';
import path from 'path';

export async function connectDB() {
  const db = await open({
    filename: path.join(__dirname, '../../data.db'),
    driver: sqlite3.Database
  });

  await db.exec(`
    CREATE TABLE IF NOT EXISTS resources (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      type TEXT NOT NULL,
      createdAt DATETIME DEFAULT CURRENT_TIMESTAMP
    )
  `);

  return db;
}
