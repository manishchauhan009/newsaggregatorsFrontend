import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import 'react-loading-skeleton/dist/skeleton.css';
import Tile from "./Tile";

function CategoryContent({ userauth }) {
  const { category } = useParams();
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const fetchCategoryData = async () => {
    const NEWS_URL=process.env.NEWS_URL;
    const token = localStorage.getItem('token');
    try {
      const response = await axios.post(`${NEWS_URL}/categoryData`, {
        category: category,
      }, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      setData(response.data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCategoryData();
  }, [category]);

  const handleOnClick = () => {
    navigate("/");
  };

  if (!userauth) {
    navigate("/signin");
    return null;
  }

  return (
    <div className="CategoryContent">
      <h1>{category}</h1>
      <button onClick={handleOnClick} className="All-news-bt">
        View All News
      </button>

      {loading ? (
        <p>Loading...</p>
      ) : data.length > 0 ? (
        <div className="NewsTile-container">
          {data.map((newsItem, index) => (
            <Tile key={index} newsItem={newsItem} />
          ))}
        </div>
      ) : (
        <p className="text-center text-gray-600">No news data available.</p>
      )}
    </div>
  );
}

export default CategoryContent;
