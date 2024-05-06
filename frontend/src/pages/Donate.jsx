import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import DonateCard from "../components/DonateCard";
import axiosClient from "../services/axiosClient";
import { toast, ToastContainer } from "react-toastify";
const Donate = () => {
  const [funds, setFunds] = useState([]);
  const getFunds = async () => {
    try {
      const result = await axiosClient.get("/fund");
      setFunds(result.data.data);
      console.log(result.data.data);
      console.log(funds);
    } catch (e) {
      toast.error(e.response.data.message, { position: "top-center" });
    }
  };
  useEffect(() => {
    getFunds();
  }, []);
  return (
    <>
      <Navbar />
      {funds.map((fund) => (
        <div>{fund.title}</div>
      ))}
      <ToastContainer />
    </>
  );
};

export default Donate;
