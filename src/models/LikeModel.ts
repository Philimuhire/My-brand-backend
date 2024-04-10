import mongoose from "mongoose";

interface LikeModel {
  blog: mongoose.Types.ObjectId; 
}

const LikeSchema = new mongoose.Schema<LikeModel>({
  blog: { type: mongoose.Schema.Types.ObjectId, ref: "Blog", required: true },
});

const LikeModel = mongoose.model("Like", LikeSchema);
export default LikeModel;
