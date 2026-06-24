import './App.css';
import { BrowserRouter, useLocation } from 'react-router-dom';
import AllRoutes from './AllRoutes.jsx';
import Navbar from './Components/Navbar/Navbar.jsx';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { getUserProfile } from './features/User/UserSlice.js';

function AppInner() {
  const { isAuthenticated } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const location = useLocation();
  const isAdmin = location.pathname.startsWith('/admin');

  useEffect(() => {
    if (isAuthenticated) {
      dispatch(getUserProfile());
    }
  }, [dispatch]);

  return (
    <>
      {!isAdmin && <Navbar />}
      <AllRoutes />
    </>
  );
}

function App() {
  return (
    <BrowserRouter>
      <AppInner />
    </BrowserRouter>
  );
}

export default App;
