

import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './pages/Auth/Login/Login'
import Register from './pages/Auth/Login/Register';

import Footer from './pages/Footer/footer'
import Home from'./pages/Home/Home'
const App = () => {
  return (
    <Router>
      <Routes>
      <Route path="/footer" element={<Footer />} />
      <Route path="/home" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </Router>
  );
};

export default App;
