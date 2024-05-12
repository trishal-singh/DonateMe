import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axiosClient from "../services/axiosClient";
import { ToastContainer, toast } from "react-toastify";
import Navbar from "../components/Navbar";
const DonationPage = () => {
  const { id } = useParams();
  const [fund, setFund] = useState({});
  const [amount, setAmount] = useState(0);
  const [owner, setOwner] = useState("");
  const getFundById = async () => {
    try {
      const result = await axiosClient.get(`/fund/${id}`);
      setFund((prev) => result.data.data);
      const owner = await axiosClient.post("/user/owner", {
        user_id: fund?.owner,
      });
      console.log(owner);
      //setOwner(owner);
    } catch (e) {
      toast.error(e.response.data.message, { position: "top-center" });
    }
  };
  useEffect(() => {
    getFundById();
  }, []);
  return (
    <div className="h-screen">
      <Navbar />
      <div className="flex flex-col  justify-evenly items-center border h-4/5 ">
        <img src={fund?.image} className="h-48 w-64" />
        <div className="font-bold font-mono ">{fund?.title}</div>
        <p className="w-2/5">{fund?.description}</p>
        <div className="flex justify-between  w-2/5">
          <div className="font-mono italic">Owner : {fund?.owner}</div>
          <div className="font-mono italic">
            Raised : {fund?.current}/{fund?.target}
          </div>
        </div>
        <input
          type="text"
          inputMode="numeric"
          placeholder="Enter a number"
          value={amount}
          className="border-2 border-lime-500 rounded w-2/5 h-10 focus:border-lime-700 focus:outline-none text-lime-500"
          onChange={(e) => setAmount(e.target.value)}
        />
        <button className="border-2 border-lime-500 rounded w-44 h-10  font-bold font-mono hover:bg-lime-500 hover:text-white">
          {" "}
          DONATE
        </button>
      </div>
      <ToastContainer />
    </div>
  );
};

export default DonationPage;
