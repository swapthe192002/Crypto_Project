import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

export const connectDB = async (): Promise<void> => {
  try {
    const mongoURI = process.env.MONGODB_URI || '';
    await mongoose.connect(mongoURI);
    console.log('MongoDB connected');
  } catch (error) {
    console.error(`MongoDB connection error: ${error}`);
    process.exit(1);
  }
};
