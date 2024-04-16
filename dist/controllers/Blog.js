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
const multer_1 = __importDefault(require("multer"));
// Multer configuration for file uploads
const storage = multer_1.default.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "uploads/"); // Specify the directory where uploaded files should be stored
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname); // Keep the original file name
    }
});
const upload = (0, multer_1.default)({ storage: storage });
const createBlog = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { title, content } = req.body;
        let image;
        if (req.file) {
            image = req.file.path;
        }
        else {
            // Handle case where no file is uploaded
            throw new Error("No image uploaded");
        }
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
    const { blogId } = req.params;
    try {
        const blog = yield BlogModel_1.default.findById(blogId);
        if (!blog) {
            return res.status(404).json({ message: "Blog not found" });
        }
        res.json(blog);
    }
    catch (error) {
        console.error("Error retrieving blog:", error);
        res.status(500).json({ message: "Internal server error" });
    }
});
exports.getBlogById = getBlogById;
const updateBlog = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { blogId } = req.params;
    const { title, content } = req.body;
    try {
        let image;
        if (req.file) {
            image = req.file.path; // Use the path of the uploaded image file
        }
        else {
            // If no file is uploaded, retain the existing image
            const blog = yield BlogModel_1.default.findById(blogId);
            if (!blog) {
                return res.status(404).json({ message: "Blog not found" });
            }
            image = blog.image;
        }
        const updatedBlog = yield BlogModel_1.default.findByIdAndUpdate(blogId, { title, image, content }, { new: true });
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
    const { blogId } = req.params;
    try {
        const deletedBlog = yield BlogModel_1.default.findByIdAndDelete(blogId);
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
    try {
        const { blogId } = req.params;
        const { comment } = req.body;
        console.log("Received comment data:", comment);
        // Validate if comment is provided
        if (!comment) {
            return res.status(400).json({ message: "Comment is required for adding a comment" });
        }
        const blog = yield BlogModel_1.default.findById(blogId);
        if (!blog) {
            return res.status(404).json({ message: "Blog post not found" });
        }
        console.log("Found blog:", blog);
        const newComment = new CommentModel_1.default({ content: comment, blog: blogId });
        yield newComment.save();
        blog.comments.push(newComment);
        yield blog.save();
        console.log("Comment added:", newComment);
        res.status(201).json(newComment);
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
