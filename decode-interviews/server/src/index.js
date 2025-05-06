import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import morgan from 'morgan';
import questionRoutes from './routes/questions.js';  // Importing the routes for questions

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware setup
app.use(cors());                      // Enable Cross-Origin Resource Sharing
app.use(express.json());              // Parse incoming JSON requests
app.use(morgan('dev'));               // Log HTTP requests using Morgan

// Basic route to check server status
app.get('/', (req, res) => {
  res.send('Decode backend is running! ✅');
});

// Set up routes for questions
app.use('/api/questions', questionRoutes);

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
