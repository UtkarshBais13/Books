import React from "react";

const PromoBanner = () => {
  return (
    <div className="flex items-center justify-between bg-black text-white p-6 rounded-lg shadow-lg h-[28rem] mt-4 mb-4">
      {/* Left Section with Barcode and Image */}
      <div className="flex items-center space-x-6">
        {/* Barcode */}
        <div className="h-full w-8 bg-gradient-to-b from-gray-400 to-gray-600 rounded-sm"></div>
        
        {/* Stack of Books Image */}
        <img
          src="https://cdn-icons-png.flaticon.com/512/2830/2830309.png"
          alt="Stack of Books"
          className="h-50 w-60 object-cover"
        />
      </div>

      {/* Right Section with Promo Details */}
      <div className="flex-1 ml-6">
        <p className="text-orange-400 font-bold text-xl">TICKET #: FIRST ORDER</p>
        <h2 className="text-6xl font-bold mt-2">
          GET FLAT <span className="text-yellow-400">10% OFF</span> ON YOUR{" "}
          <span className="text-yellow-400">FIRST ORDER</span>
        </h2>
        <p className="mt-4 text-lg">
          USE CODE: <span className="font-serif text-4xl text-orange-500">BBFIRST</span>
        </p>
        <p className="text-lg text-gray-400 mt-2">
          *VALID FOR ONE-TIME USE, <br /> *NO MINIMUM CART VALUE
        </p>
        <button className="mt-6 px-6 py-3 bg-orange-500 text-black font-bold rounded-full hover:bg-orange-600 transition">
          SHOP NOW
        </button>
      </div>
    </div>
  );
};

export default PromoBanner;
