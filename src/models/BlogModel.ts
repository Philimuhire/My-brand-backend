import mongoose, { Schema, Document } from "mongoose";
import CommentModel from "./CommentModel";

interface BlogModel extends Document {
    title: string;
    image: string;
    content: string;
    comments: CommentModel[]; 
    likes: number; 
}

const BlogSchema: Schema = new Schema({
    title: { type: String, required: true },
    image: { type: String, required: true },
    content: { type: String, required: true },
    comments: [{ type: mongoose.Schema.Types.ObjectId, ref: "Comment" }],
    likes: { type: Number, default: 0 }, 
}, { timestamps: true });

const BlogModel = mongoose.model<BlogModel>("Blog", BlogSchema);
export default BlogModel;
