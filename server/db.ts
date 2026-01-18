import mongoose from 'mongoose';

export async function connectDB() {
  const uri = "mongodb+srv://Truepathtemp:Truepathtemp@rightpath.kdovr8j.mongodb.net/opti?retryWrites=true&w=majority";
  if (!uri) {
    console.error("MONGODB_URI not found in environment variables. Please set it in the Secrets tab.");
    return false;
  }

  try {
    await mongoose.connect(uri);
    console.log("MongoDB connected successfully");
    return true;
  } catch (error) {
    console.error("MongoDB connection error:", error);
    return false;
  }
}
