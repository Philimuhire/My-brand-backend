import express from "express";
import { saveContactQuery, getContactQueries } from "../controllers/ContactQuery";
import { getContactQueryCount, deleteContactQueryById } from "../controllers/ContactQuery";

const router = express.Router();

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
router.post("/saveContactQuery", saveContactQuery);

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
router.get("/getContactQueries", getContactQueries);

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
router.get("/queryCount", getContactQueryCount);

/**
 * Delete a contact query by ID.
 * @swagger
 * /contact/deleteContactQuery/{id}:
 *   delete:
 *     summary: Delete a contact query by ID.
 *     description: Delete a contact query with the provided ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID of the contact query to delete.
 *     responses:
 *       '200':
 *         description: Contact query deleted successfully.
 *       '404':
 *         description: Contact query not found.
 *       '500':
 *         description: Internal server error.
 */
router.delete("/deleteContactQuery/:id", deleteContactQueryById);

export default router;
