import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import likeIcon from "../assets/like.svg";
import shareIcon from "../assets/share.svg";
import feedbackIcon from "../assets/feedback.svg";
import reportIcon from "../assets/report.svg";
import trashIcon from "../assets/trash.svg";
import "./style.scss";

function DetailedView() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [newsItem, setNewsItem] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [likeCount, setLikeCount] = useState(0);
  const [reportCount, setReportCount] = useState(0);
  const [loading, setLoading] = useState(true);

  const query = new URLSearchParams(window.location.search);
  const currentUser = query.get('auth');

  useEffect(() => {
    if (currentUser === "admin@gmail.com") {
      setIsAdmin(true);
    }

    const data = query.get('data');
    if (data) {
      const decodedData = JSON.parse(decodeURIComponent(data));
      setNewsItem(decodedData);
      setLikeCount(decodedData.Like);
      setLoading(false);
    } else {
      setLoading(false);
    }
  }, []);

  const handleLike = async () => {
    const NEWS_URL = process.env.REACT_APP_NEWS_URL;
    try {
      const response = await axios.post(`${NEWS_URL}/verifylike`, {
        newsid: newsItem._id,
        currentemail: currentUser,
      });
      if (response.data !== 0) {
        setLikeCount(likeCount + 1);
      }
    } catch (error) {
      console.error("Error liking article:", error);
    }
  };

  const handleReport = async () => {
    const NEWS_URL = process.env.REACT_APP_NEWS_URL;
    try {
      const response = await axios.post(`${NEWS_URL}/reported`, {
        newsid: newsItem._id,
        currentemail: currentUser,
      });
      if (response.data !== 0) {
        setReportCount(reportCount + 1);
      }
    } catch (error) {
      console.error("Error reporting article:", error);
    }
  };

  const handleDelete = async () => {
    const NEWS_URL = process.env.REACT_APP_NEWS_URL;
    try {
      await axios.post(`${NEWS_URL}/deletepost`, {
        newsid: newsItem._id,
      });
      setTimeout(() => {
        navigate("/");
      }, 1000);
    } catch (error) {
      console.error("Error deleting article:", error);
    }
  };

  if (loading) return <p>Loading...</p>;
  if (!newsItem) return <p>News item not found</p>;

  return (
    <div className="DetailedView">
      <h1>{newsItem.Title}</h1>
      <div className="little-things">
        <p>Author: {newsItem.Owner}</p>
        <p>Category: {newsItem.Group}</p>
        <p>{newsItem.Date}</p>

        <div className="extras">
          <span className='likes'>
            {likeCount}
            <img src={likeIcon} onClick={handleLike} title='Like Article' alt='Like' />
          </span>

          <img src={shareIcon} title='Share Article' alt='Share' />

          <a href="mailto:support@yourwebsite.com?subject=Support Inquiry&body=Hello, I need help with...">
            <img src={feedbackIcon} title='Share Feedback' alt='Feedback' />
          </a>

          <img src={reportIcon} onClick={handleReport} title='Report Article' alt='Report' />

          {isAdmin && (
            <button onClick={handleDelete} className='delete-bt'>
              <img src={trashIcon} alt="Delete" title='Delete Article' />
            </button>
          )}
        </div>
      </div>

      <div className="img-container">
        <img src={newsItem.imgUrl} alt={newsItem.Title} />
      </div>

      <div className='content' dangerouslySetInnerHTML={{ __html: newsItem.Content }} />
    </div>
  );
}

export default DetailedView;
