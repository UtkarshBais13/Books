import React from 'react';
import useFeatchData from '../API/api';

function Box() {
  const { loading, error, data } = useFeatchData('/api/v1/public/books/');
  const booksArray = data.data?.data || [];

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div className="flex justify-center items-center  bg-gray-950">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 w-[90%] mt-20 ">
        {booksArray.map((book, index) => (
          <div key={index} className="bg-white  rounded-lg overflow-hidden shadow-xl hover:shadow-2xl">
            {/* New badge */}
            <div className="relative">
              <div className="absolute top-2 left-2 bg-orange-500 text-white text-xs font-bold px-2 py-1 rounded">
                New
              </div>
              <div className="absolute top-2 right-2 bg-orange-300 text-white text-xs font-bold px-2 py-1 rounded">
                22%
              </div>
            </div>

            {/* Book cover */}
            <div className="px-4 pt-8 pb-4">
              <img
                src={book.volumeInfo.imageLinks.smallThumbnail}
                alt="Book Cover"
                className="mx-auto w-48 h-auto shadow-md"
              />
            </div>

            {/* Book details */}
            <div className="px-4 pb-4">
              <h3 className="text-lg font-semibold text-gray-800">{book.volumeInfo.title}</h3>
              <p className="text-sm text-orange-500 mt-1">by {book.volumeInfo.authors[0]}</p>
              <div className="flex items-center mt-2">
        {book.saleInfo?.listPrice?.amount ? (
          <>
            <span className="line-through text-gray-400 text-sm mr-2">
              Rs. {book.saleInfo.listPrice.amount}
            </span>
            <span className="text-lg font-bold text-gray-800">
              Rs. {book.saleInfo.retailPrice?.amount || book.saleInfo.listPrice.amount}
            </span>
          </>
        ) : (
          <span className="text-lg font-bold text-gray-8000">Rs.899</span>
        )}
      </div>
              <p className="text-sm text-gray-500 mt-1">Paperback</p>

              {/* Add to cart & rating */}
              <div className="flex justify-between items-center mt-4">
                <button className="bg-orange-500 text-white px-4 py-2 rounded-lg font-semibold hover:bg-orange-600">
                  Add to cart
                </button>
                <div className="flex items-center text-orange-500">
                  <span>⭐</span><span>⭐</span><span>⭐</span><span>⭐</span><span className="text-gray-300">⭐</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Box;
