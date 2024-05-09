"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
const cors_1 = __importDefault(require("cors"));
const User_1 = __importDefault(require("./routes/User"));
const Blog_1 = __importDefault(require("./routes/Blog"));
const ContactQuery_1 = __importDefault(require("./routes/ContactQuery"));
const BlogModel_1 = __importDefault(require("./models/BlogModel"));
const swagger_ui_express_1 = __importDefault(require("swagger-ui-express"));
const swagger_1 = __importDefault(require("./swagger"));
const multer_1 = __importDefault(require("./cloudinary/multer"));
const app = (0, express_1.default)();
mongoose_1.default.connect("mongodb+srv://Philimuhire:Phili123@philbertapi.ue2svev.mongodb.net/?retryWrites=true&w=majority&appName=PhilbertAPI").then(() => {
    console.log("MongoDB connected");
}).catch((error) => {
    console.log(error.message);
});
//app.use(express.static(path.join(__dirname, 'uploads/')))
app.use(express_1.default.json());
app.use(multer_1.default.single("image"));
app.use((0, cors_1.default)());
app.use("/auth", User_1.default);
app.use("/blog", Blog_1.default);
app.use("/contact", ContactQuery_1.default);
app.use('/api-docs', swagger_ui_express_1.default.serve, swagger_ui_express_1.default.setup(swagger_1.default));
app.get("/blogs", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const blogs = yield BlogModel_1.default.find();
        res.json(blogs);
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
}));
app.listen(5000, () => {
    console.log("server running on port 5000");
});
