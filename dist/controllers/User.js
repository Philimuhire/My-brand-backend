"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAllUsers = exports.deleteUserByEmail = exports.login = exports.register = void 0;
const UserModel_1 = __importDefault(require("../models/UserModel"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const register = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { username, email, password } = req.body;
        const hashedPassword = bcrypt_1.default.hashSync(password, 10);
        const InsertData = yield UserModel_1.default.create({
            username: username,
            email: email,
            password: hashedPassword,
        });
        if (InsertData) {
            const token = jsonwebtoken_1.default.sign({ data: InsertData }, "oursecretekey123", {
                expiresIn: "1d",
            });
            res.json({ message: "register successfully", token: token });
        }
    }
    catch (error) {
        res.json({ message: error.message });
    }
});
exports.register = register;
const login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, password } = req.body;
        const existUser = yield UserModel_1.default.findOne({ email: email });
        if (existUser) {
            const comparedPassword = bcrypt_1.default.compareSync(password, existUser.password);
            if (comparedPassword) {
                const token = jsonwebtoken_1.default.sign({ data: existUser }, "oursecretekey123", {
                    expiresIn: "1d",
                });
                res.json({ message: "login suceessfully", token: token });
            }
            else {
                res.json({ message: "Invalid email or password" });
            }
        }
        else {
            res.json({ message: "Invalid email or password" });
        }
    }
    catch (error) {
        res.json({ message: error.message });
    }
});
exports.login = login;
const deleteUserByEmail = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email } = req.params;
        const deletedUser = yield UserModel_1.default.findOneAndDelete({ email });
        if (deletedUser) {
            res.json({ message: "User deleted successfully" });
        }
        else {
            res.status(404).json({ message: "User not found" });
        }
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
});
exports.deleteUserByEmail = deleteUserByEmail;
const getAllUsers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const users = yield UserModel_1.default.find();
        res.json(users);
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
});
exports.getAllUsers = getAllUsers;
