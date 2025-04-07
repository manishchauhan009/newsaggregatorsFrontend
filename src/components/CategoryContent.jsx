import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import Skeleton from "react-loading-skeleton";
import 'react-loading-skeleton/dist/skeleton.css';
import Tile from "./Tile";

function CategoryContent({ userauth }) {
  const { category } = useParams();
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const fetchCategoryData = async () => {
    const NEWS_URL = process.env.REACT_APP_NEWS_URL;
    const token = localStorage.getItem('token');
    try {
      const response = await axios.post(
        `${NEWS_URL}/categoryData`,
        { category },
        { headers: { 'Authorization': `Bearer ${token}` } }
      );
      if (Array.isArray(response.data)) {
        setData(response.data);
      } else {
        console.warn("Expected array but got:", response.data);
        setData([]);
      }
    } catch (error) {
      console.error("Error fetching category data", error);
      setData([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCategoryData();
  }, [category]);

  useEffect(() => {
    if (!userauth) {
      navigate("/signin");
    }
  }, [userauth, navigate]);

  // Skeleton layout for Tile
  const SkeletonTile = () => (
    <div className="rounded-lg shadow-md p-4 bg-white mb-4 w-full max-w-md">
      <Skeleton height={180} className="mb-4" />
      <Skeleton count={2} />
    </div>
  );

  return (
    <div className="CategoryContent px-4">
      <h1 className="text-2xl font-semibold mb-4 capitalize">{category}</h1>
      <button onClick={() => navigate("/")} className="All-news-bt mb-6">
        View All News
      </button>

      {loading ? (
        <div className="NewsTile-container grid gap-4">
          {Array(6).fill().map((_, i) => (
            <SkeletonTile key={i} />
          ))}
        </div>
      ) : data.length > 0 ? (
        <div className="NewsTile-container grid gap-4">
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
