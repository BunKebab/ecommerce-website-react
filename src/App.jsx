import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useSelector } from 'react-redux';

// Components
import Header from './components/Header';
import Sidebar from './components/Sidebar';

// Admin Pages
import Dashboard from './pages/admin/Dashboard';
import Productmanager from './pages/admin/Productmanager';
import Usermanager from './pages/admin/Usermanager';

// User Pages
import Home from './pages/user/Home';
import Products from './pages/user/Products';
import Product from './pages/user/Product';
import Cart from './pages/user/Cart';
import Checkout from './pages/user/Checkout';
import Orderhistory from './pages/user/Orderhistory';
import Profile from './pages/user/Profile';
import Login from './pages/user/Login';

const App = () => {
  const { isAuthenticated, user } = useSelector((state) => state.authslice);

  return (
    <BrowserRouter>
      {isAuthenticated && user.role === 'Admin' ? (
        <div className="flex h-screen">
          <Sidebar />
          <div className="flex-1">
            <Routes>
              <Route path="/admin/dashboard" element={<Dashboard />} />
              <Route path="/admin/products" element={<Productmanager />} />
              <Route path="/admin/users" element={<Usermanager />} />
              <Route path="/admin/profile" element={<Profile />} />
              {/* Add more admin routes here */}
            </Routes>
          </div>
        </div>
      ) : (
        <>
          <Header />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/products" element={<Products />} />
            <Route path="/product/:id" element={<Product />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/checkout" element={<Checkout />} />
            <Route path="/order-history" element={<Orderhistory />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/login" element={<Login />} />
            {/* Add more user routes here */}
          </Routes>
        </>
      )}
    </BrowserRouter>
  );
};

export default App;
