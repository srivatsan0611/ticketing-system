
import { connectDB } from '../db.js';

export async function createTicket(req, res) {
  try {
    const { title, description, createdBy, status = 'open' } = req.body;
    const db = await connectDB();
    const createdAt = new Date().toISOString();

    await db.run(
      `INSERT INTO tickets (title, description, status, createdAt, updatedAt, createdBy) VALUES (?, ?, ?, ?, ?, ?)`,
      [title, description, status, createdAt, createdAt, createdBy]
    );

    res.status(201).json({ message: 'Ticket created successfully' });
  } catch (err) {
    console.error('Create Ticket Error:', err.message);
    res.status(500).json({ error: 'Internal server error' });
  }
}

export async function getTickets(req, res) {
  try {
    const db = await connectDB();
    const { status, user } = req.query;

    let query = 'SELECT * FROM tickets';
    let params = [];

    if (status || user) {
      query += ' WHERE';
      if (status) {
        query += ' status = ?';
        params.push(status);
      }
      if (status && user) query += ' AND';
      if (user) {
        query += ' createdBy = ?';
        params.push(user);
      }
    }

    const tickets = await db.all(query, params);
    res.json(tickets);
  } catch (err) {
    res.status(500).json({ error: 'Internal server error' });
  }
}

export async function updateTicket(req, res) {
  try {
    const { id } = req.params;
    const { status, description } = req.body;
    const updatedAt = new Date().toISOString();
    const db = await connectDB();

    await db.run(
      `UPDATE tickets SET status = ?, description = ?, updatedAt = ? WHERE id = ?`,
      [status, description, updatedAt, id]
    );

    res.json({ message: 'Ticket updated' });
  } catch (err) {
    res.status(500).json({ error: 'Internal server error' });
  }
}

export async function deleteTicket(req, res) {
  try {
    const { id } = req.params;
    const db = await connectDB();
    await db.run(`DELETE FROM tickets WHERE id = ?`, [id]);

    res.json({ message: 'Ticket deleted' });
  } catch (err) {
    res.status(500).json({ error: 'Internal server error' });
  }
}

export async function assignTicket(req, res) {
  try {
    const { id } = req.params;
    const { assignedTo } = req.body;
    const updatedAt = new Date().toISOString();
    const db = await connectDB();

    // Check if assignedTo exists first and is a "support"
    const user = await db.get(`SELECT * FROM users WHERE id = ?`, [assignedTo]);

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    if (user.role !== 'support') {
      return res.status(400).json({ error: 'Assigned user is not a support engineer' });
    }

    // Proceed with assignment
    await db.run(
      `UPDATE tickets SET assignedTo = ?, updatedAt = ? WHERE id = ?`,
      [assignedTo, updatedAt, id]
    );

    res.json({ message: `Ticket assigned to ${user.name} (Support Engineer)` });
  } catch (err) {
    console.error('Assignment error:', err.message);
    res.status(500).json({ error: 'Internal server error' });
  }
}

