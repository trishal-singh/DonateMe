import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axiosClient from "../services/axiosClient";
import { ToastContainer, toast } from "react-toastify";
const DonationPage = () => {
  const { id } = useParams();
  const [fund, setFund] = useState({});
  const getFundById = async () => {
    try {
      const result = await axiosClient.get(`/fund/${id}`);
      setFund(result.data.data);
      console.log(fund);
    } catch (e) {
      toast.error(e.response.data.message, { position: "top-center" });
    }
  };
  useEffect(() => {
    getFundById();
  }, []);
  return (
    <>
      <div>{fund.title}</div>
      <ToastContainer />
    </>
  );
};

export default DonationPage;
