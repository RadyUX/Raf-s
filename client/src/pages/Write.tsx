import React, { useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { useLocation } from 'react-router-dom';

function Write() {
    const state = useLocation().state;
    const [value, setValue] = useState(state?.content || "");
    const [title, setTitle] = useState(state?.title || "");
    const [cat, setCat] = useState(state?.cat || "");
  return (
    (
        <div className="flex  md:flex-col lg:flex-row p-4 space-y-4 mx-[400px] justify-around lg:space-y-0 lg:space-x-4">
          <div className="flex-1 bg-white p-4 rounded-lg shadow-md text-black">
            <input
              type="text"
              placeholder="Title"
              className="w-full p-2 mb-4 border border-gray-300 rounded"
              onChange={(e) => setTitle(e.target.value)}
            />
            <div className="editorContainer">
              <ReactQuill
                className="editor text-black"
                theme="snow"
                value={value}
                onChange={setValue}
              />
            </div>
          </div>
          <div className="w-full text-black lg:w-1/3 bg-white p-4 rounded-lg shadow-md">
            <div className="mb-4">
              <h1 className="text-xl font-bold mb-2">Publish</h1>
              <span className="block mb-2">
                <b>Status: </b> Draft
              </span>
              <span className="block mb-4">
                <b>Visibility: </b> Public
              </span>
              <label className="file mb-4 block cursor-pointer text-blue-500" htmlFor="file">
                Upload Image
              </label>
              <div className="buttons flex space-x-2">
                <button className="flex-1 py-2 px-4 bg-gray-300 rounded hover:bg-gray-400">Save as a draft</button>
                <button className="flex-1 py-2 px-4 bg-blue-500 text-white rounded hover:bg-blue-600">Publish</button>
              </div>
            </div>
            <div className="item">
              <h1 className="text-xl font-bold mb-2">Category</h1>
              <div className="cat flex flex-col space-y-2">
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