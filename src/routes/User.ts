import express from "express";
import { register, login } from "../controllers/User";

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

export default router;
