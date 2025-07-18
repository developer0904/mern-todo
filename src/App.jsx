import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Header from './components/Header'; // Adjust path if needed
import Login from './components/Login';   // Adjust path if needed
import Register from './components/Register'; // Adjust path if needed
import Home from './components/Home';

// This is the main application component that orchestrates the layout and routing.
function App() {
  return (
    <Router>
      {/* The main container for the entire app. 
          Using flexbox to ensure content below the header fills the screen. */}
      <div className="flex flex-col min-h-screen bg-gray-100">
        
        {/* The Header component is placed outside the Routes, 
            so it will be visible on every page of your application. */}
        <Header />

        {/* The main content area will grow to fill the available space. */}
        <main className="flex-grow pt-16">
          <Routes>
            {/* The default route redirects to the login page. */}
            <Route path="/" element={<Home/>} />
            
            {/* Route for the Login page */}
            <Route path="/login" element={<Login />} />

            {/* Route for the Register page */}
            <Route path="/register" element={<Register />} />

            {/* You can add more routes for your application here */}
            {/* e.g., <Route path="/dashboard" element={<Dashboard />} /> */}
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
