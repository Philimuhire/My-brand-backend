import { Request, Response } from "express";
import BlogModel from "../models/BlogModel";
import CommentModel from "../models/CommentModel";
import LikeModel from "../models/LikeModel";
import multer from "multer";
import uploader from "../cloudinary/cloudinary";


/*const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/"); // Specify the directory where uploaded files should be stored
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname); // Keep the original file name
  }
});

const upload = multer({ storage: storage });*/

export const createBlog = async (req: Request, res: Response) => {
  try {
    const { title, content } = req.body;
    /*let image;
    if (req.file) {
    } else {
      throw new Error("No image uploaded");
    }*/
    const result = await uploader(req.file, res);
    const newBlog = await BlogModel.create({
      title,
      image : result.secure_url,
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
  const { blogId } = req.params;

  try {
    const blog = await BlogModel.findById(blogId);
    if (!blog) {
      return res.status(404).json({ message: "Blog not found" });
    }
    res.json(blog);
  } catch (error) {
    console.error("Error retrieving blog:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const updateBlog = async (req: Request, res: Response) => {
  const { blogId } = req.params;
  const { title, content } = req.body;

  try {
    const result = await uploader(req.file, res);
    let image;
    if (req.file) {
      image = req.file.path; 
    } else {
      const blog = await BlogModel.findById(blogId);
      if (!blog) {
        return res.status(404).json({ message: "Blog not found" });
      }
      image = blog.image;
    }

    const updatedBlog = await BlogModel.findByIdAndUpdate(
      blogId,
      { title, image : result.secure_url, content },
      { new: true }
    );
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
  const { blogId } = req.params;
  try {
    const deletedBlog = await BlogModel.findByIdAndDelete(blogId);
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
  try {
    const { blogId } = req.params;
    const { comment } = req.body;

    console.log("Received comment data:", comment);
    if (!comment) {
      return res.status(400).json({ message: "Comment is required for adding a comment" });
    }

    const blog = await BlogModel.findById(blogId);
    if (!blog) {
      return res.status(404).json({ message: "Blog post not found" });
    }

    console.log("Found blog:", blog);

    const newComment = new CommentModel({ content: comment, blog: blogId });
    await newComment.save();
    blog.comments.push(newComment);
    await blog.save();

    console.log("Comment added:", newComment);

    res.status(201).json(newComment);
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
