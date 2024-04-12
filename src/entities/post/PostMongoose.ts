import mongoose, { Schema } from 'mongoose';
import { IPost } from './Protocol';

const postsSchema = new Schema<IPost>({
    title: { type: String, require: true },
    body: { type: String, require: true },
});

export default mongoose.models.Posts || mongoose.model('Posts', postsSchema);
