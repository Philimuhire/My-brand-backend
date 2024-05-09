import mongoose, { Schema, Document } from "mongoose";
import CommentModel from "./CommentModel";
import multer from "multer";

interface BlogModel extends Document {
    title: string;
    image: string; 
    content: string;
    comments: CommentModel[];
    likes: number;
}

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "uploads/"); 
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname); 
    }
});

const upload = multer({ storage: storage });

const BlogSchema: Schema = new Schema({
    title: { type: String, required: true },
    image: { type: String, required: true }, 
    content: { type: String, required: true },
    comments: [{ type: mongoose.Schema.Types.ObjectId, ref: "Comment" }],
    likes: { type: Number, default: 0 },
}, { timestamps: true });

const BlogModel = mongoose.model<BlogModel>("Blog", BlogSchema);
export default BlogModel;
