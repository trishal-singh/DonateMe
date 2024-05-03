import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import axiosClient from "../services/axiosClient";
import Cookies from "js-cookie";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router";
const Profile = () => {
  const [name, setName] = useState("");
  const [balance, setBalance] = useState(0);
  const [amount, setAmount] = useState(0);
  const navigate = useNavigate();
  const updateAmount = async () => {
    try {
      const token = Cookies.get("token");
      const result = await axiosClient.patch(
        "/user/addAmount",
        { amount: amount },
        {
          headers: { authorization: `Bearer ${token}` },
        }
      );
      toast.success(result.data.message, { position: "top-center" });
      setBalance(result.data.balance);
      setAmount(0);
    } catch (e) {
      toast.error(e.response.data.message, { position: "top-center" });
    }
  };
  const fetchUser = async () => {
    const token = Cookies.get("token");
    try {
      const profile = await axiosClient.get("/user/", {
        headers: { authorization: `Bearer ${token}` },
      });
      setName(profile.data.username);
      setBalance(profile.data.balance);
    } catch (e) {
      navigate("/login");
    }
  };
  useEffect(() => {
    fetchUser();
  }, []);
  return (
    <>
      <Navbar />
      <div className="flex justify-center items-center w-auto h-screen ">
        <div className="border-2 border-lime-500 rounded-2xl h-1/2 w-1/2 flex flex-col justify-evenly items-center">
          <div className="text-lime-500 font-mono font-bold">Name : {name}</div>
          <div className="text-lime-500 font-mono font-bold">
            Balance : {balance}
          </div>
          <div className="flex justify-evenly">
            <input
              type="text"
              inputMode="numeric"
              placeholder="Enter a number"
              value={amount}
              className="border-2 border-lime-500 rounded w-42 h-10 focus:border-lime-700 focus:outline-none text-lime-500"
              onChange={(e) => setAmount(e.target.value)}
            />
            <button
              className="border-2 border-lime-500 rounded w-36 h-10  font-bold font-mono hover:bg-lime-500 hover:text-white ml-6"
              onClick={updateAmount}
            >
              ADD BALANCE
            </button>
          </div>
        </div>
      </div>
      <ToastContainer />
    </>
  );
};

export default Profile;
