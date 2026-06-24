import React from 'react'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import toast from 'react-hot-toast';
import { useSelector, useDispatch } from 'react-redux';
import {  removeError, removeLoginSuccess,loginUser } from '../features/User/UserSlice';
import { useEffect } from 'react';
import { useNavigate ,useLocation} from 'react-router-dom';
import PageTitle from '../Components/PageTitle'


const Login = () => {
  const [user , setUser] = useState({
          email: '',
          password: ''
      });
      const { email , password} = user;
      const dispatch = useDispatch();
      const navigate = useNavigate();
      const location = useLocation();
        const {loginSuccess, error,loading } = useSelector((state) => state.user);
      const handleChange = (e) => {
          setUser({...user , [e.target.name]: e.target.value})
      }

     

      const handleSubmit = (e) => {
          e.preventDefault();
          // Handle form submission logic here
          if(!email || !password){
              toast.error("Please fill in all fields",{
              position: "top-center", autoClose: 2000, pauseOnHover: true,});
              return;
          }
        const formData = new FormData();
        formData.set("email", email);
        formData.set("password", password);

        // console.log("Form Data:", {
           // email: formData.get("email"),
           // password: formData.get("password"),
      //  });
        dispatch(loginUser({email, password}));
      }
         useEffect(() => {
            if (error) {
                toast.error(error, {
                    position: "top-center",
                    autoClose: 2000,
                    pauseOnHover: true,
                });
                dispatch(removeError());
            }
            if (loginSuccess) {
                toast.success("Login successful!", {
                    position: "top-center",
                    autoClose: 2000,
                    pauseOnHover: true,
                });
                dispatch(removeLoginSuccess());
                navigate("/");
                
            }
        }, [error, loginSuccess, dispatch]);
        
    useEffect(() => {
    if (location.state?.message) {
      toast.error(location.state.message);
    }
  }, [location]);

  return (
      <div className="flex items-center justify-center min-h-screen relative overflow-hidden bg-[#DBE4C9]">
         {/* Decorative blobs */}
         <div className="absolute top-[-10%] left-[-10%] w-96 h-96 bg-[#97b03a] rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob"></div>
         <div className="absolute bottom-[-10%] right-[-10%] w-96 h-96 bg-[#718b13] rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-2000"></div>

         <PageTitle title={"Login | E-Commerce"} />
         
      <div className ="relative bg-white/80 backdrop-blur-xl p-10 rounded-[24px] shadow-2xl border border-white/40 w-full md:w-3/4 lg:w-1/2 max-w-md z-10 m-4">
        <form onSubmit={handleSubmit} className ="flex flex-col gap-5 text-sm">
            <div className ="mb-4 text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-[#718b13]/10 mb-4 shadow-inner">
                   <span className="text-3xl">👋</span>
                </div>
                <h2 className="text-2xl text-gray-800 font-extrabold tracking-tight">Welcome back</h2> 
                <p className="text-sm text-gray-500 mt-1">Please enter your details to sign in.</p>
            </div>
     
            <div className="flex flex-col">
                <label htmlFor="email" className="text-gray-600 text-xs font-semibold mb-1.5 uppercase tracking-wide">Email Address</label>
                <input type="email" id="email" name="email" autoComplete='email' value={email} onChange={handleChange} placeholder="hello@example.com"  className="w-full bg-white border border-gray-200 rounded-xl py-3 px-4 text-gray-800 text-sm outline-none transition-all duration-200 focus:border-[#718b13] focus:ring-4 focus:ring-[#718b13]/10 placeholder:text-gray-400"/>
            </div>
            
            <div className="flex flex-col">
                <label htmlFor="password" className="text-gray-600 text-xs font-semibold mb-1.5 uppercase tracking-wide">Password</label>
                <input type="password" id="password" autoComplete='current-password' placeholder='••••••••' name="password" value={password} onChange={handleChange}  className="w-full bg-white border border-gray-200 rounded-xl py-3 px-4 text-gray-800 text-sm outline-none transition-all duration-200 focus:border-[#718b13] focus:ring-4 focus:ring-[#718b13]/10 placeholder:text-gray-400"/>
            </div>
        
            <div className="mt-2">
                <button type="submit" disabled={loading} className={`w-full bg-gradient-to-r from-[#718b13] to-[#97b03a] text-white font-bold py-3.5 px-4 rounded-xl shadow-lg shadow-[#718b13]/30 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-xl hover:shadow-[#718b13]/40 focus:outline-none focus:ring-4 focus:ring-[#718b13]/30 cursor-pointer ${loading ? 'opacity-70 cursor-not-allowed' : ''}`}>
                    {loading ? "Logging in..." : "Sign In"}
                </button>
            </div>
            
            <div className="flex flex-col items-center gap-3 mt-4">
                <p className="text-sm text-gray-600">Don't have an account? <Link to="/register" className="text-[#718b13] font-semibold hover:text-[#5a6f0f] transition-colors">Sign Up</Link></p>
                <Link to="/forget-password" className="text-sm text-gray-500 hover:text-gray-800 transition-colors">Forgot your password?</Link> 
            </div>
        </form>
      </div>
    </div>
  )
}

export default Login
