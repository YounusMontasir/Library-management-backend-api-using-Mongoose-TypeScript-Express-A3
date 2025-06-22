import express, { Request, Response } from 'express'
import { Book } from '../models/books.model';
import { Borrow } from '../models/borrow.model';


export const borrowRoutes = express.Router()
// post
borrowRoutes.post("/", async(req: Request, res: Response)=>{
   try {
    const {book, quantity, dueDate} = req.body;
    const availableBook =await Book.findById(book)
    if(!availableBook){
         res.status(404).json({
        success: false,
        message: "Book is not Exist",
        })
    }
    else{
        if(availableBook?.copies >= quantity && availableBook?.available === true ){
            // new book borrowed
        const newBorrow =await Borrow.create({book, quantity, dueDate})
            // update the book copies
            availableBook?.borrowedBookUpdate?.(quantity)

        res.status(201).json({
        success: true,
        message: "Book borrowed successfully",
        newBorrow
    })
        } 
        else if(availableBook?.copies < quantity || availableBook?.available === false){
             res.status(404).json({
        success: false,
        message: "Book is not currently available",
        })
        }

    }
    
    
   } catch (error) {
     res.status(400).json({
            message: "error occured",
            success: false,
            error
        })
   }

})

// get all borrow
borrowRoutes.get("/", async (req: Request, res: Response)=>{
   try {
   
   const borrow = await Borrow.aggregate([
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
        book : {
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
    })
   } catch (error) {
     res.status(400).json({
            message: "error occured",
            success: false,
            error
        })
   }

})