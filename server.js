import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

// Middlewares
app.use(cors());
app.use(express.json());
app.use(express.static('public'));

// Routes
app.get('/api/health', (req, res) => {
    res.json({ status: 'Todo List App is running! ✅', timestamp: new Date().toISOString() });
});

app.get('/api/version', (req, res) => {
    res.json({ version: '1.0.0', name: 'Todo List App' });
});

// Start server
app.listen(PORT, () => {
    console.log(`\n📝 Todo List App running on http://localhost:${PORT}`);
    console.log(`🌐 Open your browser and go to http://localhost:${PORT}`);
    console.log(`💾 All data is stored locally in your browser\n`);
});

export { app };