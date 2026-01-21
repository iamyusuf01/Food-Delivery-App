import React from "react";
import { useNavigate } from "react-router";
import { GoHome } from "react-icons/go";
import { FiEdit } from "react-icons/fi";

const Address = () => {
  const navigate = useNavigate();
  return (
    <div className="p-6">
      {/*  */}
      <div className="flex items-center gap-4 ">
        <p
          className="w-10 h-10 rounded-full p-3 bg-gray-200"
          onClick={() => navigate("/profile/personal-info")}
        >
          <FaChevronLeft />
        </p>
        <h2 className="font-medium">My Address</h2>
      </div>
      <div>
        <form>
        </form>
      </div>
    </div>
  );
};

export default Address;
