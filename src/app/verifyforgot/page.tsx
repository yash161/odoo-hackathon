"use client";
import axios from "axios";
import Link from "next/link";
import React, { useEffect, useState } from "react";

export default function verifyForgotPage() {
  const [verified, setVerified] = useState(false);
  const [loading, setLoading] = useState(false);
  const [token, setToken] = useState("");
  const [uid, setUid] = useState("");
  const [password, setPassword] = useState("");
  const [cpassword, setCpassword] = useState("");
  const [passwordmatch, setPasswormatch] = useState(false);
  const [isChanged,setIsChanged] = useState(false)

  const handleChangePassword = async () => {
    try {
      setLoading(true)
      console.log("userrrr idddd",uid)
      const response = await axios.post('/api/users/changepassword',{uid,password})
      console.log(response);
      
      setIsChanged(true)
      
      
    } catch (error:any) {
      console.log(error.message);
      setIsChanged(false)
      
    } finally {
      setLoading(false)
    }
    
  }

  const handleToken = async () => {
    try {
      setLoading(true);
      const response = await axios.post("/api/users/verifyforgot", { token });
      console.log("handleToken",response);
      console.log(response.data.data);
      
      setUid(response.data.data);
      setVerified(true);
    } catch (error: any) {
      console.log(error.message);
      setVerified(false);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    const urlToken = window.location.search.split("=")[1];
    console.log(urlToken);
    setToken(urlToken || "");
  }, []);

  useEffect(() => {
    if (token.length > 0) {
      handleToken();
    }
  }, [token]);

  useEffect(() => {
    if (password === cpassword && password !== "" && cpassword !=="") {
      setPasswormatch(true);
    } else {
      setPasswormatch(false);
    }
  }, [password, cpassword]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <h1 className="text-4xl">{loading ? "Processing" : "Verify Email"}</h1>
      <h2></h2>
      {verified && (
        <div className="flex flex-col mt-5">
          <label htmlFor="password">Password </label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="p-2 border border-gray-300  rounded-lg mb-4 focus:outline-none focus:border-gray-600 text-black"
            placeholder="Password"
          />
          <label htmlFor="confitmPassword">Confirm Password </label>
          <input
            type="password"
            id="cpassword"
            value={cpassword}
            onChange={(e) => setCpassword(e.target.value)}
            className="p-2 border border-gray-300  rounded-lg mb-4 focus:outline-none focus:border-gray-600 text-black"
            placeholder="Confirm Password"
          />
          <h4>{passwordmatch ? "Password Matched" : "Password Do Not Match"}</h4>
          <button className={`p-2 border border-gray-500 rounded-lg mb-4 focus:outline-none focus:border-gray-600 
            ${passwordmatch ? "" :"cursor-not-allowed"}
            `}
            onClick={handleChangePassword}
            >
            Submit
          </button>
          {
            isChanged ? "Password Change Successfully" : ""
          }
        </div>
      )}
      <Link className="hover:bg-green-400" href='/login'>Login</Link>
    </div>
  );
}