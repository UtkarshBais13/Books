import React, { useState, useEffect } from "react";
import Backimg from "../backimg/Backimg";
import axios from "axios";

const Slider = () => {
  const[books,setBooks] = useState([]);
  
  
useEffect(()=>{
 const fetch = async()=>{
  try {
    const res = await axios.get("http://localhost:8080/api/slider")
    setBooks(res.data)
    //  console.log(res);
  } catch (error) {
   console.log(error);
   
  }
   
   
 }
 fetch()
},[])
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % books.length);
    }, 4000); // Change slide every 5 seconds
    return () => clearInterval(interval);
  }, [books.length]);

  const goToSlide = (index) => {
    setCurrentSlide(index);
  };

  return (
    <div className="relative  overflow-hidden h-[100vh]">
      <div className="absolute inset-0 bg-gradient-to-b from-black via-transparent to-black"></div>
      <div
        className="absolute inset-0 transition-transform duration-700 ease-in-out"
        style={{
          transform: `translateX(-${currentSlide * 100}%)`,
          display: "flex",
        }}
      >
        {books.map((book, index) => (
          <div
            key={index}
            className="flex-shrink-0 h-full w-full"
            style={{ backgroundImage: `url(${book.photo})`, backgroundSize: "cover", backgroundPosition: "center" }}
          >
            <Backimg
            bookName={book.title}
            title = {book.author}
            image= {book.photo}
            readLink= {book.readLink}
            buyLink={book.buyLink}
            />
          </div>
        ))}
      </div>

      {/* Navigation Buttons */}
      <div className="absolute inset-0 flex justify-between items-center px-4">
        <button
          onClick={() => setCurrentSlide((prev) => (prev - 1 + books.length) % books.length)}
          className="bg-black bg-opacity-50 text-white p-2 rounded-full"
        >
          ❮
        </button>
        <button
          onClick={() => setCurrentSlide((prev) => (prev + 1) % books.length)}
          className="bg-black bg-opacity-50 text-white p-2 rounded-full"
        >
          ❯
        </button>
      </div>

      {/* Dots */}
      <div className="absolute bottom-4 w-full flex justify-center space-x-2">
        {books.map((_, index) => (
          <button
            key={index}
            className={`h-3 w-3 rounded-full ${index === currentSlide ? "bg-white" : "bg-gray-500"}`}
            onClick={() => goToSlide(index)}
          />
        ))}
      </div>
    </div>
  );
};

export default Slider;
