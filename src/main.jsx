import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import App from "./App";
import Home from "./pages/Home";
import Admin from "./pages/Admin";
import Loader from "./components/Loader";
import { SnackbarProvider } from "notistack";
import "./index.css";
import Navbar from "./components/Navbar";
// import FileUpload from "./components/FileUpload";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <SnackbarProvider maxSnack={3}>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Loader />} />
          <Route path="/generateOTP" element={<App />} />
          <Route path="/validateOTP" element={<App />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="/home" element={<Home />} />
        </Routes>
      </Router>
    </SnackbarProvider>
  </React.StrictMode>
);
