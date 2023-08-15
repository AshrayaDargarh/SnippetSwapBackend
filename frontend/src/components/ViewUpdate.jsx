import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import CopyIcon from "../assets/icons/CopyIcon";
import PasteIcon from "../assets/icons/PasteIcon";
import QRCode from "qrcode.react";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const initialValue = {
  title: "",
  data: "",
  daysToExpire: "",
};

const ViewUpdate = () => {
  const { viewId } = useParams();
  const [snippet, setSnippet] = useState(initialValue);
  const [copy, setCopy] = useState(false);
  const [time, setTime] = useState();
  const navigate = useNavigate();
  const currentUrl = window.location.host;
  async function getSnippet() {
    try {
      const token = localStorage.getItem("token");
      const res = await axios.get(`/view/${viewId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setSnippet(res.data);
      const inputDate = new Date(res.data.intendedExpireAt);
      const currentDate = new Date();
      const timeDifferenceMillis = inputDate - currentDate;
      const daysDifference = Math.floor(
        timeDifferenceMillis / (60 * 60 * 1000)
      );
      setTime(daysDifference);
    } catch (error) {
      navigate('/unauthorized')

      console.log(error.response);
    }
  }
  useEffect(() => {
    getSnippet();
  }, []);
  function handleChange(e) {
    setSnippet({
      ...snippet,
      [e.target.name]: e.target.value,
    });
  }

  async function handleUpdate(e) {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      const res = await axios.patch(
        `/view/${viewId}`,
        snippet,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      if(res.data)
      {
        toast.success('Snippet updated successfully.');
      }
    } catch (error) {
      console.log(error.response);
    }
  }
  async function handleDelete(e) {
    e.preventDefault();
    try {
      if (window.confirm("Do you really want to delete this?")) {
        const token = localStorage.getItem("token");
        const res = await axios.delete(`/view/${viewId}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        console.log(res);
        navigate("/view");
      }
    } catch (error) {
      console.log('Unauthorized',error.response)
        navigate('/unauthorized')
    }
  }
  function handleCopy() {
    navigator.clipboard.writeText(`http://${currentUrl}/public/${viewId}`);
    setCopy(true);
    setTimeout(() => {
      setCopy(false);
    }, 1000);
  }
  return (
    <div className="bg-inherit pb-10  overflow-hidden">
        <form onSubmit={handleUpdate}>
          <div className="flex justify-center  flex-wrap">
            <div className="m-5">
              <label htmlFor="data" className="block pb-3">
                <span className="sm:text-2xl text-lg font-bold">
                  Paste your code here:
                </span>
              </label>
              <textarea
                name="data"
                value={snippet.data}
                className="bg-slate-900 p-2 border border-slate-600 rounded-md lg:w-[60rem] md:w-[45rem] sm:w-[35rem]"
                id="data"
                rows="30"
                cols="30"
                onChange={handleChange}
              ></textarea>
            </div>

            <div className="mt-5">
              <div className="mt-5 md:mr-20">
                <label htmlFor="title" className="block text-sm">
                  Enter the snippet title:
                </label>
                <input
                  type="text"
                  value={snippet.title}
                  placeholder="Enter title"
                  name="title"
                  id="title"
                  className="bg-slate-900 border sm:w-72 border-slate-600 px-2 mt-2 py-1 rounded-md"
                  onChange={handleChange}
                />
              </div>
              <div className="mt-5 mr-20">
                <label htmlFor="daysToExpire" className="block text-sm">
                  Expire after: {time} Hours
                </label>
                <input
                  type="number"
                  value={snippet.daysToExpire}
                  min="1"
                  onKeyPress={(event) => {
                    if (!/[0-9]/.test(event.key)) {
                      event.preventDefault();
                    }
                  }}
                  placeholder="Enter in days"
                  name="daysToExpire"
                  id="daysToExpire"
                  className="bg-slate-900 border sm:w-72 border-slate-600 px-2 mt-2 py-1 rounded-md "
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="mt-5 ">
                <label htmlFor="share" className="block text-sm">
                  Share the link:
                </label>
                <div className="flex ">
                  <input
                    type="text"
                    value={`http://${currentUrl}/public/${viewId}`}
                    readOnly
                    name="share"
                    id="share"
                    className="bg-slate-900 border sm:w-72 border-slate-600 p-2 mt-2 py-1 rounded-md"
                    required
                  />
                  {copy ? (
                    <button
                      title="Copied"
                      className="pl-2 pt-2"
                      type="button"
                      onClick={() =>
                        navigator.clipboard.writeText(
                          `http://${currentUrl}/public/${viewId}`
                        )
                      }
                    >
                      <PasteIcon />
                    </button>
                  ) : (
                    <button className="pl-2 pt-2" type="button" onClick={handleCopy}>
                      <CopyIcon />
                    </button>
                  )}
                </div>
              </div>
              <div className="flex w-64 h-52  mt-7 ml-4">
                <QRCode value={`http://${currentUrl}/public/${viewId}`} size={200}  />
                </div>
              <div className="flex sm:flex-row flex-col">
              <button className=" bg-slate-800 shadow-md shadow-slate-700 p-2 w-40 rounded-md mt-3 sm:mx-2">
                Update Snippet
              </button>
              <button
                className=" bg-slate-800 shadow-md shadow-slate-700 p-2 w-40 rounded-md mt-3"
                type="button"
                onClick={handleDelete}
              >
                Delete Snippet
              </button>

              </div>
            </div>
          </div>
        </form>
        <ToastContainer
        position="top-center"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
      </div>
  );
};

export default ViewUpdate;
