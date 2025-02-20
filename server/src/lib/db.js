import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();


const connectDB = async () => {
    try {
        const dbconnect = await mongoose.connect(process.env.MONGO_URI)
        console.log(`MongoDB connected: ${dbconnect.connection.host}`);
    }
    catch (error) {
        console.error(`Error connecting to MongoDB: ${error.message}`);
    }
}

export default connectDB;