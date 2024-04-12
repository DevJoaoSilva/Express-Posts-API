import mongoose from 'mongoose';

class MongoDB {
    public async connectDB() {
        try {
            await mongoose.connect(process.env.MONGO_URI as string);
            console.log('Connected to MongoDB');
        } catch (error) {
            console.log(error);
        }
    }
}

export default new MongoDB().connectDB;
