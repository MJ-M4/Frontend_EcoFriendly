// src/App.js
import React from 'react';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import './App.css';
import GeneralPage from './components/General';
import HomePage from './components/HomePage';
import Login from './components/Login';


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/HomePage" element={<HomePage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/general" element={<GeneralPage />} />
      </Routes>
    </Router>
  );
}

export default App;