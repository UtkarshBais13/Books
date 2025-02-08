import React from 'react'

function Fotter() {
  return (
    <footer className="bg-gray-800 text-white py-8">
      <div className="container mx-auto px-4">
        <div className="flex flex-wrap justify-between">
         
          {/* <div className="w-full md:w-1/3 mb-6">
            <h3 className="text-lg font-semibold mb-4">About Us</h3>
            <p className="text-gray-400">
              Welcome to our book store! We offer a wide selection of books from various genres and authors.
              Browse our collection and discover your next favorite read.
            </p>
          </div> */}

          {/* Quick Links */}
          
          <div className="w-full md:w-1/3 mb-6  ">
          <h3 className="text-lg font-semibold mb-4" >Quick Links</h3>
            
          <div className="flex space-x-4">
          <a href="#" className="text-gray-400 hover:text-white">
                  Home
                </a>
              
              
                <a href="#" className="text-gray-400 hover:text-white">
                  Categories
                </a>
              
              
                <a href="#" className="text-gray-400 hover:text-white">
                  Bestsellers
                </a>
             
                <a href="#" className="text-gray-400 hover:text-white">
                  Contact Us
                </a>
          </div>
               
              
          </div>

          {/* Social Media */}
          <div className="w-full md:w-1/3 mb-6">
            <h3 className="text-lg font-semibold mb-4">Follow Us</h3>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-white">
                <i className="fab fa-facebook-f"></i> Facebook
              </a>
              <a href="#" className="text-gray-400 hover:text-white">
                <i className="fab fa-twitter"></i> Twitter
              </a>
              <a href="#" className="text-gray-400 hover:text-white">
                <i className="fab fa-instagram"></i> Instagram
              </a>
              <a href="#" className="text-gray-400 hover:text-white">
                <i className="fab fa-linkedin"></i> LinkedIn
              </a>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="text-center mt-8 text-gray-500">
          <p>&copy; {new Date().getFullYear()} BookStore. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}

export default Fotter