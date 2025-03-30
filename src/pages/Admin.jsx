import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaGithub, FaGlobe, FaLinkedin } from "react-icons/fa";

const AdminPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!username || !password) return;

    localStorage.setItem("currentUser", JSON.stringify({ username }));
    console.log("User Created:", { username, password });
    navigate("/home");
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 text-center">
      <h1 className="text-3xl font-bold text-white mb-8 bg-black bg-opacity-30 px-4 py-2 rounded-lg">
        Welcome to the Admin Page
      </h1>
      <div className="bg-white bg-opacity-20 backdrop-blur-md shadow-xl rounded-lg p-8 w-96 border border-white/30">
        <h2 className="text-2xl font-bold mb-6 text-white">
          Admin - Create User
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="border p-2 w-full rounded bg-white bg-opacity-60 text-gray-900"
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="border p-2 w-full rounded bg-white bg-opacity-60 text-gray-900"
          />
          <button
            type="submit"
            className="bg-green-500 text-white px-4 py-2 rounded w-full hover:bg-green-600 transition"
          >
            Create User
          </button>
        </form>
        <div className="flex justify-center gap-4 mt-6 text-white text-xl">
          <a
            href="https://github.com/yourusername"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaGithub className="hover:text-gray-300 transition" />
          </a>
          <a
            href="https://yourportfolio.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaGlobe className="hover:text-gray-300 transition" />
          </a>
          <a
            href="https://www.linkedin.com/in/yourusername"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaLinkedin className="hover:text-gray-300 transition" />
          </a>
        </div>
      </div>
    </div>
  );
};

export default AdminPage;

// import React, { useState } from "react";
// import { Navigate, useNavigate } from "react-router-dom";

// const AdminPage = () => {
//   const [username, setUsername] = useState("");
//   const [password, setPassword] = useState("");
//   const navigate = useNavigate();

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     if (!username || !password) return;

//     localStorage.setItem("currentUser", JSON.stringify({ username }));

//     console.log("User Created:", { username, password });

//     navigate("/home");
//   };

//   return (
//     <div className="p-4">
//       <h1 className="text-2xl font-bold mb-4">Admin - Create User</h1>
//       <form onSubmit={handleSubmit} className="space-y-4">
//         <input
//           type="text"
//           placeholder="Username"
//           value={username}
//           onChange={(e) => setUsername(e.target.value)}
//           className="border p-2 w-full"
//         />
//         <input
//           type="password"
//           placeholder="Password"
//           value={password}
//           onChange={(e) => setPassword(e.target.value)}
//           className="border p-2 w-full"
//         />
//         <button
//           type="submit"
//           className="bg-green-500 text-white px-4 py-2 rounded"
//         >
//           Create User
//         </button>
//       </form>
//     </div>
//   );
// };

// export default AdminPage;
