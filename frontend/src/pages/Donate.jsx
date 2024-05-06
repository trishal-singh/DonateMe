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
      <div className="grid gap-6 grid-cols-4 ml-10">
        {funds.map((fund) => {
          return (
            <DonateCard
              title={fund.title}
              image={fund.image}
              raised={fund.current}
              target={fund.target}
            />
          );
        })}
      </div>
      <ToastContainer />
    </>
  );
};

export default Donate;
