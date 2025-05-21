import React from 'react';
import { Link } from 'react-router-dom';
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin, FaBookOpen } from 'react-icons/fa';

function Footer() {
  return (
    <footer className="bg-gradient-to-r from-gray-900 to-gray-800 text-white pt-12 pb-6">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-start">
          {/* Brand Info */}
          <div className="w-full md:w-1/4 mb-8">
            <div className="flex items-center mb-4">
              <FaBookOpen className="text-yellow-400 text-3xl mr-2" />
              <h2 className="text-2xl font-serif font-bold">Book Voyage</h2>
            </div>
            <p className="text-gray-300 mb-4">
              Your journey through literature starts here. Discover worlds between pages.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-300 hover:text-yellow-400 transition-colors">
                <FaFacebook className="text-xl" />
              </a>
              <a href="#" className="text-gray-300 hover:text-yellow-400 transition-colors">
                <FaTwitter className="text-xl" />
              </a>
              <a href="#" className="text-gray-300 hover:text-yellow-400 transition-colors">
                <FaInstagram className="text-xl" />
              </a>
              <a href="#" className="text-gray-300 hover:text-yellow-400 transition-colors">
                <FaLinkedin className="text-xl" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="w-full md:w-1/4 mb-8">
            <h3 className="text-xl font-semibold mb-4 border-b border-yellow-400 pb-2">Explore</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-gray-300 hover:text-yellow-400 transition-colors">Home</Link>
              </li>
              <li>
                <Link to="/categories" className="text-gray-300 hover:text-yellow-400 transition-colors">Categories</Link>
              </li>
              <li>
                <Link to="/bestsellers" className="text-gray-300 hover:text-yellow-400 transition-colors">Bestsellers</Link>
              </li>
              <li>
                <Link to="/new-releases" className="text-gray-300 hover:text-yellow-400 transition-colors">New Releases</Link>
              </li>
            </ul>
          </div>

          {/* Customer Service */}
          <div className="w-full md:w-1/4 mb-8">
            <h3 className="text-xl font-semibold mb-4 border-b border-yellow-400 pb-2">Help</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/contact" className="text-gray-300 hover:text-yellow-400 transition-colors">Contact Us</Link>
              </li>
              <li>
                <Link to="/faq" className="text-gray-300 hover:text-yellow-400 transition-colors">FAQs</Link>
              </li>
              <li>
                <Link to="/shipping" className="text-gray-300 hover:text-yellow-400 transition-colors">Shipping Policy</Link>
              </li>
              <li>
                <Link to="/returns" className="text-gray-300 hover:text-yellow-400 transition-colors">Returns & Refunds</Link>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div className="w-full md:w-1/4 mb-8">
            <h3 className="text-xl font-semibold mb-4 border-b border-yellow-400 pb-2">Newsletter</h3>
            <p className="text-gray-300 mb-4">
              Subscribe to get updates on new arrivals and special offers.
            </p>
            <form className="flex">
              <input
                type="email"
                placeholder="Your email"
                className="px-4 py-2 w-full rounded-l text-gray-800 focus:outline-none"
              />
              <button
                type="submit"
                className="bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded-r transition-colors"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>

        {/* Copyright & Payment Methods */}
        <div className="border-t border-gray-700 pt-6 mt-6">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 mb-4 md:mb-0">
              &copy; {new Date().getFullYear()} Book Voyage. All rights reserved.
            </p>
            <div className="flex space-x-4">
              <span className="text-gray-400">We accept:</span>
              <div className="flex space-x-2">
                <span className="text-gray-300">Visa</span>
                <span className="text-gray-300">Mastercard</span>
                <span className="text-gray-300">PayPal</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;