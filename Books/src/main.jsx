import { StrictMode, useEffect, useState } from 'react'
import { createRoot } from 'react-dom/client'

import './index.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Signup from './components/pages/signup/Signup.jsx'
import Layout from './Layout.jsx'
import Home from './components/pages/home/Home.jsx'
import Login from './components/pages/login/Login.jsx'
import store from './components/store/store.js'
import {Provider} from 'react-redux'
import CartPage from './components/pages/cartpage/Cartapage.jsx'
import Cart from './components/cart/Cart.jsx'

const router = createBrowserRouter([
    
   
  {
    path: "/",
    element: <Layout/>,
    children: [
        {
            path: "",
            element:<Home/>
            
        },
      
        {
            path: "/login",
            // element: (
            //     <AuthLayout authentication={false}>
            //         <Login />
            //     </AuthLayout>
            // ),
            element:<Login/>
        },
        {
            path: "signup",
            element: <Signup/>,
              
            
        },
        {
            path: "/contact",
            // element: (
            //     <AuthLayout authentication>
            //         {" "}
                   
            //     </AuthLayout>
            // ),
        },
        {
            path:"/about",
        },
        {
            path:"/cart/:userId",
            element:<Cart/>,

        },
      
    ],
},
])

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store = {store}>
   <RouterProvider router={router}/>
   </Provider>
  </StrictMode>,
)
