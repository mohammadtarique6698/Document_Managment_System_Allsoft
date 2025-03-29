import React, { useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";

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
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Admin - Create User</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="border p-2 w-full"
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="border p-2 w-full"
        />
        <button
          type="submit"
          className="bg-green-500 text-white px-4 py-2 rounded"
        >
          Create User
        </button>
      </form>
    </div>
  );
};

export default AdminPage;
