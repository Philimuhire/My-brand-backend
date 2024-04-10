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
exports.getLikes = exports.getComments = exports.addLike = exports.addComment = exports.deleteBlog = exports.updateBlog = exports.getBlogById = exports.getAllBlogs = exports.createBlog = void 0;
const BlogModel_1 = __importDefault(require("../models/BlogModel"));
const CommentModel_1 = __importDefault(require("../models/CommentModel"));
const LikeModel_1 = __importDefault(require("../models/LikeModel"));
const createBlog = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { title, image, content } = req.body;
        const newBlog = yield BlogModel_1.default.create({
            title,
            image,
            content,
        });
        res.status(201).json({ message: "Blog created successfully", blog: newBlog });
    }
    catch (error) {
        res.status(400).json({ message: error.message });
    }
});
exports.createBlog = createBlog;
const getAllBlogs = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const blogs = yield BlogModel_1.default.find();
        res.json(blogs);
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
});
exports.getAllBlogs = getAllBlogs;
const getBlogById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const blog = yield BlogModel_1.default.findById(id);
        if (!blog) {
            res.status(404).json({ message: "Blog not found" });
            return;
        }
        res.json(blog);
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
});
exports.getBlogById = getBlogById;
const updateBlog = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const { title, image, content } = req.body;
    try {
        const updatedBlog = yield BlogModel_1.default.findByIdAndUpdate(id, { title, image, content }, { new: true });
        if (!updatedBlog) {
            res.status(404).json({ message: "Blog not found" });
            return;
        }
        res.json({ message: "Blog updated successfully", blog: updatedBlog });
    }
    catch (error) {
        res.status(400).json({ message: error.message });
    }
});
exports.updateBlog = updateBlog;
const deleteBlog = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const deletedBlog = yield BlogModel_1.default.findByIdAndDelete(id);
        if (!deletedBlog) {
            res.status(404).json({ message: "Blog not found" });
            return;
        }
        res.json({ message: "Blog deleted successfully" });
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
});
exports.deleteBlog = deleteBlog;
const addComment = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { blogId } = req.params;
    const { content } = req.body;
    try {
        const blog = yield BlogModel_1.default.findById(blogId);
        if (!blog) {
            return res.status(404).json({ message: "Blog post not found" });
        }
        const comment = new CommentModel_1.default({ content, blog: blogId });
        yield comment.save();
        blog.comments.push(comment);
        yield blog.save();
        res.status(201).json(comment);
    }
    catch (error) {
        console.error("Error adding comment:", error);
        res.status(500).json({ message: "Internal server error" });
    }
});
exports.addComment = addComment;
const addLike = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { blogId } = req.params;
    try {
        const blog = yield BlogModel_1.default.findById(blogId);
        if (!blog) {
            return res.status(404).json({ message: "Blog post not found" });
        }
        blog.likes++;
        yield blog.save();
        const like = new LikeModel_1.default({ blog: blogId });
        yield like.save();
        res.status(201).json({ likes: blog.likes });
    }
    catch (error) {
        console.error("Error adding like:", error);
        res.status(500).json({ message: "Internal server error" });
    }
});
exports.addLike = addLike;
const getComments = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { blogId } = req.params;
    try {
        const comments = yield CommentModel_1.default.find({ blog: blogId });
        res.status(200).json(comments);
    }
    catch (error) {
        console.error("Error fetching comments:", error);
        res.status(500).json({ message: "Internal server error" });
    }
});
exports.getComments = getComments;
const getLikes = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { blogId } = req.params;
    try {
        const likeCount = yield LikeModel_1.default.countDocuments({ blog: blogId });
        res.status(200).json({ likes: likeCount });
    }
    catch (error) {
        console.error("Error fetching likes:", error);
        res.status(500).json({ message: "Internal server error" });
    }
});
exports.getLikes = getLikes;
