import React from "react";
import { RxCross2 } from "react-icons/rx";

const Offers = () => {
  return (
    <div className="p-6 relative">
      <div className="border rounded-2xl shadow-lg bg-amber-400">
        <div className=" bg-amber-300/60 w-10 h-10 p-2 rounded-full absolute right-2 top-2">
          <RxCross2 color="orange" size={26}/>
        </div>
        <div>
          <h1>Hurry Offers</h1>
          <p>Offer code</p>
          <p>Use the coupon get 25% discount</p>
        </div>
        <button className="">Got It</button>
      </div>
    </div>
  );
};

export default Offers;
