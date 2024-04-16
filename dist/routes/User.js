"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const User_1 = require("../controllers/User");
const router = express_1.default.Router();
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
router.post("/register", User_1.register);
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
router.post("/login", User_1.login);
exports.default = router;
