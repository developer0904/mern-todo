import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';

// --- SVG Icons ---
const LogoIcon = ({ className }) => (
    <svg className={className} width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M12 2L2 7L12 12L22 7L12 2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M2 17L12 22L22 17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M2 12L12 17L22 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
);

// --- Header Component ---
function Header() {
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const navigate = useNavigate();
  const profileRef = useRef(null);

  // --- Mock user data ---
  // In a real app, this would come from your authentication context or state management
  const user = {
    name: 'jhondoe',
    email: 'jhondoe@gmail.com',
    imageUrl: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=1780&auto=format&fit=crop'
  };

  // Function to navigate to the login page
  const handleLoginClick = () => {
    navigate('/login');
  };

  // Close the profile dropdown if clicking outside of it
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (profileRef.current && !profileRef.current.contains(event.target)) {
        setIsProfileOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [profileRef]);

  return (
    <header className="fixed top-0 left-0 w-full bg-gray-800 text-white shadow-md px-4 sm:px-6 py-3 z-50">
      <div className="container mx-auto flex items-center justify-between">
        
        {/* Left Section: Logo */}
        <div className="flex items-center space-x-2">
            <LogoIcon className="h-8 w-8 text-gray-800" />
            <span className="hidden sm:block font-semibold text-lg">MyBrand</span>
        </div>

        {/* Center Section: Title */}
        <div className="absolute left-1/2 -translate-x-1/2">
             <h1 className="text-xl sm:text-2xl font-bold tracking-wider text-white">
                TASK TRACKER
            </h1>
        </div>

        {/* Right Section: Profile and Login */}
        <div className="flex items-center space-x-4">
          {/* Login Button */}
          <button
            onClick={handleLoginClick}
            className="bg-white text-gray-900 font-semibold py-2 px-4 rounded-lg hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-700 transition duration-300"
          >
            Login
          </button>

          {/* Profile Section */}
          <div className="relative" ref={profileRef}>
            <button onClick={() => setIsProfileOpen(!isProfileOpen)} className="block rounded-full overflow-hidden border-2 border-transparent hover:border-gray-400 transition">
              <img
                className="h-10 w-10 object-cover"
                src={user.imageUrl}
                alt="User profile"
                onError={(e) => { e.target.onerror = null; e.target.src='https://placehold.co/40x40/e2e8f0/4a5568?text=User'; }}
              />
            </button>

            {/* Profile Dropdown Card */}
            {isProfileOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-xl py-2">
                <div className="px-4 py-2">
                  <p className="font-bold text-gray-800">{user.name}</p>
                  <p className="text-sm text-gray-500">{user.email}</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;
