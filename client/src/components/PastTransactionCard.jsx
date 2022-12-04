import React from "react";

const PastTransactionCard = ({
  stationName,
  stationLocation,
  timestamp,
  batteries,
  eth,
  power,
}) => (
  <div className="flex flex-col">
    {/* <h3 className="text-gradient text-xxl mb-4">Swap History</h3> */}
    <div className="flex justify-between mt-6 feature-card rounded-[18px] px-6 items-center py-4">
      <div className="flex flex-col">
        <p className="text-white font-bold text-lg font-poppins">{stationLocation}</p>
        <p className="text-dimWhite font-semibold text-sm font-poppins">On {timestamp}</p>
        <p className="text-dimWhite font-semibold text-sm font-poppins">Batteries swapped: {batteries}</p>
      </div>

      <div className="flex flex-col">
      <p className="text-white font-bold text-lg font-poppins">{stationName}</p>
        <p className="text-dimWhite font-semibold text-sm font-poppins">{eth} ETH paid</p>
        <p className="text-dimWhite font-semibold text-sm font-poppins">{power} delivered</p>
      </div>
    </div>
  </div>
);

export default PastTransactionCard;