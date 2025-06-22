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
exports.borrowRoutes = void 0;
const express_1 = __importDefault(require("express"));
const books_model_1 = require("../models/books.model");
const borrow_model_1 = require("../models/borrow.model");
exports.borrowRoutes = express_1.default.Router();
// post
exports.borrowRoutes.post("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const { book, quantity, dueDate } = req.body;
        const availableBook = yield books_model_1.Book.findById(book);
        if (!availableBook) {
            res.status(404).json({
                success: false,
                message: "Book is not Exist",
            });
        }
        else {
            if ((availableBook === null || availableBook === void 0 ? void 0 : availableBook.copies) >= quantity && (availableBook === null || availableBook === void 0 ? void 0 : availableBook.available) === true) {
                // new book borrowed
                const newBorrow = yield borrow_model_1.Borrow.create({ book, quantity, dueDate });
                // update the book copies
                (_a = availableBook === null || availableBook === void 0 ? void 0 : availableBook.borrowedBookUpdate) === null || _a === void 0 ? void 0 : _a.call(availableBook, quantity);
                res.status(201).json({
                    success: true,
                    message: "Book borrowed successfully",
                    newBorrow
                });
            }
            else if ((availableBook === null || availableBook === void 0 ? void 0 : availableBook.copies) < quantity || (availableBook === null || availableBook === void 0 ? void 0 : availableBook.available) === false) {
                res.status(404).json({
                    success: false,
                    message: "Book is not currently available",
                });
            }
        }
    }
    catch (error) {
        res.status(400).json({
            message: "error occured",
            success: false,
            error
        });
    }
}));
// get all borrow
exports.borrowRoutes.get("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const borrow = yield borrow_model_1.Borrow.aggregate([
            {
                $group: {
                    _id: "$book",
                    totalQuantity: { $sum: "$quantity" },
                },
            },
            {
                $lookup: {
                    from: "books",
                    localField: "_id",
                    foreignField: "_id",
                    as: "book",
                },
            },
            { $unwind: "$book" },
            {
                $project: {
                    _id: 0,
                    book: {
                        title: "$book.title",
                        isbn: "$book.isbn",
                    },
                    totalQuantity: 1,
                },
            },
        ]);
        // const borrows =await Borrow.find().populate("book")
        res.status(201).json({
            success: true,
            message: "Book borrowed successfully",
            borrow
        });
    }
    catch (error) {
        res.status(400).json({
            message: "error occured",
            success: false,
            error
        });
    }
}));
