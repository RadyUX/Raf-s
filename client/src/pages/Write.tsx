import React, { useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { useLocation } from 'react-router-dom';
import axios from "axios";
import { useNavigate } from "react-router-dom";
import moment from "moment";
 
function Write() {
    const state = useLocation().state;
    const [value, setValue] = useState(state?.content || "");
    const [title, setTitle] = useState(state?.title || "");
    const [file, setFile] = useState(null);
    const [cat, setCat] = useState(state?.cat || "");


    const handleClick = async (e) => {
      e.preventDefault();
      const imgUrl = await upload();
  
      try {
        state
          ? await axios.put(`/posts/${state.id}`, {
              title,
              content: value,
              cat,
              img: file ? imgUrl : "",
            })
          : await axios.post(`/posts/`, {
              title,
              desc: value,
              cat,
              img: file ? imgUrl : "",
              date: moment(Date.now()).format("YYYY-MM-DD HH:mm:ss"),
            });
            navigate("/")
      } catch (err) {
        console.log(err);
      }
    };
  return (
    (
        <div className="flex  md:flex-col lg:flex-row p-4 space-y-4 mx-[400px] justify-around lg:space-y-0 lg:space-x-4">
          <div className="flex-1 p-4 text-black bg-white rounded-lg shadow-md">
            <input
              type="text"
              placeholder="Title"
              className="w-full p-2 mb-4 border border-gray-300 rounded"
              onChange={(e) => setTitle(e.target.value)}
            />
            <div className="editorContainer">
              <ReactQuill
                className="text-black editor"
                theme="snow"
                value={value}
                onChange={setValue}
              />
            </div>
          </div>
          <div className="w-full p-4 text-black bg-white rounded-lg shadow-md lg:w-1/3">
            <div className="mb-4">
            <button onClick={handleClick}>Publish</button>
              <span className="block mb-2">
                <b>Status: </b> Draft
              </span>
              <span className="block mb-4">
                <b>Visibility: </b> Public
              </span>
              <label className="block mb-4 text-blue-500 cursor-pointer file" htmlFor="file">
                Upload Image
              </label>
              <div className="flex space-x-2 buttons">
                <button className="flex-1 px-4 py-2 bg-gray-300 rounded hover:bg-gray-400">Save as a draft</button>
                <button className="flex-1 px-4 py-2 text-white bg-blue-500 rounded hover:bg-blue-600">Publish</button>
              </div>
            </div>
            <div className="item">
              <h1 className="mb-2 text-xl font-bold">Category</h1>
              <div className="flex flex-col space-y-2 cat">
                <div className="flex items-center">
                  <input
                    type="radio"
                    checked={cat === "typescript"}
                    name="cat"
                    value="typescript"
                    id="typescript"
                    className="mr-2"
                    onChange={(e) => setCat(e.target.value)}
                  />
                  <label htmlFor="typescript">Typescript</label>
                </div>
                <div className="flex items-center">
                  <input
                    type="radio"
                    checked={cat === "framework"}
                    name="cat"
                    value="framework"
                    id="framework"
                    className="mr-2"
                    onChange={(e) => setCat(e.target.value)}
                  />
                  <label htmlFor="framework">Framework</label>
                </div>
                <div className="flex items-center">
                  <input
                    type="radio"
                    checked={cat === "technology"}
                    name="cat"
                    value="technology"
                    id="technology"
                    className="mr-2"
                    onChange={(e) => setCat(e.target.value)}
                  />
                  <label htmlFor="technology">Technology</label>
                </div>
                <div className="flex items-center">
                  <input
                    type="radio"
                    checked={cat === "cinema"}
                    name="cat"
                    value="cinema"
                    id="cinema"
                    className="mr-2"
                    onChange={(e) => setCat(e.target.value)}
                  />
                  <label htmlFor="cinema">Cinema</label>
                </div>
                <div className="flex items-center">
                  <input
                    type="radio"
                    checked={cat === "design"}
                    name="cat"
                    value="design"
                    id="design"
                    className="mr-2"
                    onChange={(e) => setCat(e.target.value)}
                  />
                  <label htmlFor="design">Design</label>
                </div>
                <div className="flex items-center">
                  <input
                    type="radio"
                    checked={cat === "food"}
                    name="cat"
                    value="food"
                    id="food"
                    className="mr-2"
                    onChange={(e) => setCat(e.target.value)}
                  />
                  <label htmlFor="food">Food</label>
                </div>
              </div>
            </div>
          </div>
        </div>
    )
  );
}
export default Write