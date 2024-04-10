import express from "express";
import { saveContactQuery, getContactQueries } from "../controllers/ContactQuery";

const router = express.Router();

router.post("/saveContactQuery", saveContactQuery);
router.get("/getContactQueries", getContactQueries);

export default router;
