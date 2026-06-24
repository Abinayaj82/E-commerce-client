import React from 'react'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import toast from 'react-hot-toast';
import { useSelector, useDispatch } from 'react-redux';
import { registerUser, removeError, removeSuccess } from '../features/User/UserSlice';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import login from './Login.jsx';
import PageTitle from '../Components/PageTitle'


const Register = () => {
    const [preview, setPreview] = useState("https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg");
    const [user , setUser] = useState({
        name: '',
        email: '',
        password: ''
    });
    const {name , email , password} = user;
    const dispatch = useDispatch();
    const navigate = useNavigate();
     const {success, error,loading} = useSelector((state) => state.user);




   
    const [avatar, setAvatar] = useState("");
    const handleChange = (e) => {
        if(e.target.name == "avatar"){
           const reader = new FileReader();
            reader.onload = () => {
                if(reader.readyState === 2){
                    setPreview(reader.result);
                    setAvatar(reader.result);
                };
            }
            reader.readAsDataURL(e.target.files[0]);
        }else{
            setUser({...user , [e.target.name]: e.target.value})
        }
    }

        
    const handleSubmit = (e) => {
        e.preventDefault();
        // Handle form submission logic here
        if(!name || !email || !password){
            toast.error("Please fill in all fields",{
            position: "top-center", autoClose: 2000, pauseOnHover: true,});
            return;
        }
        const formData = new FormData();
        formData.set("name", name);
      formData.set("email", email);
       formData.set("password", password);
       formData.set("avatar", avatar);
       // console.log("Form Data:", {
        //    name: formData.get("name"),
         //   email: formData.get("email"),
         //   password: formData.get("password"),
          //  avatar: formData.get("avatar"),
     //   });
       
        dispatch(registerUser(formData));
        
    }
      useEffect(() => {
        if (error) {
            toast.error(error, {
                position: "top-center",
                autoClose: 2000,
                pauseOnHover: true,
            });
        }
            dispatch(removeError());
        },[dispatch, error] )

        useEffect(() => {
            if (success) {
                toast.success("Registration successful!", {
                    position: "top-center",
                    autoClose: 2000,
                    pauseOnHover: true,
                });
                 dispatch(removeSuccess());
                 navigate("/");
            }
          
        }, [ success,dispatch]);



  return (
    <div className="flex items-center justify-center min-h-screen relative overflow-hidden bg-[#DBE4C9]">
         {/* Decorative blobs */}
         <div className="absolute top-[-10%] left-[-10%] w-96 h-96 bg-[#97b03a] rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob"></div>
         <div className="absolute bottom-[-10%] right-[-10%] w-96 h-96 bg-[#718b13] rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-2000"></div>

        <PageTitle title={"Register | E-Commerce"} />
      <div className ="relative bg-white/80 backdrop-blur-xl p-10 rounded-[24px] shadow-2xl border border-white/40 w-full md:w-3/4 lg:w-1/2 max-w-md z-10 m-4">
        <form onSubmit={handleSubmit} encType="multipart/form-data" className ="flex flex-col gap-4 text-sm">
            <div className ="mb-2 text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-[#718b13]/10 mb-4 shadow-inner">
                   <span className="text-3xl">✨</span>
                </div>
                <h2 className="text-2xl text-gray-800 font-extrabold tracking-tight">Create Account</h2>
                <p className="text-sm text-gray-500 mt-1">Join our community today!</p>
            </div>
            
            <div className="flex flex-col">
                <label htmlFor="name" className="text-gray-600 text-xs font-semibold mb-1.5 uppercase tracking-wide">Full Name</label>
                <input type="text" id="name" name="name" value={name} placeholder="John Doe" onChange={handleChange} className="w-full bg-white border border-gray-200 rounded-xl py-3 px-4 text-gray-800 text-sm outline-none transition-all duration-200 focus:border-[#718b13] focus:ring-4 focus:ring-[#718b13]/10 placeholder:text-gray-400"/>
            </div>
            
            <div className="flex flex-col">
                <label htmlFor="email" className="text-gray-600 text-xs font-semibold mb-1.5 uppercase tracking-wide">Email Address</label>
                <input type="email" id="email" name="email" value={email} placeholder="hello@example.com" onChange={handleChange} className="w-full bg-white border border-gray-200 rounded-xl py-3 px-4 text-gray-800 text-sm outline-none transition-all duration-200 focus:border-[#718b13] focus:ring-4 focus:ring-[#718b13]/10 placeholder:text-gray-400"/>
            </div>
            
            <div className="flex flex-col">
                <label htmlFor="password" className="text-gray-600 text-xs font-semibold mb-1.5 uppercase tracking-wide">Password</label>
                <input type="password" id="password" placeholder='••••••••'  value={password} onChange={handleChange} name="password"  className="w-full bg-white border border-gray-200 rounded-xl py-3 px-4 text-gray-800 text-sm outline-none transition-all duration-200 focus:border-[#718b13] focus:ring-4 focus:ring-[#718b13]/10 placeholder:text-gray-400"/>
            </div>
        
            <div className="flex items-center space-x-4 mt-2 bg-white/50 p-3 rounded-xl border border-gray-200">
                <div className="shrink-0">
                    <img id="preview" src={preview} alt="Profile Preview" className="h-12 w-12 rounded-full object-cover border-2 border-white shadow-sm"/>
                </div>
                <label className="block flex-1 text-sm font-medium text-gray-700 cursor-pointer">
                    <span className="sr-only">Choose Profile</span>
                    <input type="file" name="avatar" accept="image/*" onChange={handleChange}  className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-xs file:font-semibold file:bg-[#718b13]/10 file:text-[#718b13] hover:file:bg-[#718b13]/20 cursor-pointer transition-colors"/>
                </label>
            </div>
            
            <div className="mt-4">
                <button type="submit" disabled={loading} className={`w-full bg-gradient-to-r from-[#718b13] to-[#97b03a] text-white font-bold py-3.5 px-4 rounded-xl shadow-lg shadow-[#718b13]/30 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-xl hover:shadow-[#718b13]/40 focus:outline-none focus:ring-4 focus:ring-[#718b13]/30 ${loading ? 'opacity-70 cursor-not-allowed' : ''}`}>
                    {loading ? "Registering..." : "Create Account"}
                </button>
            </div>
            
            <div className="flex items-center justify-center mt-2">
                <p className="text-sm text-gray-600">Already have an account? <Link to="/login" className="text-[#718b13] font-semibold hover:text-[#5a6f0f] transition-colors">Sign In</Link></p>
            </div>
        </form>
      </div>
    </div>
  )
}

export default Register
