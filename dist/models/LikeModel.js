"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const LikeSchema = new mongoose_1.default.Schema({
    blog: { type: mongoose_1.default.Schema.Types.ObjectId, ref: "Blog", required: true },
});
const LikeModel = mongoose_1.default.model("Like", LikeSchema);
exports.default = LikeModel;
