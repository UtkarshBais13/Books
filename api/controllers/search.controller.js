const { default: mongoose } = require("mongoose");
const Book = require("../models/book_model");

const search = async (req, res) => {
    try {
        const { title } = req.query;
        const books = await Book.find({
          title: { $regex: title, $options: 'i' }
        }).limit(10); // Limit to 10 results
        
        res.json(books);
      } catch (error) {
        res.status(500).json({ message: error.message });
      }
};
 
 
module.exports = {search};