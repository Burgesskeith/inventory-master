import mongoose from "mongoose";
import "dotenv/config";

async function connectDB() {
    try {
        await mongoose.connect(process.env.MONGODB);
        console.log("Mongo DB is connected");
    } catch (error) {
        console.error(error);
    }
}
connectDB();