import express from 'express';
import * as dotenv from 'dotenv';
import authRoutes from './routes/Auth.routes.js';
import mongoose from 'mongoose';
import { connectDB } from './config/db.js';

dotenv.config();

const PORT = process.env.PORT;

const app = express();

app.use(express.json());

app.use(authRoutes);

connectDB();

mongoose.connection.on('error',(err) => {
    console.error('MongoDB connection error:',err.message);
});

mongoose.connection.on('disconected',() => {
    console.warm('MongoDB disconnected');
})

app.listen(PORT,() => {
    console.log(`Servidor corriendo en puerto ${PORT}`);
})