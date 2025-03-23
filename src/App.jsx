import React, { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Front from "./components/Front";
import Signin from "./components/Signin";
import Signup from "./components/Signup";
import Content from "./components/Content";
import Newsdata from "./components/Newsdata";
import Header from "./components/Header";
import Footer from "./components/Footer";
import MainAdmin from "./components/MainAdmin";
import CategoryContent from "./components/CategoryContent";
import paper from "./assets/paper1.png";
import DetailedView from "./components/DetailedView";
function App() {
  const [userauth, setUserAuth] = useState(false);
  const [currentuser, setCurrentUser] = useState("");
  const [currentemail, setCurrentEmail] = useState("");
  const [data, setData] = useState([]);


  return (
    <div className="App">
      {/* <Test/> */}
      <BrowserRouter>
        <Header userauth={userauth} setCurrentEmail={setCurrentEmail} setUserAuth={setUserAuth}/>
        <Routes>
          <Route path="/" element={<Front setUserAuth={setUserAuth} setCurrentEmail={setCurrentEmail} currentemail={currentemail}  />} />
          <Route
            path="/signin"
            element={<Signin setUserAuth={setUserAuth} setCurrentEmail={setCurrentEmail} setCurrentUser={setCurrentUser} />}
          />
          <Route path="/signup" element={<Signup />} />
          <Route path="/admin" element={<MainAdmin />} />
          <Route path="/content" element={<Content currentemail={currentemail} currentuser={currentuser} userauth={userauth}/>} />
          <Route path="/newsdata" element={<Newsdata currentemail={currentemail} />} />
          <Route path="/content/:category" element={<CategoryContent userauth={userauth} />} />
          <Route path="/news" element={<DetailedView data={data} />} />
        </Routes>
        <Footer />
        <div className="paper-texture"><img src={paper} alt="Paper texture" /></div>
      </BrowserRouter>
    </div>
  );
}

export default App;
