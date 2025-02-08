import React, { useState } from 'react'
import Navbar from '../../navbar/Navbar'
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';


function Signup() {
    const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const user = {username,email,password};

  const handleSubmit = async(e) => {
    e.preventDefault();
    console.log("Form submitted:", { user });
    // Add your signup logic here, e.g., API call
    try {
      const response =  await fetch(`http://localhost:8080/api/auth/register`,{
        method:"POST",
        headers:{
          "Content-Type":"application/json",
        },
        body:JSON.stringify(user),
      });
      console.log(response);
      toast.success("Singed-up successfully!");
      navigate("/login")
    } catch (error) {
      console.log("register",error);
      
    }
    
    

  };
  return (
    <>
    <div className="relative w-full h-screen bg-cover bg-center bg-opacity-80" style={{ backgroundImage: "url('public/bookimg5.jpg')" }}>
    <Navbar/>
    {/* <img  className ="h-65 w-full" src="public/bookimg4.jpg" alt="" /> */}
    <div className="flex items-center justify-center min-h-screen ">
      <form onSubmit={handleSubmit} className="p-6 rounded-lg w-full max-w-sm ">
        <h2 className="text-3xl font-bold text-white mb-4 text-center ">Sign Up</h2>
        
        <div className="mb-4">
          <label htmlFor="username" className="block text-white mb-2">Username</label>
          <input
            type="text"
            name="username"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-full p-2 rounded bg-gray-700 text-white"
            required
          />
        </div>

        <div className="mb-4">
          <label htmlFor="email" className="block text-white mb-2">Email</label>
          <input
            type="email"
            name="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-2 rounded bg-gray-700 text-white"
            required
          />
        </div>

        <div className="mb-4">
          <label htmlFor="password" className="block text-white mb-2">Password</label>
          <input
            type="password"
            name="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-2 rounded bg-gray-700 text-white"
            required
          />
        </div>

        <button
          type="submit"
          className="w-full bg-orange-600 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded"
        >
          Sign Up
        </button>
      </form>
    </div>
   </div>
   
   

    </>
  )
}

export default Signup