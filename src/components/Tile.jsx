import './style.scss';
import React from "react";
import { useNavigate } from "react-router-dom";
import like from "../assets/like.svg";

function Tile({ newsItem,currentemail }) {
    const navigate = useNavigate();

  const handleClick = () => {
    const encodedobject=encodeURIComponent(JSON.stringify(newsItem))
    console.log(encodedobject,"encodedobject")
    navigate(`/news?auth=${currentemail}&data=${encodedobject}`);
    window.scrollTo(0, 0);
  };
  return (
    <div className="NewsTile" onClick={handleClick}>
      <h2 className="">{newsItem.Title}</h2>
      <div className="little-things">
        <p className="owner">Author: {newsItem.Owner}</p>
        <p className="date"> {newsItem.Date}</p>
        <span className="likes"> {newsItem.Like}<img src={like}/></span>
      </div>
      <div className="img-container">
      <img
        src={newsItem.imgUrl}
        alt={newsItem.title}
        className=""
      />
      </div>
      
    </div>
  );
}

export default Tile;
{/* <div key={index} className="mb-6 p-4 rounded-lg bg-white shadow-md">
    <h2 className="text-2xl font-bold mb-2">{newsItem.Title}</h2>
    <p className="text-gray-600 mb-2">Owner: {newsItem.Owner}</p>
    <p className="text-gray-600 mb-2">Group: {newsItem.Group}</p>
    <p className="text-gray-600 mb-2">Date: {newsItem.Date}</p>
    <img
    src={newsItem.imgUrl}
    alt={newsItem.Title}
    className="w-full h-[28rem] object-cover mb-4 rounded-lg"
    />
    <p className="text-gray-800 mb-4">{newsItem.Content}</p>
    <div className="flex justify-between text-sm">
    <span className="text-green-600">Likes: {newsItem.Like}</span>
    <span className="text-red-600">Reports: {newsItem.Reported}</span>
    <span className="text-blue-600">
        Approved: {newsItem.Approved ? "Yes" : "No"}
    </span>
    </div>
</div> */}