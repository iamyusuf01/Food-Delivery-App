import axios from "axios";
import React, { useEffect, useState } from "react";
import { BsStarFill } from "react-icons/bs";
import { CiLocationOn } from "react-icons/ci";
import { FaChevronLeft, FaRegStar } from "react-icons/fa6";
import { MdOutlineAccessTime } from "react-icons/md";
import { TbTruckDelivery } from "react-icons/tb";
import { Link, useNavigate, useParams } from "react-router";
import { toast } from "react-toastify";

const ChefFoodDetails = () => {
  const navigate = useNavigate();
  const { itemId } = useParams();
  const [sellerMenu, setSellerMenu] = useState([]);

  const fetchSellerFoodDetails = async () => {
    try {
      const { data } = await axios.get(
        `http://localhost:4000/api/menu/seller/${itemId}`,
        { withCredentials: true },
      );
      if (data.success) {
        setSellerMenu(data.menu);
        // console.log(data);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };
  useEffect(() => {
    fetchSellerFoodDetails();
  }, []);
  return (
    <div className=" p-6 overflow-hidden bg-white">
      <div className=" flex justify-between items-center">
        <div className="flex items-center gap-4 ">
          <Link
            to={"/admin"}
            className="w-10 h-10 rounded-full p-3 bg-gray-200"
          >
            <FaChevronLeft />
          </Link>
          <h2 className="font-medium">Details</h2>
        </div>
        <button className="uppercase text-orange-500">Edit</button>
      </div>
      <div className="my-4">
        <img
          src={sellerMenu?.image}
          className=" bg-gray-300 h-32 w-full rounded-xl object-cover"
        />
        <div className="py-4" id="_id">
          <div className="flex justify-between item-cneter py-1">
            <p className="pt-2 text-sm font-medium">{sellerMenu?.name}</p>
            <p className="font-medium"> ${sellerMenu?.price}</p>
          </div>

          <div className="flex justify-between text-center items-center gap-2">
            <p className="text-sm text-gray-500 flex items-center gap-2">
              <CiLocationOn />
              {sellerMenu?.restaurant?.address}
            </p>
            <div className="flex text-center item-center gap-2 ">
              <BsStarFill className="text-orange-500 my-1" size={14} />
              <p>
                {" "}
                <span className="font-medium text-orange-500">
                  {sellerMenu?.restaurant?.rating}
                </span>{" "}
                <span className="text-gray-500">(10 Reviews)</span>{" "}
              </p>
            </div>
          </div>

          <div className="flex items-center py-1 gap-2">
            {/* <p>{sellerMenu?.description}</p> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChefFoodDetails;
