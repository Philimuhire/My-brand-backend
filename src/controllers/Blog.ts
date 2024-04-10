import { Request, Response } from "express";
import BlogModel from "../models/BlogModel";
import CommentModel from "../models/CommentModel";
import LikeModel from "../models/LikeModel";

export const createBlog = async (req: Request, res: Response) => {
  try {
    const { title, image, content } = req.body;
    const newBlog = await BlogModel.create({
      title,
      image,
      content,
    });
    res.status(201).json({ message: "Blog created successfully", blog: newBlog });
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
};

export const getAllBlogs = async (req: Request, res: Response) => {
  try {
    const blogs = await BlogModel.find();
    res.json(blogs);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export const getBlogById = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const blog = await BlogModel.findById(id);
    if (!blog) {
      res.status(404).json({ message: "Blog not found" });
      return;
    }
    res.json(blog);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export const updateBlog = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { title, image, content } = req.body;
  try {
    const updatedBlog = await BlogModel.findByIdAndUpdate(id, { title, image, content }, { new: true });
    if (!updatedBlog) {
      res.status(404).json({ message: "Blog not found" });
      return;
    }
    res.json({ message: "Blog updated successfully", blog: updatedBlog });
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
};

export const deleteBlog = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const deletedBlog = await BlogModel.findByIdAndDelete(id);
    if (!deletedBlog) {
      res.status(404).json({ message: "Blog not found" });
      return;
    }
    res.json({ message: "Blog deleted successfully" });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export const addComment = async (req: Request, res: Response) => {
  const { blogId } = req.params;
  const { content } = req.body;

  try {
    const blog = await BlogModel.findById(blogId);
    if (!blog) {
      return res.status(404).json({ message: "Blog post not found" });
    }

    const comment = new CommentModel({ content, blog: blogId });
    await comment.save();
    blog.comments.push(comment);
    await blog.save();

    res.status(201).json(comment);
  } catch (error) {
    console.error("Error adding comment:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const addLike = async (req: Request, res: Response) => {
  const { blogId } = req.params;

  try {
    const blog = await BlogModel.findById(blogId);
    if (!blog) {
      return res.status(404).json({ message: "Blog post not found" });
    }

    blog.likes++;
    await blog.save();

    const like = new LikeModel({ blog: blogId });
    await like.save();

    res.status(201).json({ likes: blog.likes });
  } catch (error) {
    console.error("Error adding like:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const getComments = async (req: Request, res: Response) => {
  const { blogId } = req.params;

  try {
    const comments = await CommentModel.find({ blog: blogId });
    res.status(200).json(comments);
  } catch (error) {
    console.error("Error fetching comments:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const getLikes = async (req: Request, res: Response) => {
  const { blogId } = req.params;

  try {
    const likeCount = await LikeModel.countDocuments({ blog: blogId });
    res.status(200).json({ likes: likeCount });
  } catch (error) {
    console.error("Error fetching likes:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
