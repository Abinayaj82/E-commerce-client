import { Route, Routes, Navigate } from 'react-router-dom'
import Home from './Pages/Home/Home.jsx'
import Products from './Pages/Product/Product.jsx'
import Login from './User/Login.jsx'
import About from './Pages/About/About.jsx'
import Contact from './Pages/Contact/Contact.jsx'
import ProductDetail from './Pages/ProductDetail/ProductDetail.jsx'
import Register from './User/Register.jsx'
import Profile from './User/Profile.jsx'
import UpdateProfile from './User/UpdateProfile.jsx'
import ProtectedRoute from './Components/ProtectedRoute.jsx'
import UpdatePassword from './User/UpdatePassword.jsx'
import ForgetPassword from './User/ForgetPassword.jsx'
import ResetPassword from './User/ResetPassword.jsx'
import Cart from './Pages/Cart/Cart.jsx'
import Shipping from './Pages/Shipping/Shipping.jsx'
import Order from './Pages/Order/Order.jsx'
import OrderDetail from './Pages/OrderDetail/OrderDetail.jsx'
import AdminLayout from './Pages/Admin/AdminLayout.jsx'
import AdminDashboard from './Pages/Admin/AdminDashboard.jsx'
import AdminProducts from './Pages/Admin/AdminProducts.jsx'
import AdminOrders from './Pages/Admin/AdminOrders.jsx'
import AdminUsers from './Pages/Admin/AdminUsers.jsx'

const AllRoutes = () => {
  return (
   <Routes>
        {/* ── Public & User Routes ── */}
        <Route path="/" element={<Home />} />
        <Route path="/product/:_id" element={<ProtectedRoute element={<ProductDetail />} />} />
        <Route path="/products" element={<Products />} />
        <Route path="/about" element={<About />} />
        <Route path="/login" element={<Login />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/register" element={<Register />} />
        <Route path="/profile" element={<ProtectedRoute element={<Profile />} />} />
        <Route path="/update-profile" element={<ProtectedRoute element={<UpdateProfile />} />} />
        <Route path="/update-password" element={<ProtectedRoute element={<UpdatePassword />} />} />
        <Route path="/forget-password" element={<ForgetPassword />} />
        <Route path="/reset-password/:token" element={<ResetPassword />} />
        <Route path="/cart" element={<ProtectedRoute element={<Cart />} />} />
        <Route path="/shipping" element={<Shipping />} />
        <Route path="/orders" element={<ProtectedRoute element={<Order />} />} />
        <Route path="/order/:id" element={<ProtectedRoute element={<OrderDetail />} />} />

        {/* ── Admin Routes ── */}
        <Route
          path="/admin"
          element={<ProtectedRoute element={<AdminLayout />} adminOnly={true} />}
        >
          <Route index element={<Navigate to="/admin/dashboard" replace />} />
          <Route path="dashboard" element={<AdminDashboard />} />
          <Route path="products" element={<AdminProducts />} />
          <Route path="orders" element={<AdminOrders />} />
          <Route path="users" element={<AdminUsers />} />
        </Route>
    </Routes>
  )
}

export default AllRoutes
