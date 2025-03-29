import React, { useEffect, useState } from "react";
import axios from "axios";
import Tile from "./Tile";
import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router-dom";
import "./style.scss";
import sticker from "../assets/sticker.svg";
const RegisterBlock = () => {
  let history = useNavigate();
  const Loginclick = () => {
    history("/signin");
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
        <img src={sticker} alt='Register'/>
        Register NOWWW!!
      </button>
    </div>
  );
};
function Front({ setUserAuth, setCurrentEmail, currentemail }) {
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token !== null) {
      const decoded = jwtDecode(token);
      setCurrentEmail(decoded.Email);
      setUserAuth(true);
    }
  });

  let loading = false;
  const [data, setData] = useState([]);
  const getData = async () => {
    const NEWS_URL=process.env.REACT_APP_NEWS_URL;
    try {
      console.log("API link ",`${NEWS_URL}/approvednewsData`)
      const response = await axios.get(`${NEWS_URL}/approvednewsData`);
      setData(response.data);
    } catch (error) {
      console.error("Error fetching data", error);
    } finally {
    }
  };
  useEffect(() => {
    getData();
  }, []);
  useEffect(() => {
    if (data.length > 0) {
      console.log(data);
    }
  }, [data]);
  return (
    <div className="Front">
      <div className="NewsTile-container">
        {loading ? (
          Array.from({ length: 3 }).map((_, index) => (
            <div
              key={index}
              className="mb-6 p-4 rounded-lg bg-white shadow-md"
            ></div>
          ))
        ) : data.length > 0 ? (
          data.map((newsItem, index) => (
            <Tile key={index} currentemail={currentemail} newsItem={newsItem} />
          ))
        ) : (
          <p className="text-center text-gray-600">
            Sorry Nothing New : &#x28;
          </p>
        )}
      </div>
      <RegisterBlock />
    </div>
  );
}

export default Front;
