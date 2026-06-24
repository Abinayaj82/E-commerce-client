import React from 'react'
import { Search, Menu, X } from 'lucide-react'
import { useState,useEffect } from 'react'
import { NavLink ,useNavigate} from 'react-router-dom'
import logo from '../../assets/freshkart design.jpg'
import { Link } from 'react-router-dom'
import { FaCartArrowDown } from "react-icons/fa";
import { IoMdContact } from "react-icons/io";
import { useSelector, useDispatch } from 'react-redux';
import { getUserProfile } from '../../features/User/UserSlice.js';
import { removeError, removeLogoutSuccess } from '../../features/User/UserSlice.js';
import { logoutUser } from '../../features/User/UserSlice.js';
import toast from 'react-hot-toast';



const Navbar = () => {
  const [open, setOpen] = useState(false)
  const [profileOpen, setProfileOpen] = useState(false)
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [searchQuery, setSearchQuery] = useState('')
  const {isAuthenticated, user } = useSelector((state) => state.user);
   const {logoutSuccess, error, loading} = useSelector((state) => state.user);
   const {cartItems} = useSelector((state)=>state.cart)
   

    //console.log(isAuthenticated,user)
    //console.log(user?.user?.avatar)

  const handleSearch = (e) => {
    e.preventDefault();
    if(searchQuery.trim() !== ''){
      // Implement search functionality here
      navigate(`/products?keyword=${encodeURIComponent(searchQuery.trim())}`)
      console.log('Searching for:', searchQuery);
    }else{
      navigate('/products')
    }
      setSearchQuery('');
  } 

  const handleLogout = (e) => {
    e.preventDefault();
    dispatch(logoutUser());
    setProfileOpen(false);
    navigate('/');
  }

  useEffect(() => {
    if (isAuthenticated) {
        dispatch(getUserProfile());
    }
}, [dispatch, isAuthenticated]);

useEffect(() => {
  if(error) {
    toast.error("Login failed. Please try again.", {
      position: "top-center",
      autoClose: 2000,
      pauseOnHover: true,
    });
    dispatch(removeError());

  }
}, [ error,dispatch]);

useEffect(() => {
    if (logoutSuccess) {
        toast.success("Logout successful!", {
            position: "top-center",
            autoClose: 2000,
            pauseOnHover: true,
        });
        dispatch(removeLogoutSuccess());
    }
}, [logoutSuccess, dispatch]);
//console.log("logoutSuccess:", logoutSuccess)
  
//close profile dropdown when clicking other link
useEffect(() => {
  const handleClickOutside = (event) => {
    if (!event.target.closest('.profile-dropdown') && !event.target.closest('.profile-button')) {
      setProfileOpen(false);
    }
  };
  document.addEventListener('click', handleClickOutside);
  return () => {
    document.removeEventListener('click', handleClickOutside);
  };
}, []);



  return (
    <nav className="w-full sticky top-0 bg-white shadow-md z-50">
    <div className="max-w-7xl mx-auto px-4">

   <div className="flex items-center justify-between h-16 text-[#718b13]">

  {/* Logo */}
       <Link to="/" className="flex items-center">
       <img src={logo} className="h-12 w-auto object-contain"/>
       </Link>


    {/* Desktop Menu */}
     <div className="hidden md:flex items-center gap-6 font-semibold">
       <NavLink to="/">Home</NavLink>
       <NavLink to="/products">Products</NavLink>
       <NavLink to="/about">About</NavLink>
       <NavLink to="/contact">Contact</NavLink>
     </div>


     {/* Search Bar */}
    <form onSubmit={handleSearch}  className="hidden md:flex lg:flex items-center border rounded overflow-hidden">
     <input
     type="text"
    placeholder="Search products"
    className="px-3 py-1 outline-none w-60"
    value= {searchQuery}
    onChange={(e) => setSearchQuery(e.target.value)}
    
    
    />
    <button type="submit" className="bg-[#97b03a] text-white px-3 py-2">
    <Search size={18}/>
    </button>
    </form>


    {/* Right Icons */}
    <div className="flex items-center gap-4 ">

    {/* Cart */}
    <div className="relative">
      <NavLink to="/cart">
      <FaCartArrowDown size={20}/>
      </NavLink>
      <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs px-1 rounded-full">
       {cartItems.length}
      </span>
     </div>

     {/* Login */}
      {!isAuthenticated && (
       <div className=" hidden md:flex items-center gap-2 ">
        <div className=" flex items-center gap-1 ">
     <IoMdContact size={20}/>
     <NavLink to="/login" >Login</NavLink>
     </div>
      <div className =" w-20 h-8 text-white text-sm font-semibold text-center rounded bg-blue-400 flex items-center justify-center">
        <NavLink to="/register" >
          Register
        </NavLink>
      </div>
     
     </div> ) 
      } 
       
      {/* User Profile */}
      {isAuthenticated && (
        <div className="flex items-center gap-2 ">
          <button className="profile-button" onClick={() => setProfileOpen(!profileOpen)} >
            {user?.user?.avatar?.url ? (
              <img src={user?.user?.avatar?.url} alt={user?.user?.name}  title={user?.user?.name} className="h-7 w-7 rounded-full cursor-pointer object-cover"/>
            ) : (
              <div className="h-7 w-7 rounded-full cursor-pointer bg-gray-300 flex items-center justify-center">
                <span  className="profile-button"onClick={()=>setProfileOpen(true)} className="text-xs text-gray-600">
                  {user?.user?.name ? user?.user?.name.charAt(0).toUpperCase() : 'U'}
                  </span >
              </div>
            )}
          </button>
        </div>
        
      )}
      {profileOpen && (
        
        <div className=" profile-dropdown absolute right-10 top-12 mt-2 w-48 md:right-1 lg:right-1 bg-[#e8eddd] border-none rounded shadow-lg p-4  animate-in fade-in zoom-in-95 duration-200 ">
          <div className="absolute -top-2 right-6 w-4 h-4 bg-[#e8eddd] border-l border-t border-gray-100 rotate-45"></div>

          <p className="text-xl font-bold text-[#718b13] ">{user?.user?.name.charAt(0).toUpperCase()+user?.user?.name.slice(1)}</p>
          <p className=" text-sm text-gray-600 mb-1">{user?.user?.email}</p>
          <NavLink to="/profile" onClick={()=>setProfileOpen(false)}  className="block px-2 py-1 text-md text-[#718b13] hover:bg-gray-100 rounded">
            View Profile
          </NavLink>
          <NavLink to="/orders" onClick={()=>setProfileOpen(false)} className="block px-2 py-1 text-md text-[#718b13] hover:bg-gray-100  rounded">
            My Orders
          </NavLink>
           <NavLink to="/settings" onClick={()=>setProfileOpen(false)} className="block px-2 py-1 text-md text-[#718b13] hover:bg-gray-100  rounded">
            Settings
          </NavLink>
          <div className ="border-t w-full  border-gray-500 mt-2">
          <button onClick={handleLogout} className=" w-full px-2 py-1 text-left text-md  text-red-500 cursor-pointer hover:bg-gray-100 rounded mt-2">
            Logout
          </button>
          </div>
        </div>
      )}





     {/* Hamburger */}
     <button
     className="md:hidden cursor-pointer"
     onClick={() => setOpen(!open)}> 
      {open ? <X size={24}/> : <Menu size={24}/>}
      </button>

  </div>
   </div>


{/* Mobile Menu */}
<div className={`md:hidden transition-all duration-300 ${open ? "block" : "hidden"}`}>

<div className="flex flex-col gap-4 p-4 text-[#718b13] font-semibold">

<NavLink to="/" onClick={() => setOpen(false)}>
  Home
</NavLink>
<NavLink to="/products" onClick={() => setOpen(false)}>
  Products
</NavLink>
<NavLink to="/about" onClick={() => setOpen(false)}>
  About
</NavLink>
<NavLink to="/contact" onClick={() => setOpen(false)}>
  Contact
</NavLink>

<form className="flex items-center border rounded overflow-hidden">

<input
type="text"
placeholder="Search"
className="px-3 py-1 outline-none w-full"
/>

<button className="bg-[#97b03a] text-white px-3 py-2">
<Search size={18}/>
</button>

</form>

</div>

{!isAuthenticated ? (
  
<div className="flex items-center gap-4 p-4 border-t text-[#718b13]">
<div className=" flex items-center gap-1 ">
     <IoMdContact size={20}/>
     <NavLink to="/login" onClick={() => setOpen(false)}>Login</NavLink>
     </div>
      <div className =" w-20 h-8 text-white text-sm font-semibold text-center rounded bg-blue-400 flex items-center justify-center">
        <NavLink to="/register" onClick={() => setOpen(false)}>
          Register
        </NavLink>
      </div>
  </div>
) : (
 <p></p>
)
}

</div>

    </div>

    </nav>

);
}

export default Navbar
