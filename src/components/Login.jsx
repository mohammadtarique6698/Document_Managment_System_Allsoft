/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [data, setData] = useState(null);
  const [mobile, setMobile] = useState("");
  const [otp, setOtp] = useState("");
  const [isOtpSent, setIsOtpSent] = useState(false);
  const [apiPath, setApiPath] = useState("validateotp");
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
          setTimeout(() => setOtp(otp), 3500);
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
    if (localStorage.getItem("currentUser")) navigate("/home");
    else navigate("/admin");
  };

  //console.log(isOtpSent);

  return (
    <div className="flex items-center justify-center min-h-screen min-w-screen bg-gradient-to-br from-gray-900 via-purple-900 to-black">
      <div className="bg-white bg-opacity-10 backdrop-blur-lg shadow-2xl rounded-lg p-8 w-96 border border-white/20 text-center">
        <h2 className="text-3xl font-semibold text-center mb-6">Login</h2>
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
    </div>
  );
};

export default Login;
