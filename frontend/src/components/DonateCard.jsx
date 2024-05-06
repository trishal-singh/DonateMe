import React from "react";

const DonateCard = ({ title, image, target, raised }) => {
  return (
    <div className="border-2 border-lime-500 flex flex-col h-72 w-80 justify-evenly items-center rounded-2xl">
      <img src={image} className="h-32 w-44" />
      <div className="font-mono font-bold">{title}</div>
      <div className="font-mono italic">
        Raised : {raised}/{target}
      </div>
      <button className="border-2 border-lime-500 rounded w-36 h-10  font-bold font-mono hover:bg-lime-500 hover:text-white">
        {" "}
        Know More
      </button>
    </div>
  );
};

export default DonateCard;
