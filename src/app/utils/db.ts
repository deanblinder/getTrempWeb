import mongoose from "mongoose"

export const connectDB = async () => {
    try {
        if (!process.env.MONGO_URI) {
            throw new Error('MONGO_URI environment variable is not defined');
        }
        await mongoose.connect(process.env.MONGO_URI);
    } catch (error) {
        console.log(error)
        throw new Error('Connection Error');
    }
}