import React, { useState } from 'react'
import { Link } from 'react-router-dom'

function Backimg({bookName, title, readLink, buyLink}) {
  

    const handleClick = () => {
        window.open({readLink}, '_blank'); // Replace with your URL https://www.amazon.in/Game-Thrones-Song-Ice-Fire/dp/0007428545?asin=0007428545&revisionId=&format=4&depth=1
      };
      const handleClicking = () => {
        window.open({buyLink}, '_blank'); // Replace with your URL https://www.amazon.in/Game-Thrones-Song-Ice-Fire/dp/0007428545
      };
  return (
    <>
    <div className="  flex flex-col h-screen bg-cover bg-center justify-center  ">
    <h1 className="text-white text-8xl ml-3 ">{bookName}</h1><br />
    <h3 className="text-white text-4xl ml-3">{title}
    </h3> 
    {/* Novel by George R. R. Martin */}
    <div>
    <button onClick={handleClick} className="px-4 py-2 mt-8 ml-5 w-1/6  bg-orange-400 text-white text-xl rounded-md ">
      READ
    </button>
    <button onClick={handleClicking} className="px-4 py-2 mt-8 ml-5 w-1/6  bg-orange-500 text-white text-xl rounded-md ">
      BUY
    </button>
    </div>
   
    </div>
    
    </>
  )
}

export default Backimg