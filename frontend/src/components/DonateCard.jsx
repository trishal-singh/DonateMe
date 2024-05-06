import React from "react";

const DonateCard = ({ title, image, target }) => {
  return (
    <div className="border-2 border-lime-500 flex flex-col h-60 w-80 justify-evenly items-center rounded-2xl">
      <img src={image} height="100px" width="150px" />
      <div>{title}</div>
      <div>Target : {target}</div>
      <div>Button</div>
    </div>
  );
};

export default DonateCard;
