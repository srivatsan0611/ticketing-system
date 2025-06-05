import { connectDB } from "../db.js";

const seedUsers = async () => {
    try{
        const db = await connectDB();

        await db.run(`
            INSERT INTO users (name, role) VALUES 
    ('Srivatsan', 'employee'),
    ('XYZ', 'support'),
    ('Srinivasan', 'support'),
    ('SS', 'employee');`);

    console.log('Users successfully initialised (seeded)');
    process.exit(0);
    } catch (error) {
        console.error('Failed to seed users: ', error);
        process.exit(1);
    }
}