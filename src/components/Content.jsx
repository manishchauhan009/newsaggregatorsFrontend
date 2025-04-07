import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import 'react-loading-skeleton/dist/skeleton.css';
import Tile from "./Tile";
import write from '../assets/write.svg';

function Content({ currentuser, currentemail, userauth }) {
  const [flag, setFlag] = useState(false);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const getData = async () => {
    const NEWS_URL = process.env.REACT_APP_NEWS_URL;
    const token = localStorage.getItem("token");

    try {
      const response = await axios.get(`${NEWS_URL}/ownernewsData`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      // Check if response.data is an array
      if (Array.isArray(response.data)) {
        setData(response.data);
      } else {
        console.warn("Expected array, got:", response.data);
        setData([]);
      }
    } catch (error) {
      console.error("Error fetching data", error);
      setData([]);
    }
  };

  useEffect(() => {
    if (userauth) {
      getData();
    } else {
      navigate("/signin");
    }
  }, [userauth]);

  useEffect(() => {
    if (Array.isArray(data) && data.length > 0) {
      setTimeout(() => setLoading(false), 2000);
    }
  }, [data]);

  useEffect(() => {
    if (currentemail === "admin@gmail.com") {
      setFlag(true);
    }
  }, [currentemail]);

  return (
    <div className="Content">
      <div className="Userdetails">
        <h1>Welcome {currentemail}</h1>
        {flag && (
          <button
            className="approval-bt"
            onClick={() => navigate("/admin")}
          >
            <span>&#x2611;</span>
            <p>Approvals</p>
          </button>
        )}
        <button
          onClick={() => {
            navigate("/newsdata");
            window.scrollTo(0, 0);
          }}
        >
          <img src={write} alt="Write" />
          <p>Write an Article</p>
        </button>
      </div>

      <div className="NewsTile-container">
        {loading ? (
          Array.from({ length: 3 }).map((_, index) => (
            <div
              key={index}
              className="mb-6 p-4 rounded-lg bg-white shadow-md"
            ></div>
          ))
        ) : Array.isArray(data) && data.length > 0 ? (
          data.map((newsItem, index) => (
            <Tile key={index} currentemail={currentemail} newsItem={newsItem} />
          ))
        ) : (
          <p className="text-center text-gray-600">No news data available.</p>
        )}
      </div>
    </div>
  );
}

export default Content;
