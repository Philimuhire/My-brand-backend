"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const UserSchema = new mongoose_1.default.Schema({
    username: { type: String },
    email: { type: String },
    password: { type: String }
});
const UserModel = module.exports = mongoose_1.default.model("Users", UserSchema);
exports.default = UserModel;
