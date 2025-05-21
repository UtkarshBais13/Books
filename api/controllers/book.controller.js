const Book = require("../models/book_model");
const { login } = require("./auth.controller");

// create a new book
const createbook = async(req,res)=>{
    const newPost = new Book(req.body);
    try {
        const savedPost =  await newPost.save();
        res.status(200).json(savedPost)
    } catch (error) {
        res.status(500).json(error) 
    }
  
}
//update a book
const updatebook = async(req,res)=>{
    try {
        const book = await Book.findById(req.params.id);
        if(book.username===req.body.username){
          try {
              const updatedBook = await Book.findByIdAndUpdate(
                  req.params.id,
                  {
                      $set:req.body,
                  },{
                      new:true // this return the updated book
                  }
              );
              res.status(200).json(updatedBook)
          } catch (error) {
            res.status(401).json(Error)
          }
        }
        
    } catch (error) {
        console.log(error);
        
    }
}
//delete post 
 const deletebook = async(req,res)=>{

    try {
        const book = await Book.findById(req.params.id);
        if(book.username===req.body.username){
            try {
                await book.deleteOne();
                res.status(200).json("post has been deleted")
            } catch (error) {
                
                res.status(500).json(error)

                
            }
        }else{
            res.status(401).json("delete your known book")
        }
    } catch (error) {
        console.log(error);
        
    }
 }
 //get book
  const getbook = async(req,res)=>{

    try {
        const book = await Book.findById(req.params.id);
        res.status(200).json(book);
        
    } catch (error) {
        res.status(500).json(error)
    }
  }
  const getbooks = async (req, res) => {
    try {
      const books = await Book.find({category:"popularbooks"}); // Retrieves all books
      res.status(200).json(books); // Respond with the list of books
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch books", error }); // Improved error response
    }
  };
  const getBooksByCategory = async (req, res) => {
    try {
      const books = await Book.find({category:"slider"});
     
  
      if (books.length === 0) {
        return res.status(404).json({ message: 'No books found for category: slider' });
      }
  
      res.status(200).json(books);
    } catch (error) {
      console.error('Error fetching books:', error);
      res.status(500).json({ message: 'Internal Server Errorrrr' });
    }
  };
  const createsliderimages = async(req,res)=>{
    const SliderBook = new Book(req.body);
    try {
        const saveSliderBook = await SliderBook.save();
        res.status(200).json(saveSliderBook)
    } catch (error) {
        console.log(error);
        
    }
  }
  const updatesliderbook = async(req,res)=>{
    
        
       
    try {
        // Find the book by ID
        const book = await Book.findById(req.params.id);
    
        // Check if the book exists
        if (!book) {
          return res.status(404).json({ message: "Book not found" });
        }
    
        // Check if the book's category is "slider"
        if (book.category !== "slider") {
          return res.status(400).json({
            message: "The book does not belong to the 'slider' category",
          });
        }
    
        // Update the book
        const updatedBook = await Book.findByIdAndUpdate(
          req.params.id,
          { $set: req.body }, // Fields to update
          { new: true } // Return the updated book
        );
    
        // Respond with the updated book
        res.status(200).json(updatedBook);
      } catch (error) {
        // Log the error and respond with a 500 status code
        console.error("Error updating book:", error);
        res.status(500).json({ message: "Server error. Please try again later." });
      }
     
        
    
}
const getsliderbook = async(req,res)=>{

    try {
        const book = await Book.findById(req.params.id);
        res.status(200).json(book);
        
    } catch (error) {
        res.status(500).json(error)
    }
  }
  const getBookforReaders = async (req, res) => {
    try {
      const books = await Book.find({category:"readers"});
     
  
      if (books.length === 0) {
        return res.status(404).json({ message: 'No books found for category: reader' });
      }
  
      res.status(200).json(books);
    } catch (error) {
      console.error('Error fetching books:', error);
      res.status(500).json({ message: 'Internal Server Errorrrr' });
    }
  };
  module.exports = {createbook,updatebook,deletebook,getbook,getbooks,getBooksByCategory,createsliderimages,updatesliderbook,getsliderbook,getBookforReaders};