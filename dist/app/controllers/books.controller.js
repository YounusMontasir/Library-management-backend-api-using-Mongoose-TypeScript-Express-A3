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
exports.booksRoutes = void 0;
const express_1 = __importDefault(require("express"));
const books_model_1 = require("../models/books.model");
exports.booksRoutes = express_1.default.Router();
// post
exports.booksRoutes.post("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const body = req.body;
        const newBook = yield books_model_1.Book.create(body);
        res.status(201).json({
            success: true,
            message: "Book created successfully",
            newBook,
        });
    }
    catch (error) {
        res.status(400).json({
            message: "error occured",
            success: false,
            error,
        });
    }
}));
// get all books
exports.booksRoutes.get("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { filter, sortBy = "createdAt", sort = "desc" } = req.query;
        const query = {};
        if (filter) {
            query.genre = filter;
        }
        const books = yield books_model_1.Book.find(query)
            .sort({ [sortBy]: sort === "desc" ? -1 : 1 });
        res.status(201).json({
            success: true,
            message: "Books retrieved successfully",
            books,
        });
    }
    catch (error) {
        res.status(400).json({
            message: "error occured",
            success: false,
            error,
        });
    }
}));
// get single book
exports.booksRoutes.get("/:bookId", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const bookId = req.params.bookId;
        const book = yield books_model_1.Book.findById(bookId);
        res.status(201).json({
            success: true,
            message: "Books retrieved successfully",
            book,
        });
    }
    catch (error) {
        res.status(400).json({
            message: "error occured",
            success: false,
            error,
        });
    }
}));
exports.booksRoutes.patch("/:bookId", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const updatedBody = req.body;
        const bookId = req.params.bookId;
        const updatedBook = yield books_model_1.Book.findByIdAndUpdate(bookId, updatedBody, {
            new: true,
        });
        res.status(201).json({
            success: true,
            message: "Book updated successfully",
            updatedBook,
        });
    }
    catch (error) {
        res.status(400).json({
            message: "error occured",
            success: false,
            error,
        });
    }
}));
// delete
exports.booksRoutes.delete("/:bookId", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const bookId = req.params.bookId;
        const books = yield books_model_1.Book.findByIdAndDelete(bookId);
        res.status(201).json({
            success: true,
            message: "Book Deleted successfully",
            books,
        });
    }
    catch (error) {
        res.status(400).json({
            message: "error occured",
            success: false,
            error,
        });
    }
}));
