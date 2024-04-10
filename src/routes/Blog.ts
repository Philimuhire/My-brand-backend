import express from "express";
import { createBlog, getAllBlogs, getBlogById, updateBlog, deleteBlog, addComment, addLike, getComments, getLikes } from "../controllers/Blog";

const router = express.Router();

router.post("/createBlog", createBlog);
router.get("/getAllBlogs", getAllBlogs);
router.get("/getBlogById/:blogId", getBlogById);
router.put("/updateBlog/:blogId", updateBlog);
router.delete("/deleteBlog/:blogId", deleteBlog);
router.post("/addComment/:blogId", addComment);
router.post("/addLike/:blogId", addLike);
router.get("/getComments/:blogId", getComments);
router.get("/getLikes/:blogId", getLikes);

export default router;
