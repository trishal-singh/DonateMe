import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import axiosClient from "../services/axiosClient";
import { toast, ToastContainer } from "react-toastify";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import FundCard from "../components/FundCard";
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
      <div className="grid gap-6 grid-cols-4 ml-10">
        {funds.map((fund) => {
          return (
            <FundCard
              title={fund.title}
              image={fund.image}
              raised={fund.current}
              target={fund.target}
              id={fund._id}
            />
          );
        })}
      </div>
      <ToastContainer />
    </>
  );
};

export default Funds;
