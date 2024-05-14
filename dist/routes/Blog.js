"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const Blog_1 = require("../controllers/Blog");
const router = express_1.default.Router();
/*const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, "uploads/");
    },
    filename: function (req, file, cb) {
      cb(null, file.originalname);
    }
  });


const upload = multer({ storage: storage });*/
/**
 * @swagger
 * tags:
 *   name: Blogs
 *   description: Endpoints for managing blogs
 */
/**
 * Create a new blog.
 * @swagger
 * /blog/createBlog:
 *   post:
 *     summary: Create a new blog.
 *     description: Create a new blog with the provided details.
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               image:
 *                 type: string
 *                 format: binary
 *               content:
 *                 type: string
 *     responses:
 *       '201':
 *         description: Blog created successfully.
 *       '400':
 *         description: Invalid request body.
 *       '500':
 *         description: Internal server error.
 */
router.post("/createBlog", Blog_1.createBlog);
/**
 * Get all blogs.
 * @swagger
 * /blog/getAllBlogs:
 *   get:
 *     summary: Get all blogs.
 *     description: Retrieve all blogs stored in the database.
 *     responses:
 *       '200':
 *         description: List of blogs.
 *       '500':
 *         description: Internal server error.
 */
router.get("/getAllBlogs", Blog_1.getAllBlogs);
/**
 * Get a blog by its ID.
 * @swagger
 * /blog/getBlogById/{blogId}:
 *   get:
 *     summary: Get a blog by its ID.
 *     description: Retrieve a blog by its unique identifier.
 *     parameters:
 *       - in: path
 *         name: blogId
 *         required: true
 *         description: ID of the blog to retrieve
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: Blog found.
 *       '404':
 *         description: Blog not found.
 *       '500':
 *         description: Internal server error.
 */
router.get("/getBlogById/:blogId", Blog_1.getBlogById);
/**
 * Update a blog.
 * @swagger
 * /blog/updateBlog/{blogId}:
 *   put:
 *     summary: Update a blog.
 *     description: Update an existing blog with the provided details.
 *     parameters:
 *       - in: path
 *         name: blogId
 *         required: true
 *         description: ID of the blog to update
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               image:
 *                 type: string
 *                 format: binary  # Specify that image is a binary file
 *               content:
 *                 type: string
 *     responses:
 *       '200':
 *         description: Blog updated successfully.
 *       '400':
 *         description: Invalid request body.
 *       '404':
 *         description: Blog not found.
 *       '500':
 *         description: Internal server error.
 */
router.put("/updateBlog/:blogId", Blog_1.updateBlog);
/**
 * Delete a blog.
 * @swagger
 * /blog/deleteBlog/{blogId}:
 *   delete:
 *     summary: Delete a blog.
 *     description: Delete a blog by its unique identifier.
 *     parameters:
 *       - in: path
 *         name: blogId
 *         required: true
 *         description: ID of the blog to delete
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: Blog deleted successfully.
 *       '404':
 *         description: Blog not found.
 *       '500':
 *         description: Internal server error.
 */
router.delete("/deleteBlog/:blogId", Blog_1.deleteBlog);
/**
 * Add a comment to a blog.
 * @swagger
 * /blog/addComment/{blogId}:
 *   post:
 *     summary: Add a comment to a blog.
 *     description: Add a comment to an existing blog.
 *     parameters:
 *       - in: path
 *         name: blogId
 *         required: true
 *         description: ID of the blog to add a comment to
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               comment:
 *                 type: string
 *     responses:
 *       '201':
 *         description: Comment added successfully.
 *       '400':
 *         description: Invalid request body.
 *       '404':
 *         description: Blog not found.
 *       '500':
 *         description: Internal server error.
 */
router.post("/addComment/:blogId", Blog_1.addComment);
/**
 * Add a like to a blog.
 * @swagger
 * /blog/addLike/{blogId}:
 *   post:
 *     summary: Add a like to a blog.
 *     description: Add a like to an existing blog.
 *     parameters:
 *       - in: path
 *         name: blogId
 *         required: true
 *         description: ID of the blog to add a like to
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: Like added successfully.
 *       '404':
 *         description: Blog not found.
 *       '500':
 *         description: Internal server error.
 */
router.post("/addLike/:blogId", Blog_1.addLike);
/**
 * Get all comments of a blog.
 * @swagger
 * /blog/getComments/{blogId}:
 *   get:
 *     summary: Get all comments of a blog.
 *     description: Retrieve all comments of a blog by its unique identifier.
 *     parameters:
 *       - in: path
 *         name: blogId
 *         required: true
 *         description: ID of the blog to retrieve comments from
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: List of comments.
 *       '404':
 *         description: Blog not found.
 *       '500':
 *         description: Internal server error.
 */
router.get("/getComments/:blogId", Blog_1.getComments);
/**
 * Get all likes of a blog.
 * @swagger
 * /blog/getLikes/{blogId}:
 *   get:
 *     summary: Get all likes of a blog.
 *     description: Retrieve all likes of a blog by its unique identifier.
 *     parameters:
 *       - in: path
 *         name: blogId
 *         required: true
 *         description: ID of the blog to retrieve likes from
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: List of likes.
 *       '404':
 *         description: Blog not found.
 *       '500':
 *         description: Internal server error.
 */
router.get("/getLikes/:blogId", Blog_1.getLikes);
/**
 * Get the count of all blogs.
 * @swagger
 * /blog/blogsCount:
 *   get:
 *     summary: Get the count of all blogs.
 *     description: Retrieve the count of all blogs stored in the database.
 *     responses:
 *       '200':
 *         description: Count of blogs.
 *       '500':
 *         description: Internal server error.
 */
router.get("/blogsCount", Blog_1.blogsCount);
exports.default = router;
