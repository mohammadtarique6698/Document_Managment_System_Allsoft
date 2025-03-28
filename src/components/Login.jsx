/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { login } from "../redux/slices/authSlice";
import axios from "axios";

const Login = () => {
  const [data, setData] = useState(null);
  const [mobile, setMobile] = useState("");
  const [otp, setOtp] = useState("");
  const [isOtpSent, setIsOtpSent] = useState(false);
  const [baseUrl, setBaseUrl] = useState("/");
  const [apiPath, setApiPath] = useState("validateotp");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    fetch("/allsoft Document Management.postman_collection.json")
      .then((res) => res.json())
      .then((jsonData) => {
        setData(jsonData);
      })
      .catch((error) => console.error("Error fetching JSON:", error));
  }, []);

  useEffect(() => {
    if (data) {
      try {
        if (data?.item?.[0]?.request?.body?.raw) {
          const rawData = JSON.parse(data.item[0].request.body.raw);
          setMobile(rawData.mobile_number || "");
        }
      } catch (error) {
        console.error("Error parsing data:", error);
      }
    }
  }, [data]);

  const sendOtpRequest = async () => {
    setIsOtpSent(true);
    try {
      if (!data?.item || data.item.length < 2) {
        console.error("data.item is undefined or has insufficient elements");
        return;
      }

      const parsedNumber = JSON.parse(
        data.item[0].request.body.raw.replace(/\r\n/g, "")
      );
      console.log(parsedNumber.mobile_number);

      if (mobile === parsedNumber.mobile_number) {
        const validatePathData = data?.item?.[1]?.request?.body?.raw;

        if (!validatePathData) {
          console.error("validatePathData is undefined");
          return;
        }

        const otpParse = JSON.parse(validatePathData.replace(/\r\n/g, ""));
        const otp = otpParse.otp;

        if (otp) {
          setOtp(otp);
          navigate(`/${apiPath}`);
        } else {
          console.error("OTP not found in response");
        }
      }
    } catch (error) {
      console.error("Error sending OTP request", error);
    }
  };

  const handleLogin = async () => {
    if (!mobile || !otp) {
      return;
    }
    navigate("/home");
  };

  //console.log(isOtpSent);

  return (
    <div className="bg-white p-6 rounded-lg shadow-md w-80">
      <h2 className="text-xl font-semibold text-center mb-4">Login</h2>
      <input
        type="text"
        placeholder="Enter Mobile Number"
        className="border p-2 w-full rounded mb-2"
        value={mobile}
        onChange={(e) => setMobile(e.target.value)}
      />
      {isOtpSent && (
        <input
          type="text"
          placeholder="Enter OTP"
          className="border p-2 w-full rounded mb-2"
          value={otp}
          onChange={(e) => setOtp(e.target.value)}
        />
      )}
      <button
        onClick={!isOtpSent ? sendOtpRequest : handleLogin}
        className="bg-blue-500 text-white p-2 w-full rounded"
      >
        {isOtpSent ? "Login" : "Send OTP"}
      </button>
    </div>
  );
};

export default Login;
