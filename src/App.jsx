import React from 'react'
import {BrowserRouter, Routes, Route} from 'react-router-dom'

//components
import Header from './components/Header'

//admin pages
import Dashboard from './pages/admin/Dashboard'
import Productmanager from './pages/admin/Productmanager'
import Usermanager from './pages/admin/Usermanager'

//user pages
import Home from './pages/user/Home'
import Profile from './pages/user/Profile'
import Products from './pages/user/Products'
import Product from './pages/user/Product'
import Cart from './pages/user/Cart'
import Checkout from './pages/user/Checkout'
import Orderhistory from './pages/user/Orderhistory'
import Login from './pages/user/Login'

const App = () => {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/products' element={<Products />} />
        <Route path='/product' element={<Product />} />
        <Route path='/cart' element={<Cart />} />
        <Route path='/checkout' element={<Checkout />} />
        <Route path='/order-history' element={<Orderhistory />} />
        <Route path='/profile' element={<Profile />} />
        <Route path='/login' element={<Login />} />

        /**admin pages*/
        <Route path='/admin/dashboard' element={<Dashboard />} />
        <Route path='/admin/products' element={<Productmanager />} />
        <Route path='/admin/users' element={<Usermanager />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App