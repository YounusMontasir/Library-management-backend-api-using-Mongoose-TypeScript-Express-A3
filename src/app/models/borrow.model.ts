import mongoose, { model, Schema, Types } from "mongoose";
import { IBorrow } from "../interfaces/borrow.interface";


const borrowSchema = new Schema<IBorrow>({
    book: {
        type: Schema.Types.ObjectId,
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
},{
    versionKey: false,
    timestamps: true
})

export const Borrow = model("Borrow", borrowSchema)