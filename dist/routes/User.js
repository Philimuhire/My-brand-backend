"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const User_1 = require("../controllers/User");
const route = express_1.default.Router();
route.post("/register", User_1.register);
route.post("/login", User_1.login);
const UserRoute = module.exports = route;
exports.default = UserRoute;
