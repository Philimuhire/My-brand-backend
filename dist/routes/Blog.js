"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const Blog_1 = require("../controllers/Blog");
const router = express_1.default.Router();
router.post("/createBlog", Blog_1.createBlog);
router.get("/getAllBlogs", Blog_1.getAllBlogs);
router.get("/getBlogById/:blogId", Blog_1.getBlogById);
router.put("/updateBlog/:blogId", Blog_1.updateBlog);
router.delete("/deleteBlog/:blogId", Blog_1.deleteBlog);
router.post("/addComment/:blogId", Blog_1.addComment);
router.post("/addLike/:blogId", Blog_1.addLike);
router.get("/getComments/:blogId", Blog_1.getComments);
router.get("/getLikes/:blogId", Blog_1.getLikes);
exports.default = router;
