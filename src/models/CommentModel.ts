import mongoose from "mongoose";

interface CommentModel {
  content: string;
  blog: mongoose.Types.ObjectId; 
}

const CommentSchema = new mongoose.Schema<CommentModel>({
  content: { type: String, required: true },
  blog: { type: mongoose.Schema.Types.ObjectId, ref: "Blog", required: true },
});

const CommentModel = mongoose.model("Comment", CommentSchema);
export default CommentModel;
