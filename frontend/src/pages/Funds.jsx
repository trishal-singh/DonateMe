import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import axiosClient from "../services/axiosClient";
import { toast, ToastContainer } from "react-toastify";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
const Funds = () => {
  const [funds, setFunds] = useState([]);
  const navigate = useNavigate();
  const myFunds = async () => {
    try {
      const token = Cookies.get("token");

      const result = await axiosClient.get("/fund/myfunds/", {
        headers: { authorization: `Bearer ${token}` },
      });

      setFunds(result.data.data);
    } catch (e) {
      toast.error(e.response.data.message, { position: "top-center" });
      if (e.response.data.message === "Token Expired") {
        setTimeout(() => navigate("/login"), 2000);
      }
    }
  };
  useEffect(() => {
    myFunds();
    console.log(funds);
  }, []);
  return (
    <>
      <Navbar />
      <div>My Funds</div>
      {funds.map((fund) => (
        <div>{fund.title}</div>
      ))}
      <ToastContainer />
    </>
  );
};

export default Funds;
