import React, { useEffect, useState } from 'react'
import Navbar from '../../navbar/Navbar'
import Backimg from '../../backimg/Backimg'
import Fotter from '../../footer/Fotter'
import Slider from '../../slider/Slider'
import axios from 'axios'
import BookPreviewList from '../../Book/Book'
import PromoBanner from '../../promotional/Promo'

function Home() {
     const[books,setBooks] = useState([]);
     const [readersBooks, setReadersBooks] = useState([]);
  
 useEffect(()=>{
  const fetch = async()=>{
   try {
     const res = await axios.get("http://localhost:8080/api/book")
     const resp = await axios.get("http://localhost:8080/api/readers")
      setReadersBooks(resp.data);
      
     setBooks(res.data)
      // console.log(res);
   } catch (error) {
    console.log(error);
    
   }
    
    
  }
  fetch()
 },[])
  return (
    <>
    <div className="relative w-full h-screen bg-cover bg-center bg-opacity-80" >
    {/* style={{ backgroundImage: "url('public/bookimg6.jpg')" }} */}
    <Navbar/>
    {/* <img  className ="h-65 w-full" src="public/bookimg4.jpg" alt="" /> */}
    {/* <Backimg/> */}
    <Slider/>
     
   </div>
   <div className="mt-6">
    <div className='mt-6 mb-8 ml-7 text-pretty '>
    <h2 className='text-4xl  text-center    '>POPULAR CATEGORIES IN BOOKS</h2>
    </div>
   <BookPreviewList  books={books}/>
   </div>
   <div className="">
    <PromoBanner/>
   </div>
   <div className='mt-6 mb-8 ml-7 text-pretty'>
    <h2 className='text-4xl text-center  '>Reader's Section</h2>
    </div>
    <BookPreviewList  books={readersBooks}/>
   
   

   
   <Fotter/>
   </>
  )
}

export default Home