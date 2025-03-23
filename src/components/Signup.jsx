import React, { useState, useEffect } from "react";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import './style.scss';

function Signup() {
  let navigate = useNavigate();

  const [Email, setEmail] = useState("");
  const [Username, setUsername] = useState("");
  const [Password, setPassword] = useState("");
  const [ConfirmPassword, setConfirmPassword] = useState("");

  useEffect(() => {
    toast.dismiss();
  }, []);

  const formSubmit = async (e) => {
    const USER_URL=process.env.USER_URL;
    e.preventDefault();
    if (Password !== ConfirmPassword) {
      toast.error("Passwords do not match!");
      return;
    }

    try {
      const response = await axios.post(`${USER_URL}/register`, {
        Email,
        Username,
        Password,
        ConfirmPassword,
      });

      if (response.status === 200) {
        toast.success("Success! Redirecting...");
        setTimeout(() => {
          navigate("/Signin");
        }, 2000);
      } else if (response.status === 400) {
        toast.error("User already exists. Please login!");
        setTimeout(() => {
          window.location.reload();
        }, 2000);
      } else if (response.status === 403) {
        alert("Invalid Gmail. Try Again");
      } else {
        toast.error("Server error. Please try again.");
      }
    } catch (error) {
      console.error("Error during registration:", error);
      toast.error("An error occurred. Please try again.");
    }
  };

  return (
    <div id="Signup">
      <Toaster />
      <div className="content">
        <h1>Register</h1>
        <form onSubmit={formSubmit} action="">
          <label>
            Email
            <input
              onChange={(e) => setEmail(e.target.value)}
              required
              placeholder="someone@gmail.com"
              type="email"
            />
          </label>
          <label>
            Username
            <input
              onChange={(e) => setUsername(e.target.value)}
              required
              placeholder="someone123"
              type="text"
            />
          </label>
          <label>
            Password
            <input
              onChange={(e) => setPassword(e.target.value)}
              required
              placeholder="Password"
              type="password"
            />
          </label>
          <label>
            Confirm Password
            <input
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
              placeholder="Confirm Password"
              type="password"
            />
          </label>
          <button type="submit">Register</button>
        </form>
        <div className="line"></div>
        <div className="registration">
          <button onClick={() => navigate("/Signin")}>Sign in</button>
        </div>
      </div>
      <div className="img-container">
        <div className="overlay"></div>
        <img
          src="https://cdn.dribbble.com/users/136988/screenshots/1921959/door_smal.gif"
          alt="Signup Illustration"
        />
      </div>
    </div>
  );
}

export default Signup;
