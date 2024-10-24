import mongoose from 'mongoose';
import 'dotenv/config';  // Load environment variables from .env

const connectDB = async () => {
  try {
    const mongoURI = process.env.MONGO_URI; // Fetch MongoDB URI from environment variables
    await mongoose.connect(mongoURI); // No need for useNewUrlParser and useUnifiedTopology
    console.log('MongoDB connected successfully.');
  } catch (error) {
    console.error('MongoDB connection error:', error);
    process.exit(1); // Exit the process with failure
  }
};

export { connectDB }; // Named export
