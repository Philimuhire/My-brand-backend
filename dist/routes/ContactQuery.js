"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const ContactQuery_1 = require("../controllers/ContactQuery");
const ContactQuery_2 = require("../controllers/ContactQuery");
const router = express_1.default.Router();
/**
 * @swagger
 * tags:
 *   name: Contact Queries
 *   description: Endpoints for managing contact queries
 */
/**
 * Save a new contact query.
 * @swagger
 * /contact/saveContactQuery:
 *   post:
 *     summary: Save a new contact query.
 *     description: Save a new contact query with the provided details.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               email:
 *                 type: string
 *               subject:
 *                 type: string
 *               message:
 *                 type: string
 *     responses:
 *       '201':
 *         description: Contact query saved successfully.
 *       '400':
 *         description: Invalid request body.
 *       '500':
 *         description: Internal server error.
 */
router.post("/saveContactQuery", ContactQuery_1.saveContactQuery);
/**
 * Get all contact queries.
 * @swagger
 * /contact/getContactQueries:
 *   get:
 *     summary: Get all contact queries.
 *     description: Retrieve all contact queries stored in the database.
 *     responses:
 *       '200':
 *         description: List of contact queries.
 *       '500':
 *         description: Internal server error.
 */
router.get("/getContactQueries", ContactQuery_1.getContactQueries);
/**
 * Get the count of contact queries.
 * @swagger
 * /contact/queryCount:
 *   get:
 *     summary: Get the count of contact queries.
 *     description: Retrieve the total count of contact queries stored in the database.
 *     responses:
 *       '200':
 *         description: Total count of contact queries.
 *       '500':
 *         description: Internal server error.
 */
router.get("/queryCount", ContactQuery_2.getContactQueryCount);
exports.default = router;
