"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const ContactQuery_1 = require("../controllers/ContactQuery");
const router = express_1.default.Router();
router.post("/saveContactQuery", ContactQuery_1.saveContactQuery);
router.get("/getContactQueries", ContactQuery_1.getContactQueries);
exports.default = router;
