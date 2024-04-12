import mongoose from 'mongoose';
import { DB } from './protocol';

class MongoDB implements DB {
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
