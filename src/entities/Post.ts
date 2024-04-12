import mongoose, { Schema } from 'mongoose';

interface IPost {
    title: string;
    body: string;
}

const postsSchema = new Schema<IPost>({
    title: { type: String, require: true },
    body: { type: String, require: true },
});

export default mongoose.models.Posts || mongoose.model('Posts', postsSchema);
