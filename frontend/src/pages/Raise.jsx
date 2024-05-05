import React, { useState } from "react";
import Navbar from "../components/Navbar";
import { toast, ToastContainer } from "react-toastify";
import axiosClient from "../services/axiosClient";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
const Raise = () => {
  const [title, setTitle] = useState("");
  const [image, setImage] = useState("");
  const [description, setDescription] = useState("");
  const [target, setTarget] = useState(0);
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (target <= 0) {
      toast.error("The amount should be greater than 0", {
        position: "top-center",
      });
      return;
    }

    const body = {
      title: title,
      image: image,
      description: description,
      target: target,
    };
    try {
      const token = Cookies.get("token");
      const result = await axiosClient.post("/fund/add/", body, {
        headers: { authorization: `Bearer ${token}` },
      });
      console.log(result);
      toast.success(result.data.message, { position: "top-center" });
      setTitle("");
      setImage("");
      setDescription("");
      setTarget(0);
    } catch (e) {
      toast.error(e.response.data.message, { position: "top-center" });
      if (e.response.data.message === "Token Expired") {
        setTimeout(() => navigate("/login"), 2000);
      }
    }
  };
  return (
    <>
      <Navbar />
      <div className="flex justify-center items-center w-auto h-screen ">
        <form
          onSubmit={handleSubmit}
          className="border-2 border-lime-500 rounded-2xl h-3/4 w-1/2 flex flex-col justify-evenly items-center"
        >
          <input
            required
            type="text"
            placeholder="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="border-2 border-lime-500 rounded w-96 h-10 focus:border-lime-700 focus:outline-none text-lime-500"
          />
          <input
            required
            type="text"
            placeholder="Image URL"
            value={image}
            onChange={(e) => setImage(e.target.value)}
            className="border-2 border-lime-500 rounded w-96 h-10 focus:border-lime-700 focus:outline-none text-lime-500"
          />
          <input
            required
            type="text"
            inputMode="numeric"
            placeholder="The Amount You Want To Raise"
            value={target}
            onChange={(e) => setTarget(e.target.value)}
            min="1"
            className="border-2 border-lime-500 rounded w-96 h-10 focus:border-lime-700 focus:outline-none text-lime-500"
          />
          <textarea
            required
            placeholder="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="border-2 border-lime-500 rounded w-96 h-48 focus:border-lime-700 focus:outline-none text-lime-500"
          />
          <button
            type="submit"
            className="border-2 border-lime-500 rounded w-36 h-10  font-bold font-mono hover:bg-lime-500 hover:text-white"
          >
            RAISE
          </button>
        </form>

        <ToastContainer />
      </div>
    </>
  );
};

export default Raise;
