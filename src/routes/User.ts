import express from "express";
import { register, login, deleteUserByEmail, getAllUsers } from "../controllers/User";

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Authentication
 *   description: User authentication endpoints
 */

/**
 * Register a new user.
 * @swagger
 * /auth/register:
 *   post:
 *     summary: Register a new user.
 *     description: Register a new user with the provided credentials.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       '201':
 *         description: User registered successfully.
 *       '400':
 *         description: Invalid request body.
 *       '500':
 *         description: Internal server error.
 */
router.post("/register", register);

/**
 * User login.
 * @swagger
 * /auth/login:
 *   post:
 *     summary: User login.
 *     description: Log in with the provided credentials.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       '200':
 *         description: User logged in successfully.
 *       '400':
 *         description: Invalid request body.
 *       '401':
 *         description: Unauthorized - Invalid credentials.
 *       '500':
 *         description: Internal server error.
 */
router.post("/login", login);

/**
 * Delete a user by email.
 * @swagger
 * /auth/delete/{email}:
 *   delete:
 *     summary: Delete a user by email.
 *     description: Delete a user with the provided email.
 *     parameters:
 *       - in: path
 *         name: email
 *         schema:
 *           type: string
 *         required: true
 *         description: Email of the user to delete.
 *     responses:
 *       '200':
 *         description: User deleted successfully.
 *       '404':
 *         description: User not found.
 *       '500':
 *         description: Internal server error.
 */
router.delete("/delete/:email", deleteUserByEmail);

/**
 * Get all users.
 * @swagger
 * /auth/allusers:
 *   get:
 *     summary: Get all users.
 *     description: Retrieve all users from the database.
 *     responses:
 *       '200':
 *         description: Successfully retrieved all users.
 *       '500':
 *         description: Internal server error.
 */
router.get("/allusers", getAllUsers);

export default router;
