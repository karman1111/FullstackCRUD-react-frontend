import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'; // Import BrowserRouter, Route, and Routes
import './App.css';
import Navbar from './loyout/AppNavbar';
import 'bootstrap/dist/css/bootstrap.min.css';
import Home from './pages/Home';
import AddUser from './user/AddUser';
import UpdateUser from './user/UpdateUser';

export default function App() {
  return (
    <div className="App">
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/add" element={<AddUser/>}/>
          <Route path="/edit/:id" element={<UpdateUser/>}/>
        </Routes>
      </Router>
    </div>
  );
}
