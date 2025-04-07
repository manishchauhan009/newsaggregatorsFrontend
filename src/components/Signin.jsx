import React, { useEffect, useState } from "react";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router-dom";
import './style.scss';

function Signin({ setUserAuth, setCurrentEmail, setCurrentUser }) {
  const navigate = useNavigate();

  const [Email, setEmail] = useState("");
  const [Username, setUsername] = useState("");
  const [Password, setPassword] = useState("");

  const USER_URL = process.env.REACT_APP_USER_URL;

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) return;
  
    try {
      const decoded = jwtDecode(token);
      setCurrentEmail(decoded.Email);
      setCurrentUser(null);
      setUserAuth(true);
      navigate("/content");
    } catch (err) {
      console.error("Invalid token:", err);
      localStorage.removeItem("token");
      navigate("/signin");
    }
  }, [navigate, setCurrentEmail, setCurrentUser, setUserAuth]);
  

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${USER_URL}/login`, {
        Email,
        Username,
        Password,
      });

      setCurrentUser(Username);
      setCurrentEmail(Email);
      localStorage.setItem("token", response.data.token);
      toast.success("Found You!!");
      setUserAuth(true);

      setTimeout(() => {
        toast.dismiss();
        navigate(Email === "admin@gmail.com" ? "/admin" : "/content");
      }, 2000);

      toast.loading("Will Redirect");

    } catch (error) {
      const status = error.response?.status;
      if (status === 404) {
        toast.error("Account Doesn't Exist");
        toast.loading("Redirecting...");
        setTimeout(() => navigate("/signup"), 2000);
      } else if (status === 800) {
        toast.error("Email Regex Error!");
      } else {
        toast.error("Invalid Credentials!");
        toast.loading("Refreshing...");
        setTimeout(() => window.location.reload(), 2000);
      }
    }
  };

  return (
    <div id="Signin">
      <Toaster />
      <div className="content">
        <h1>Sign in</h1>
        <form onSubmit={submitHandler}>
          <label>
            Email
            <input
              type="email"
              placeholder="Enter Your Email"
              autoComplete="email"
              required
              onChange={(e) => setEmail(e.target.value)}
            />
          </label>

          <label>
            Username
            <input
              type="text"
              placeholder="Enter Your Username"
              required
              onChange={(e) => setUsername(e.target.value)}
            />
          </label>

          <label>
            Password
            <input
              type="password"
              placeholder="Enter Your Password"
              autoComplete="current-password"
              required
              onChange={(e) => setPassword(e.target.value)}
            />
          </label>

          <button type="submit">Sign in</button>
        </form>

        <div className="line"></div>
        <div className="registration">
          <button onClick={() => navigate("/signup")}>
            Register
          </button>
        </div>
      </div>

      <div className="img-container">
        <img src="https://i.pinimg.com/originals/48/5d/2f/485d2f9046e9042762da35b2e8f22b87.gif" alt="Signin Illustration" />
      </div>
    </div>
  );
}

export default Signin;
