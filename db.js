// Set up the connection for the Database (SQLite)

import sqlite3 from 'sqlite3';
import {open} from 'sqlite';

export async function connectDB() {
  return open({
    filename: './ticket-system.db',
    driver: sqlite3.Database
  });
}
