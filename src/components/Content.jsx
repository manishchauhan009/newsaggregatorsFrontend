import React, { useEffect, useState } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import axios from "axios";
import 'react-loading-skeleton/dist/skeleton.css';
import Tile from "./Tile";
import write from '../assets/write.svg';
function Content({ currentuser, currentemail, userauth }) {
  const [flag,setflag]=useState(false);
  
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const getData = async () => {
    const NEWS_URL=process.env.NEWS_URL;
    const token = localStorage.getItem("token");
    try {
      const response = await axios.get(`${NEWS_URL}/ownernewsData`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setData(response.data);
    } catch (error) {
      console.error("Error fetching data", error);
    } finally {
    }
  };

  useEffect(() => {
    console.log(loading)
    if (userauth) {
      getData();
    }
    else{
      navigate("/signin");

    }
  }, [userauth]);

  useEffect(()=>{
    console.log(data,"inside")
    if (data.length===0){
      return
    }
    setTimeout(()=>{
      setLoading(false)

    },[2000])
  },[data])

  useEffect(()=>{
    if (currentemail==="admin@gmail.com"){
      setflag(true)

    }

  },[])


  return (
    <div className="Content">
      <div className="Userdetails">
        {/* <img src="" className="profile-img"/> */}
        <h1 className="">Welcome {currentemail}</h1>
        {flag&&<button className="approval-bt" onClick={()=>{
          if (currentemail==="admin@gmail.com"){
            navigate("/admin")

          }
        }}>
          <span>&#x2611;</span>
          <p>Approvals</p>
          </button>}
        <button
          onClick={() => {
            navigate("/newsdata");
            window.scrollTo(0, 0);
          }}
          className=""
          >
            <img src={write}/>
            <p>Write an Article</p>
          </button>
      </div>
      {/* <h2>Your Publishes</h2> */}
      <div className="NewsTile-container">
            {loading ? (
              Array.from({ length: 3 }).map((_, index) => (
                <div key={index} className="mb-6 p-4 rounded-lg bg-white shadow-md">
                </div>
              ))
            ) : data.length > 0 ? (
              data.map((newsItem, index) => (
                <Tile key={index} currentemail={currentemail} newsItem={newsItem}/>
              ))
            ) : (
              <p className="text-center text-gray-600">No news data available.</p>
            )}
      </div>      
    </div>
  );
}

export default Content;
