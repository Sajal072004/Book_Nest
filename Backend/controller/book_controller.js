import Book from "../model/book.model.js";

export const getBook=async (req,res)=>{
    try {
        const book=await Book.find();
        return res.status(200).json(book);
    } catch (error) {
        console.log("Error in controller : ",error);
        return res.status(500).json(error);
    }
}