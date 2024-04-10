"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
const User_1 = __importDefault(require("./routes/User"));
const Blog_1 = __importDefault(require("./routes/Blog"));
const ContactQuery_1 = __importDefault(require("./routes/ContactQuery"));
const app = (0, express_1.default)();
mongoose_1.default.connect("mongodb+srv://Philimuhire:Phili123@philbertapi.ue2svev.mongodb.net/?retryWrites=true&w=majority&appName=PhilbertAPI").then(() => {
    console.log("database connected");
}).catch((error) => {
    console.log(error.message);
});
app.use(express_1.default.json());
app.use("/auth", User_1.default);
app.use("/blog", Blog_1.default);
app.use("/contact", ContactQuery_1.default);
app.listen(5000, () => {
    console.log("server running on port 5000");
});
