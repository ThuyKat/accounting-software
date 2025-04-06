import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
const app = express()
const PORT = process.env.PORT || 5000
 // Middleware
app.use(cors())
app.use(express.json())
dotenv.config()
// MongoDB connection
mongoose.connect(process.env.MONGODB_URI)
.then(() => console.log('Connected to MongoDB'))
.catch(err => console.error('Could not connect to MongoDB', err))
//Routes
app.get('/', (req, res) => {
    res.send('my accouting app is running')
})
app.listen(PORT)