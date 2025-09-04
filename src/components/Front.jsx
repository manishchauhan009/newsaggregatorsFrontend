import React, { useEffect, useState } from "react";
import axios from "axios";
import Tile from "./Tile";
import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router-dom";
import "./style.scss";
import sticker from "../assets/sticker.svg";

// ✅ Register Block Component
const RegisterBlock = () => {
  const navigate = useNavigate();
  const Loginclick = () => {
    navigate("/signin");
  };

  return (
    <div className="RegisterBlock">
      <div>
        <h1>Make Headlines: Join & Write!</h1>
        <p className="small-content">We are always open to take you in</p>
        <p className="quote">
          Transform campus conversations. Write your truth, share widely, and
          lead change at your university
        </p>
      </div>
      <button onClick={Loginclick}>
        <img src={sticker} alt="Register" />
        Register NOWWW!!
      </button>
    </div>
  );
};

// ✅ Front Component
function Front({ setUserAuth, setCurrentEmail, currentemail }) {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([]);

  // 🔑 Decode token and set auth state
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      try {
        const decoded = jwtDecode(token);
        if (decoded?.Email) {
          setCurrentEmail(decoded.Email);
          setUserAuth(true);
        }
      } catch (err) {
        console.error("Invalid token:", err);
        localStorage.removeItem("token");
      }
    }
  }, [setCurrentEmail, setUserAuth]);

  // 📡 Fetch news data
  const getData = async () => {
    const NEWS_URL = process.env.REACT_APP_NEWS_URL || "http://localhost:5000";
    setLoading(true);
    try {
      const response = await axios.get(`${NEWS_URL}/approvednewsData`);
      setData(response.data);
    } catch (error) {
      console.error("Error fetching data", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <div className="Front">
      <div className="NewsTile-container">
        {loading ? (
          // ⏳ Loading skeletons
          Array.from({ length: 3 }).map((_, index) => (
            <div
              key={index}
              className="mb-6 p-4 rounded-lg bg-white shadow-md animate-pulse"
            ></div>
          ))
        ) : data.length > 0 ? (
          // 📰 Show news tiles
          data.map((newsItem, index) => (
            <Tile
              key={index}
              currentemail={currentemail}
              newsItem={newsItem}
            />
          ))
        ) : (
          // ❌ Empty state
          <p className="text-center text-gray-600">
            Sorry, nothing new at the moment 😔
          </p>
        )}
      </div>

      <RegisterBlock />
    </div>
  );
}

export default Front;
