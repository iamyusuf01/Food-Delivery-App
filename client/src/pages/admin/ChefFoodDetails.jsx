import React from "react";
import { FaChevronLeft } from "react-icons/fa6";
import { Link, useNavigate } from "react-router";

const ChefFoodDetails = () => {
  const navigate = useNavigate();
  return (
    <div>
      <div>
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
        <div className="py-4" id="_id">
          <div className="">
            <div>
              <img
                // src={menu?.image}
                className=" bg-gray-300 h-32 w-full rounded-xl"
              />
              <p className="mt-6 pl-6 border border-gray-300 rounded-full w-2/3   h-8">
                {/* {menu?.restaurant?.name} */}
              </p>
              {/* <p className="pt-2">{menu?.name}</p> */}
            </div>

            <div className="py-2">
              {/* <p className=""> {menu?.description}</p> */}
            </div>
          </div>
          <div className="flex items-center gap-20">
            <div className="flex items-center gap-2">
              <p>
                <FaRegStar size={20} color="orange" />
              </p>
              {/* <p>{menu?.restaurant?.rating}</p> */}
            </div>
            <div className="flex items-center gap-2">
              <p>
                <TbTruckDelivery size={22} color="orange" />
              </p>
              {/* <p>{menu?.restaurant?.location.city}</p> */}
            </div>
            <div className="flex items-center gap-2">
              <p>
                <MdOutlineAccessTime size={22} color="orange" />
              </p>
              {/* <p>{menu?.restaurant?.deliveryTime} Min</p> */}
            </div>
          </div>
        </div>
      </div>
      {/*Sizes  */}
      <div className="flex gap-6 items-center">
        <h2 className="uppercase">Size: </h2>
        <div className="flex gap-4">
          <p className=" w-10 h-10 rounded-full text-center pt-1.5 bg-gray-200">
            10"
          </p>
          <p className=" w-10 h-10 rounded-full text-center pt-1.5 bg-gray-200">
            14"
          </p>
          <p className=" w-10 h-10 rounded-full text-center pt-1.5 bg-gray-200">
            16"
          </p>
        </div>
      </div>
    </div>
  );
};

export default ChefFoodDetails;
