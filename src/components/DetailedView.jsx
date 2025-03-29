import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import like from "../assets/like.svg";
import share from "../assets/share.svg";
import feedback from "../assets/feedback.svg";
import report from "../assets/report.svg"
import trash from "../assets/trash.svg";
import { useNavigate} from "react-router-dom";
import "./style.scss";
function DetailedView() {
  let history = useNavigate();
  const { id } = useParams();
  const [newsItem, setNewsItem] = useState(null);
  const [flag,setflag]=useState(false);
  const [loading, setLoading] = useState(true);
  const [like1,setlike1]=useState(0)
  console.log("renrendered")

  const [reported1,setreported1]=useState(0);
  const query = new URLSearchParams(window.location.search);

  useEffect(()=>{
    if (query.get('auth')==="admin@gmail.com"){
      setflag(true)
    }

  },[])

  const liked = async () => {
    const NEWS_URL=process.env.REACT_APP_NEWS_URL;
    const query = new URLSearchParams(window.location.search);
    const current=query.get('auth')
    try {
      const response = await axios.post(`${NEWS_URL}/verifylike`, {
        newsid: newsItem._id,
        currentemail:current
      });
      if (response.data===0){
        console.log("check1")

      }
      else{
        setlike1(like1+1);
      }
      console.log(response.data)
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const reported = async () => {
    const NEWS_URL=process.env.REACT_APP_NEWS_URL;
    const query = new URLSearchParams(window.location.search);
    const current=query.get('auth')
    try {
      const response = await axios.post(`${NEWS_URL}/reported`, {
        newsid: newsItem._id,
        currentemail:current
      });
      if (response.data===0){
        console.log("stayed");

      }
      else{
        setreported1(reported1+1);
      }
      console.log(response.data)
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };


  const deletepost = async () => {
    const NEWS_URL=process.env.REACT_APP_NEWS_URL;
    const query = new URLSearchParams(window.location.search);
    try {
      const response = await axios.post(`${NEWS_URL}/deletepost`, {
        newsid: newsItem._id,
      });
      
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  

  useEffect(() => {
    const query = new URLSearchParams(window.location.search);
    const data = query.get('data');
    const decodedObject = JSON.parse(decodeURIComponent(data));
    setLoading(false)
    setNewsItem(decodedObject)
    
    

  }, []);
  useEffect(()=>{
    if (newsItem!==null){
      setlike1(newsItem.Like);
    }
    console.log(newsItem,"checkitem")
  },[newsItem])
  if (loading) return <p>Loading...</p>;
  if (!newsItem) return <p>News item not found</p>;

  return (
    <div className="DetailedView">
        <h1 className="">{newsItem.Title}</h1>
        <div className="little-things">
          <p className="">Author: {newsItem.Owner}</p>
          <p className="">Category: {newsItem.Group}</p>
          <p className="">{newsItem.Date}</p>
          <div className="extras">
          <span className='likes'>
          {like1}
          <img src={like} onClick={()=>{
            liked();
          }} title='like article' alt='Like Article'/>
          </span>
          <img src={share} title='share article' alt='Share Article'/>
          <a href="mailto:support@yourwebsite.com?subject=Support Inquiry&body=Hello, I need help with..."><img src={feedback} title='share feedback' alt='Feedback'/></a>
          <img onClick={()=>{
            reported();
          }} src={report} title='report article'/>
          {flag&&<button onClick={()=>{
            deletepost()
            
            setTimeout(() => {
              history("/")
              
              
            }, 1000);
          }} className='delete-bt'>
            <img src={trash} alt="Trash Can" title='delete Article'/>
          </button>}
        </div>
        </div>
        <div className="img-container">
          <img
            src={newsItem.imgUrl}
            alt={newsItem.Title}
            className=""
          />
        </div>
        {/* <p className="content">{newsItem.Content}</p> */}
        <div className='content' dangerouslySetInnerHTML={{ __html: newsItem.Content }} />
    </div>
  );
}

export default DetailedView;
