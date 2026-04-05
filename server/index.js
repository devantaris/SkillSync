import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { errorHandler } from './middleware/errorHandler.js';

// Routes
import authRoutes from './routes/auth.js';
import courseRoutes from './routes/courses.js';
import skillRoutes from './routes/skills.js';
import creditRoutes from './routes/credits.js';
import agentRoutes from './routes/agents.js';
import paymentRoutes from './routes/payments.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors({
  origin: process.env.CLIENT_URL || 'http://localhost:5173',
  credentials: true,
}));
app.use(express.json());

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/courses', courseRoutes);
app.use('/api/skills', skillRoutes);
app.use('/api/credits', creditRoutes);
app.use('/api/agents', agentRoutes);
app.use('/api/payments', paymentRoutes);

// 404
app.use((req, res) => {
  res.status(404).json({ error: 'Route not found' });
});

// Global error handler
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`\n  🚀 SkillSync API running at http://localhost:${PORT}`);
  console.log(`  📋 Health: http://localhost:${PORT}/api/health\n`);
});
