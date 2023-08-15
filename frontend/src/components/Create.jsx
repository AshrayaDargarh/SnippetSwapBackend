import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../context/AuthContext";
const Create = () => {
  const [snippet, setSnippet] = useState({});
  const navigate = useNavigate();
  const { login } = useAuth();

  useEffect(() => {
    const token = localStorage.getItem("token");
    // console.log('Inside Create',token)
    if (!token) {
      navigate("/login");
    }
  }, []);

  function handleChange(e) {
    setSnippet({
      ...snippet,
      [e.target.name]: e.target.value,
    });
  }
  async function handleSubmit(e) {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      const res = await axios.post("/view", snippet,{withCredentials:true}, {
        headers: { Authorization: `Bearer ${token}` },
      });
      console.log('Res Data=',res.data)
      console.log('Snippet Data=',snippet)
      if (res) {
        window.alert("Snippet Created Successfully.");
        navigate("/view");
      }
    } catch (err) {
      console.log(err.response);
      navigate('/unauthorized')

    }
  }
  return (
    <div className="mt-10 md:pb-24 pb-10">
      {/* import { Link,useNavigate } from 'react-router-dom'; */}

      <form onSubmit={handleSubmit} >
        <div className="flex justify-center flex-wrap ">
          <div className="m-5">
            <label htmlFor="data" className="block pb-3">
              <span className="sm:text-2xl text-lg font-bold">
                Paste your code here:
              </span>
            </label>
            <textarea
              name="data"
              className="bg-slate-900 border p-2 border-slate-600 rounded-md lg:w-[60rem] md:w-[45rem] sm:w-[35rem]"
              id="data"
              rows="28"
              cols="30"
              onChange={handleChange}
              required
            ></textarea>
          </div>

          <div className="ml-20">
            <div className="mt-5 mr-20">
              <label htmlFor="title" className="block text-sm">
                Enter the snippet title:
              </label>
              <input
                type="text"
                placeholder="Enter title"
                name="title"
                id="title"
                className="bg-slate-900 border sm:w-72 border-slate-600 px-2 mt-2 py-1 rounded-md"
                onChange={handleChange}
                required
              />
            </div>
            <div className="mt-5 sm:mr-20">
              <label htmlFor="daysToExpire" className="block text-sm">
                Expire after days:
              </label>
              <input
                type="number"
                min="1"
                placeholder="Expires after (days)"
                onKeyPress={(event) => {
                  if (!/[0-9]/.test(event.key)) {
                    event.preventDefault();
                  }
                }}
                name="daysToExpire"
                id="daysToExpire"
                className="bg-slate-900 border sm:w-72 border-slate-600 px-2 mt-2 py-1 rounded-md "
                onChange={handleChange}
                required
              />
            </div>
            <button className="bg-slate-800 shadow-md shadow-slate-700 p-2 rounded-md mt-3">
              Publish Snippet
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Create;
