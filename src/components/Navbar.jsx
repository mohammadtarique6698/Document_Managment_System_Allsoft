import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const user = JSON.parse(localStorage.getItem("currentUser"));
  const initials = user?.username
    ? user.username
        .split(" ")
        .slice(0, 2)
        .map((word) => word[0])
        .join("")
        .toUpperCase()
    : "U";

  const handleLogout = () => {
    localStorage.removeItem("currentUser");
    navigate("/admin"); // Redirect to Admin page
  };

  return (
    <nav className="bg-blue-500 text-white p-4 flex justify-between items-center">
      <h1 className="text-lg font-bold">Database Managment System</h1>
      {user && (
        <div className="relative">
          {/* Initials Button */}
          <button
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            className="w-10 h-10 bg-white text-blue-500 font-bold rounded-full flex items-center justify-center"
          >
            {initials}
          </button>

          {/* Logout Button (Dropdown) */}
          {isDropdownOpen && (
            <div className="absolute right-0 mt-2 bg-white text-blue-500 shadow-md rounded">
              <button
                onClick={handleLogout}
                className="block px-4 py-2 w-full text-left hover:bg-gray-200"
              >
                Logout
              </button>
            </div>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
