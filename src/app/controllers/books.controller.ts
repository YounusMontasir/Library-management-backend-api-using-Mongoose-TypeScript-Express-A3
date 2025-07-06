import express, { Request, Response } from "express";
import { Book } from "../models/books.model";


export const booksRoutes = express.Router();
// post
booksRoutes.post("/", async (req: Request, res: Response) => {
  try {
    const body = req.body;
    const newBook = await Book.create(body);
    res.status(201).json({
      success: true,
      message: "Book created successfully",
      newBook,
    });
  } catch (error) {
    res.status(400).json({
      message: "error occured",
      success: false,
      error,
    });
  }
});
// get all books
booksRoutes.get("/", async (req: Request, res: Response) => {
  try {
    const { filter, sortBy = "createdAt", sort = "desc" } = req.query;

    const query: any = {};
    if (filter) {
      query.genre = filter;
    }

    const books = await Book.find(query)
      .sort({ [sortBy as string]: sort === "desc" ? -1 : 1 })
      

    res.status(201).json({
      success: true,
      message: "Books retrieved successfully",
      books,
    });
  } catch (error) {
    res.status(400).json({
      message: "error occured",
      success: false,
      error,
    });
  }
});

// get single book
booksRoutes.get("/:bookId", async (req: Request, res: Response) => {
  try {
    const bookId = req.params.bookId;
    const book = await Book.findById(bookId);
    res.status(201).json({
      success: true,
      message: "Books retrieved successfully",
      book,
    });
  } catch (error) {
    res.status(400).json({
      message: "error occured",
      success: false,
      error,
    });
  }
});

booksRoutes.patch("/:bookId", async (req: Request, res: Response) => {
  try {
    const updatedBody = req.body;
    const bookId = req.params.bookId;
    const updatedBook = await Book.findByIdAndUpdate(bookId, updatedBody, {
      new: true,
    });
    res.status(201).json({
      success: true,
      message: "Book updated successfully",
      updatedBook,
    });
  } catch (error) {
    res.status(400).json({
      message: "error occured",
      success: false,
      error,
    });
  }
});

// delete
booksRoutes.delete("/:bookId", async (req: Request, res: Response) => {
  try {
    const bookId = req.params.bookId;
    const books = await Book.findByIdAndDelete(bookId);
    res.status(201).json({
      success: true,
      message: "Book Deleted successfully",
      books,
    });
  } catch (error) {
    res.status(400).json({
      message: "error occured",
      success: false,
      error,
    });
  }
});
