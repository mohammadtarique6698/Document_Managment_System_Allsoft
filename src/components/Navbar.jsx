import React from "react";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem("currentUser"));
  const initials = user?.username
    ? user.username
        .split(" ")
        .slice(0, 2) // Take only the first two words
        .map((word) => word[0]) // Get the first letter of each
        .join("")
        .toUpperCase()
    : "U";

  const handleLogout = () => {
    localStorage.removeItem("currentUser");
    navigate("/admin"); // Redirect to Admin page
  };

  return (
    <nav className="bg-blue-500 text-white p-4 flex justify-between items-center">
      <h1 className="text-lg font-bold">MyApp</h1>
      {user && (
        <div className="relative">
          <button
            onClick={handleLogout}
            className="w-10 h-10 bg-white text-blue-500 font-bold rounded-full flex items-center justify-center"
          >
            {initials}
          </button>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
