import React, { useState } from "react";
import Navbar from "../components/Navbar";
const Profile = () => {
  const [name, setName] = useState("");
  const [balance, setBalance] = useState(0);
  const [amount, setAmount] = useState(0);
  const updateAmount = async () => {
    console.log(amount);
  };
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
    </>
  );
};

export default Profile;
