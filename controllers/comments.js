import { connectDB } from '../db.js';

export async function addComment(req, res) {
  try {
    const { ticketId } = req.params;
    const { comment } = req.body;
    const createdAt = new Date().toISOString();

    const db = await connectDB();
    await db.run(
      `INSERT INTO comments (ticketId, comment, createdAt) VALUES (?, ?, ?)`,
      [ticketId, comment, createdAt]
    );

    res.status(201).json({ message: 'Comment added successfully' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to add comment' });
  }
}

export async function getComments(req, res) {
  try {
    const { ticketId } = req.params;
    const db = await connectDB();
    const comments = await db.all(
      `SELECT * FROM comments WHERE ticketId = ? ORDER BY createdAt DESC`,
      [ticketId]
    );

    res.json(comments);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch comments' });
  }
}
