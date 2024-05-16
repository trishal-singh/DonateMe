import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import axiosClient from "../services/axiosClient";
import { toast, ToastContainer } from "react-toastify";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import MyDonationCard from "../components/MyDonationCard";
const Donations = () => {
  const [donations, setDonations] = useState([]);
  const navigate = useNavigate();
  const getDonations = async (req, res) => {
    try {
      const token = Cookies.get("token");

      const result = await axiosClient.get("/donate/", {
        headers: { authorization: `Bearer ${token}` },
      });

      setDonations(result.data.donations);
    } catch (e) {
      toast.error(e.response.data.message, { position: "top-center" });
      if (e.response.data.message === "Token Expired") {
        setTimeout(() => navigate("/login"), 2000);
      }
    }
  };
  useEffect(() => {
    getDonations();
  }, []);
  return (
    <>
      <Navbar />
      <div className="grid gap-6 grid-cols-4 ml-10">
        {donations.map((donation) => (
          <MyDonationCard
            amount={donation.amount}
            title={donation.fund_id.title}
            image={donation.fund_id.image}
            donation_id={donation._id}
          />
        ))}
      </div>
      <ToastContainer />
    </>
  );
};

export default Donations;
