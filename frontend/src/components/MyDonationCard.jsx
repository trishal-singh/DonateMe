import React from "react";

const MyDonationCard = ({ title, image, donation_id, amount }) => {
  return (
    <div className="border-2 border-lime-500 flex flex-col h-72 w-80 justify-evenly items-center rounded-2xl">
      <img src={image} className="h-32 w-44" />
      <div className="font-mono font-bold">{title}</div>
      <div className="font-mono italic">ID : {donation_id}</div>
      <div className="font-mono font-bold text-xl">Amount : {amount}</div>
    </div>
  );
};

export default MyDonationCard;
