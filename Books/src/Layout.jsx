import React, { useEffect,useState } from 'react'

import { Outlet } from 'react-router-dom'
import Navbar from './components/navbar/Navbar'
import Backimg from './components/backimg/Backimg'
import Fotter from './components/footer/Fotter'
import {ToastContainer} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import BookPreviewList from './components/Book/Book'
import axios from 'axios'
function Layout() {
  // const[books,setBooks] = useState([]);
  
  
//  useEffect(()=>{
//   const fetch = async()=>{
//    try {
//      const res = await axios.get("http://localhost:8080/api/book")
//      setBooks(res.data)
//       console.log(res);
//    } catch (error) {
//     console.log(error);
    
//    }
    
    
//   }
//   fetch()
//  },[])

  return (
    <>
    <ToastContainer
    position="top-center" // Center the toast horizontally and vertically
    autoClose={3000} 
    pauseOnHover
    
    />
    
     <Outlet/>
     {/* <BookPreviewList books={books}/> */}
     
    



    </>
  )
}

export default Layout