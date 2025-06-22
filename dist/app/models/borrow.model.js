"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Borrow = void 0;
const mongoose_1 = require("mongoose");
const borrowSchema = new mongoose_1.Schema({
    book: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "Book",
        required: [true, "book must be given"]
    },
    quantity: {
        type: Number,
        required: [true, "Quantity must be given"],
        min: [1, "Must be a positive number"]
    },
    dueDate: {
        type: Date,
        required: [true, "Duedate must be given"]
    }
}, {
    versionKey: false,
    timestamps: true
});
exports.Borrow = (0, mongoose_1.model)("Borrow", borrowSchema);
