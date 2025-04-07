import './style.scss';
import React from "react";
import { useNavigate } from "react-router-dom";
import like from "../assets/like.svg";

function Tile({ newsItem, currentemail }) {
  const navigate = useNavigate();

  const handleClick = () => {
    const encodedObject = encodeURIComponent(JSON.stringify(newsItem));
    navigate(`/news?auth=${currentemail}&data=${encodedObject}`);
    window.scrollTo(0, 0);
  };

  return (
    <div className="NewsTile" onClick={handleClick} role="button" tabIndex={0}>
      <h2 className="text-xl font-semibold">{newsItem.Title}</h2>
      <div className="little-things flex justify-between text-sm text-gray-500">
        <p className="owner">Author: {newsItem.Owner}</p>
        <p className="date">{newsItem.Date}</p>
        <span className="likes flex items-center gap-1">
          {newsItem.Like}
          <img src={like} alt="likes" className="w-4 h-4" />
        </span>
      </div>
      <div className="img-container mt-2">
        <img
          src={newsItem.imgUrl || "https://via.placeholder.com/300x200?text=No+Image"}
          alt={newsItem.Title}
          className="w-full h-60 object-cover rounded-lg"
        />
      </div>
    </div>
  );
}

export default Tile;
