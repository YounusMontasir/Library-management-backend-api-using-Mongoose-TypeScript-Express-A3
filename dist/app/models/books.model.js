"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Book = void 0;
const mongoose_1 = require("mongoose");
const bookSchema = new mongoose_1.Schema({
    title: {
        type: String,
        required: [true, "Title is not given."]
    },
    author: {
        type: String,
        required: [true, "Author is not given."]
    },
    genre: {
        type: String,
        enum: {
            values: ['FICTION', 'NON_FICTION', 'SCIENCE', 'HISTORY', 'BIOGRAPHY', 'FANTASY'],
            message: "Genre Must be FICTION, NON_FICTION, SCIENCE, HISTORY, BIOGRAPHY, FANTASY"
        },
        required: [true, "Genre is not given."]
    },
    isbn: {
        type: String,
        required: [true, "ISBN is not given."],
        unique: true
    },
    description: { type: String },
    copies: {
        type: Number,
        min: [0, "Must be a positive number. Got {VALUE}"],
        required: [true, "Copies is not given. Copies is required"]
    },
    available: { type: Boolean, default: true }
}, {
    versionKey: false,
    timestamps: true
});
bookSchema.method('borrowedBookUpdate', function borrowedBookUpdate(quantity) {
    this.copies -= quantity;
    this.available = this.copies > 0;
    return this.save();
});
exports.Book = (0, mongoose_1.model)("Book", bookSchema);
