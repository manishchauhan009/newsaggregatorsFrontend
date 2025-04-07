import { useState } from "react";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import "./style.scss";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

function Newsdata({ currentemail }) {
  const [Dept, setDept] = useState("General");
  const [Title, setTitle] = useState("");
  const [Content, setContent] = useState("");
  const [imgUrl, setImgUrl] = useState(null);
  const navigate = useNavigate();

  const formSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("Group", Dept);
    formData.append("Owner", currentemail);
    formData.append("Title", Title);
    formData.append("Content", Content);
    formData.append("imgUrl", imgUrl);
    formData.append("Like", 0);
    formData.append("Reported", 0);
    formData.append("Approved", false);

    try {
      const NEWS_URL = process.env.REACT_APP_NEWS_URL;
      const token = localStorage.getItem("token");

      await axios.post(`${NEWS_URL}/createNews`, formData, {
        headers: { Authorization: `Bearer ${token}` },
      });

      toast.success(`News Request Successfully Sent to ${Dept}`);
      navigate("/content");
    } catch (error) {
      console.error(error);
      toast.error("Error submitting news request");
    }
  };

  return (
    <div id="me" className="news-data-container">
      <Toaster />
      <h1>
        <button title="Go Back" className="back-bt" onClick={() => navigate("/content")}>
          &#129128;
        </button>
        You are Writing an Article
      </h1>

      <form onSubmit={formSubmit} className="news-form">
        <label>
          Title
          <input
            type="text"
            required
            value={Title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Article Title"
            className="title-input"
          />
        </label>

        <label>
          Category
          <select
            value={Dept}
            onChange={(e) => setDept(e.target.value)}
            className="category-select"
          >
            <option value="General">General</option>
            <option value="Training and Placement">Training and Placement Cell</option>
            <option value="Armed Forces and Motivation">Armed Forces and Motivation Cell</option>
            <option value="Career Development">Career Development Cell</option>
            <option value="International Relations">International Relation Cell</option>
            <option value="Admission">Admission Cell</option>
            <option value="Alumni">Alumni Cell</option>
            <option value="Research and Development">Research and Development Cell</option>
            <option value="System Support">System Support Cell</option>
            <option value="Technical Event">Technical Event Cell</option>
            <option value="Social Responsive">Social Responsive Cell</option>
            <option value="Entrepreneurship Development">Entrepreneurship Development Cell</option>
            <option value="Women Empowerment">Women Empowerment Cell</option>
          </select>
          <p className="selected-category">Selected Category: {Dept}</p>
        </label>

        <label>
          Content
          <ReactQuill
            theme="snow"
            value={Content}
            onChange={setContent}
            className="h-[30vh] mb-10"
          />
        </label>

        <label>
          Media
          <input
            type="file"
            required
            onChange={(e) => setImgUrl(e.target.files[0])}
            className="media-input"
          />
        </label>

        <button type="submit" className="submit-bt">
          Submit Request
        </button>
      </form>
    </div>
  );
}

export default Newsdata;
