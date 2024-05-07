import React from "react";
import Navbar from "../components/Navbar";
import { useNavigate } from "react-router";
const Home = () => {
  const navigate = useNavigate();
  return (
    <>
      <Navbar />
      <div className="flex flex-col w-auto h-screen items-center  justify-evenly ">
        <p className="font-semibold font-mono text-2xl text-lime-500 text-center">
          Welcome to DonateMe.
          <br /> We are a website which allow you to make and raise donations.
          <br /> Click the below buttons according to your needs.
        </p>
        <div className="flex">
          <button
            onClick={() => navigate("/donate")}
            className="border-2 border-lime-500 rounded w-36 h-10  font-bold font-mono hover:bg-lime-500 hover:text-white"
          >
            DONATE
          </button>
          <button
            onClick={() => navigate("/raise")}
            className="ml-20 border-2 border-lime-500 rounded w-36 h-10  font-bold font-mono hover:bg-lime-500 hover:text-white"
          >
            RAISE
          </button>
        </div>
      </div>
    </>
  );
};

export default Home;
