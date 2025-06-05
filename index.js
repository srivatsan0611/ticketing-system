// index.js
import express from 'express';
import { initDB } from './models/initDBSchema.js';
import ticketRoutes from './routers/tickets.js';
import path from 'path';
import { fileURLToPath } from 'url';
import commentRoutes from './routers/comments.js';


const app = express();
const __dirname = path.dirname(fileURLToPath(import.meta.url));

app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

initDB().then(() => console.log('DB Initialized'));

app.use('/api/tickets', ticketRoutes);
app.use('/api/comments', commentRoutes);


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
