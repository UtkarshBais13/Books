import axios from "axios";
import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";

  
const BookPreview = ({ book }) => {
  const user = JSON.parse(localStorage.getItem("user"));
  
  const handleAddToCart = async (book) => {
  if (!user) {
    toast.error("Please login first!");
    return;
  }

  try {
    const payload = {
      userId: user.userId,
      bookId: book._id,
      title: book.title,
      author: book.author,
      photo:book.photo,
      price: book.price || 899, // fallback price
      quantity: 1,
    };
    // console.log(payload);
    
   
    

     const response = await axios.post("http://localhost:8080/api/cart", {
      userId: user.userId, // Make sure this is the correct field
      bookId: book._id,
      title: book.title,
      author:book.author,
      photo:book.photo,
      price: book.price
    }, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`
      }
    });

    
    toast.success("Book added to cart!");
  } catch (error) {
    toast.error("Failed to add to cart");
    console.error(error);
  }
};
    const [buttontext,SetButtontext] = useState("Add to Cart")
  

  return (
    
    <div className="bg-gray-100 shadow-lg w-[18rem] ml-5 mr-5 rounded-lg h-[32rem] overflow-hidden hover:shadow-xl transition-shadow duration-300">
      <img
        src={book.photo}
        alt={book.title}
        className="h-[23rem] object-cover rounded-lg ml-6 mt-3"
      />
      <div className="p-4">
        <h3 className="text-lg font-semibold text-gray-800 truncate">
          {book.title}
        </h3>
        <p className="text-sm text-gray-600">by {book.author}</p>
        <div className="mt-4 flex justify-between items-center">
          <span className="text-lg font-bold text-orange-600">
            ₹{book.price}
          </span>
          <button onClick={() => handleAddToCart(book)} className="px-4 py-2 bg-orange-500 text-white hover:bg-gray-600 transition rounded-lg">
            {buttontext}
          </button>
        </div>
      </div>
    </div>
  );
};


const BookSlider = ({ books }) => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const booksPerPage = 8; // 4 books per row × 2 rows
  const totalSlides = Math.ceil(books.length / booksPerPage);

  const handleNextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % totalSlides);
  };

  const handlePrevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + totalSlides) % totalSlides);
  };

  const startIndex = currentSlide * booksPerPage;
  const visibleBooks = books.slice(startIndex, startIndex + booksPerPage);

  return (
    <div className="relative w-full overflow-hidden">
      <div className="grid grid-cols-4 gap-6">
        {visibleBooks.map((book, index) => (
          <BookPreview key={index} book={book} />
        ))}
      </div>

      {/* Navigation Buttons */}
      <button
        onClick={handlePrevSlide}
        className="absolute top-1/2 left-4 transform -translate-y-1/2 bg-gray-800 text-white p-2 rounded-full hover:bg-gray-600 transition"
      >
        ❮
      </button>
      <button
        onClick={handleNextSlide}
        className="absolute top-1/2 right-4 transform -translate-y-1/2 bg-gray-800 text-white p-2 rounded-full hover:bg-gray-600 transition"
      >
        ❯
      </button>

      {/* Dots Navigation */}
      <div className="absolute bottom-4 w-full flex justify-center space-x-2">
        {Array.from({ length: totalSlides }).map((_, index) => (
          <button
            key={index}
            className={`h-3 w-3 rounded-full ${
              index === currentSlide ? "bg-gray-800" : "bg-gray-400"
            }`}
            onClick={() => setCurrentSlide(index)}
          />
        ))}
      </div>
    </div>
  );
};

export default BookSlider;
