import express from 'express';
import dotenv from 'dotenv';
import connectDB from './src/lib/db.js';
import cookieParser from 'cookie-parser';

dotenv.config();
const PORT = process.env.PORT || 5001;
const app = express();
app.use(express.json());
app.use(cookieParser());


app.listen(PORT, ()=>{
  console.log(`Server is running on port ${PORT}`);
  connectDB();
})