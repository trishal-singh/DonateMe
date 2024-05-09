import React from "react";
import { useParams } from "react-router-dom";
const DonationPage = () => {
  const { id } = useParams();
  return <div>DonationPage {id}</div>;
};

export default DonationPage;
