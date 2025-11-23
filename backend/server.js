import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import sequelize from './dbConfig.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// PostgreSQL connection test
sequelize.authenticate()
  .then(() => console.log('Connected to PostgreSQL'))
  .catch(err => console.error('Could not connect to PostgreSQL:', err));

// Routes
app.get('/', (req, res) => {
  res.send('my accounting app is running');
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});