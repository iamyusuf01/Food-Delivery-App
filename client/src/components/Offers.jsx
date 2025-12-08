import React, { useEffect, useState } from "react";
import { RxCross2 } from "react-icons/rx";
import { BgImages } from "../assets/assets";

const Offers = () => {
  const [visible, setVisible ] = useState(true)

  const handleClose = () => {
    setVisible(false)
  }

  useEffect(() => {
    const timer = setTimeout(() => {
      setVisible(false)
    }, 4000);

    return () => clearTimeout(timer)
  })

  if (!visible) return null;
  return (
    
    <div className="p-6 relative">
      <div className="rounded-2xl shadow-lg bg-amber-500 h-76 w-full">
        <button className=" bg-yellow-300 w-10 h-10 p-2 rounded-full absolute right-2 top-6" onClick={handleClose}>
          <RxCross2 color="orange" size={26} />
        </button>
        <div className="absolute w-full pt-4">
          <img src={BgImages.Element} className="h-42" />
        </div>
        <div className="text-center pt-14 m-4 text-white">
          <h1 className="font-medium text-4xl">Hurry Offers</h1>
          <p className="pt-10 text-2xl font-medium">Offer code</p>
          <p className="pt-6">Use the coupon get 25% discount</p>
          <button className=" uppercase  mt-4 font-medium text-xl border-2 rounded-xl w-full h-12 text-center ">Got It</button>
        </div>
      </div>
    </div>
  );
};

export default Offers;
