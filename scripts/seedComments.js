// scripts/seedComments.js
import { connectDB } from '../db.js';

const insertSampleComments = async () => {
  try {
    const db = await connectDB();
    const now = new Date().toISOString();

    await db.run(`
      INSERT INTO comments (ticketId, comment, createdAt) VALUES 
      (7, 'We are looking into this issue.', '${now}'),
      (8, 'Can you please provide more details?', '${now}'),
      (8, 'This ticket is being handled by support team.', '${now}'),
      (9, 'Ticket closed as duplicate.', '${now}')
    `);

    console.log('Sample comments inserted successfully.');
  } catch (err) {
    console.error('Failed to insert sample comments:', err.message);
  }
};

insertSampleComments();
