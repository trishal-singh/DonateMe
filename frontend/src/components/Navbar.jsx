import React from "react";
import { FaUser } from "react-icons/fa";
import { useNavigate } from "react-router";
const Navbar = () => {
  const navigate = useNavigate();
  return (
    <div className="flex items-center justify-between h-24  ">
      <div
        className="ml-5  font-mono font-bold text-5xl text-lime-500 hover:cursor-pointer"
        onClick={() => navigate("/")}
      >
        DonateMe
      </div>
      <div className="flex items-center justify-evenly w-1/2 text-xl text-lime-500 ">
        <div
          onClick={() => navigate("/donate")}
          className="hover:cursor-pointer hover:scale-125 hover:font-bold"
        >
          Donate
        </div>
        <div
          onClick={() => navigate("/raise")}
          className="hover:cursor-pointer hover:scale-125 hover:font-bold"
        >
          Raise
        </div>
        <div
          onClick={() => navigate("/funds")}
          className="hover:cursor-pointer hover:scale-125 hover:font-bold"
        >
          My Funds
        </div>
        <div
          onClick={() => navigate("/donations")}
          className="hover:cursor-pointer hover:scale-125 hover:font-bold"
        >
          My Donations
        </div>
      </div>
      <div
        className="mr-5  text-2xl text-lime-500 hover:cursor-pointer hover:scale-125"
        onClick={() => navigate("/profile")}
      >
        <FaUser />
      </div>
    </div>
  );
};

export default Navbar;
