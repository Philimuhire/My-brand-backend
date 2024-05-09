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
exports.deleteContactQueryById = exports.getContactQueryCount = exports.getContactQueries = exports.saveContactQuery = void 0;
const ContactQueryModel_1 = __importDefault(require("../models/ContactQueryModel"));
const saveContactQuery = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name, email, subject, message } = req.body;
        const newQuery = yield ContactQueryModel_1.default.create({ name, email, subject, message });
        res.status(201).json({ message: "Contact query saved successfully", query: newQuery });
    }
    catch (error) {
        res.status(400).json({ message: error.message });
    }
});
exports.saveContactQuery = saveContactQuery;
const getContactQueries = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const queries = yield ContactQueryModel_1.default.find();
        res.json(queries);
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
});
exports.getContactQueries = getContactQueries;
const getContactQueryCount = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const queryCount = yield ContactQueryModel_1.default.countDocuments();
        res.json({ queryCount });
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
});
exports.getContactQueryCount = getContactQueryCount;
const deleteContactQueryById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const deletedQuery = yield ContactQueryModel_1.default.findByIdAndDelete(id);
        if (deletedQuery) {
            res.json({ message: "Contact query deleted successfully" });
        }
        else {
            res.status(404).json({ message: "Contact query not found" });
        }
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
});
exports.deleteContactQueryById = deleteContactQueryById;
