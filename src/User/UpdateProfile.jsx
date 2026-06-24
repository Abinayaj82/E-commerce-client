import React from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { useEffect , useState} from 'react';
import { getUserProfile, updateUserProfile } from '../features/User/UserSlice';
import toast from 'react-hot-toast';
import { removeError, removeUpdateSuccess } from '../features/User/UserSlice';
import { NavLink, useNavigate } from 'react-router-dom';
import PageTitle from '../Components/PageTitle'


const UpdateProfile = () => {
    const { user, error, updateSuccess } = useSelector((state) => state.user);
    const dispatch = useDispatch();
    const Navigate = useNavigate();
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [avatar, setAvatar] = useState("");
    const [preview, setPreview] = useState("https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg");

const handleAvatarChange = (e) => {
    if(e.target.name === "avatar"){
        const reader = new FileReader();
        reader.onload = () => {
            if (reader.readyState === 2) {
                setPreview(reader.result);
                setAvatar(reader.result);
            }
        };
        reader.readAsDataURL(e.target.files[0]);
    }
 
};
 const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission logic here
    const formData = new FormData();
    formData.set("name", name);
    formData.set("email", email);
    if (avatar) {
        formData.set("avatar", avatar);
    }
    dispatch(updateUserProfile(formData));
   
    // Dispatch an action to update the profile with formData
   // console.log("Form Data:", {
     //   name: formData.get("name"),
      //  email: formData.get("email"),
      //  avatar: formData.get("avatar"),
  //  });
};


    useEffect(() => {
        if (user) {
            setName(user.user.name);
            setEmail(user.user.email);
            if ( !avatar && user.user.avatar.url) {
                setPreview(user.user.avatar.url);
            }
        }
    }, [ user]);  

    useEffect(() =>{
        if (error) {
            toast.error(error);
            dispatch(removeError())
        }
        if (updateSuccess) {
            toast.success("Profile updated successfully");
            dispatch(getUserProfile());
            dispatch(removeUpdateSuccess());
            Navigate("/profile");
        }
    }, [error, updateSuccess]);

  return (
    <div className="flex items-center justify-center min-h-screen relative overflow-hidden bg-[#DBE4C9]">
         {/* Decorative blobs */}
         <div className="absolute top-[-10%] left-[-10%] w-96 h-96 bg-[#97b03a] rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob"></div>
         <div className="absolute bottom-[-10%] right-[-10%] w-96 h-96 bg-[#718b13] rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-2000"></div>

         <PageTitle title={"Edit Profile | E-Commerce"} />
         
      <div className ="relative bg-white/80 backdrop-blur-xl p-8 sm:p-10 rounded-[24px] shadow-2xl border border-white/40 w-full md:w-3/4 lg:w-1/2 max-w-md z-10 m-4">
        <form onSubmit={handleSubmit} encType="multipart/form-data" className ="flex flex-col gap-5 text-sm">
            <div className ="mb-2 text-center">
                <h2 className="text-2xl text-gray-800 font-extrabold tracking-tight">Edit Profile</h2> 
                <p className="text-sm text-gray-500 mt-1">Update your personal information.</p>
            </div>
     
            <div className="flex flex-col items-center gap-4 mb-2">
                <div className="shrink-0 relative">
                    <img id="preview" src={preview} alt="Profile Preview" className="w-24 h-24 rounded-full object-cover border-4 border-white shadow-md"/>
                </div>
                <label className="block text-sm font-semibold text-[#718b13] cursor-pointer hover:text-[#5a6f0f] transition-colors">
                    <span>Change photo</span>
                    <input type="file" accept="image/*" name="avatar" onChange={handleAvatarChange} className="hidden"/>
                </label>
            </div>

            <div className="flex flex-col">
                <label htmlFor="name" className="text-gray-600 text-xs font-semibold mb-1.5 uppercase tracking-wide">Name</label>
                <input type="text" id="name" value={name} onChange={(e) => setName(e.target.value)} placeholder="Your Name"  className="w-full bg-white border border-gray-200 rounded-xl py-3 px-4 text-gray-800 text-sm outline-none transition-all duration-200 focus:border-[#718b13] focus:ring-4 focus:ring-[#718b13]/10 placeholder:text-gray-400"/>
            </div>
            
            <div className="flex flex-col">
                <label htmlFor="email" className="text-gray-600 text-xs font-semibold mb-1.5 uppercase tracking-wide">Email Address</label>
                <input type="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="hello@example.com"  className="w-full bg-white border border-gray-200 rounded-xl py-3 px-4 text-gray-800 text-sm outline-none transition-all duration-200 focus:border-[#718b13] focus:ring-4 focus:ring-[#718b13]/10 placeholder:text-gray-400"/>
            </div>
        
            <div className="mt-4 flex flex-col gap-3">
                <button type="submit" className={`w-full bg-gradient-to-r from-[#718b13] to-[#97b03a] text-white font-bold py-3.5 px-4 rounded-xl shadow-lg shadow-[#718b13]/30 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-xl hover:shadow-[#718b13]/40 focus:outline-none focus:ring-4 focus:ring-[#718b13]/30`}>
                    Update Profile
                </button>
                <button type="button" onClick={() => Navigate("/update-password")} className="w-full bg-white border border-gray-200 text-gray-700 font-bold py-3.5 px-4 rounded-xl shadow-sm transition-all duration-200 hover:bg-gray-50 focus:outline-none focus:ring-4 focus:ring-gray-100">
                    Change Password
                </button>
            </div>
        </form>
      </div>
    </div>
  )
}

export default UpdateProfile
