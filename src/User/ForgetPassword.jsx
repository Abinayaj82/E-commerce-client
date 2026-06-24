import React from 'react'
import { useState } from 'react';
import { forgetPassword, removeError,removeForgetPasswordSuccess } from '../features/User/UserSlice';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import PageTitle from '../Components/PageTitle'

const ForgetPassword = () => {
    const [email, setEmail] = useState("");
    const dispatch = useDispatch()
    const Navigate = useNavigate()
    const { error,forgetPasswordSuccess,loading} = useSelector((state)=>state.user)

    const handleChange =(e) =>{
        setEmail (e.target.value);
    }
    const handleSubmit = (e) =>{
           e.preventDefault();
           dispatch(forgetPassword({email}))

    }
    useEffect(()=>{
       if (error) {
            toast.error(error, {
                position: "top-center",
                autoClose: 2000,
                pauseOnHover: true,
            });
            dispatch(removeError());
        }
          
         if (forgetPasswordSuccess) {
                toast.success("Reset link sent to this email!", {
                    position: "top-center",
                    autoClose: 2000,
                    pauseOnHover: true,
                });
                 dispatch(removeForgetPasswordSuccess());
                 setEmail(" ");
            }
          

    }, [error,dispatch, forgetPasswordSuccess])

  return (
    <div className="flex items-center justify-center min-h-screen relative overflow-hidden bg-[#DBE4C9]">
         {/* Decorative blobs */}
         <div className="absolute top-[-10%] left-[-10%] w-96 h-96 bg-[#97b03a] rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob"></div>
         <div className="absolute bottom-[-10%] right-[-10%] w-96 h-96 bg-[#718b13] rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-2000"></div>

         <PageTitle title={"Reset Password | E-Commerce"} />
         
      <div className ="relative bg-white/80 backdrop-blur-xl p-10 rounded-[24px] shadow-2xl border border-white/40 w-full md:w-3/4 lg:w-1/2 max-w-md z-10 m-4">
        <form onSubmit={handleSubmit} className ="flex flex-col gap-5 text-sm">
            <div className ="mb-4 text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-[#718b13]/10 mb-4 shadow-inner">
                   <span className="text-3xl">🔑</span>
                </div>
                <h2 className="text-2xl text-gray-800 font-extrabold tracking-tight">Forgot Password?</h2> 
                <p className="text-sm text-gray-500 mt-1">Enter your email and we'll send a reset link.</p>
            </div>
     
            <div className="flex flex-col">
                <label htmlFor="email" className="text-gray-600 text-xs font-semibold mb-1.5 uppercase tracking-wide">Email Address</label>
                <input type="email" id="email" value={email} onChange={handleChange} placeholder="hello@example.com"  className="w-full bg-white border border-gray-200 rounded-xl py-3 px-4 text-gray-800 text-sm outline-none transition-all duration-200 focus:border-[#718b13] focus:ring-4 focus:ring-[#718b13]/10 placeholder:text-gray-400"/>
            </div>
        
            <div className="mt-2">
                <button type="submit" disabled={loading} className={`w-full bg-gradient-to-r from-[#718b13] to-[#97b03a] text-white font-bold py-3.5 px-4 rounded-xl shadow-lg shadow-[#718b13]/30 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-xl hover:shadow-[#718b13]/40 focus:outline-none focus:ring-4 focus:ring-[#718b13]/30 ${loading ? 'opacity-70 cursor-not-allowed' : ''}`}>
                    {loading ? "Sending Link..." : "Send Reset Link"}
                </button>
            </div>
        </form>
      </div>
    </div>
  )
}

export default ForgetPassword
