import React from "react";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import { ToastContainer, toast } from "react-toastify";
import axiosClient from "../services/axiosClient";
const FundCard = ({ title, image, target, raised, id }) => {
  const navigate = useNavigate();

  const deleteFund = async (id) => {
    try {
      const token = Cookies.get("token");

      const result = await axiosClient.delete(`/fund/${id}`, {
        headers: { authorization: `Bearer ${token}` },
      });

      window.location.reload();
    } catch (e) {
      console.log(e);
      toast.error(e.response.data.message, { position: "top-center" });
      if (e.response.data.message === "Token Expired") {
        setTimeout(() => navigate("/login"), 2000);
      }
    }
  };
  return (
    <div className="border-2 border-lime-500 flex flex-col h-72 w-80 justify-evenly items-center rounded-2xl">
      <img src={image} className="h-32 w-44" />
      <div className="font-mono font-bold">{title}</div>
      <div className="font-mono italic">
        Raised : {raised}/{target}
      </div>
      <button
        onClick={() => deleteFund(id)}
        className="border-2 border-lime-500 rounded w-36 h-10  font-bold font-mono hover:bg-lime-500 hover:text-white"
      >
        {" "}
        DELETE
      </button>
    </div>
  );
};

export default FundCard;
