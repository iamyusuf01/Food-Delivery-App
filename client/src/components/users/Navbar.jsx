import React, { useContext } from "react";
import { CgMenuLeft, CgSearch } from "react-icons/cg";
import { FaCaretDown } from "react-icons/fa";
import { IoBagHandle } from "react-icons/io5";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import NavbarShimmer from "../../components/lib/NavbarShimmer";

const Navbar = () => {
  const { isAdmin, isSeller, loading } = useContext(AuthContext);
  const navigate = useNavigate();

  if (loading) {
    return <NavbarShimmer />;
  }

  return (
    <div className="flex justify-between items-center font-ui">
      <div className="flex gap-4 items-center">
        <button
          className="w-10 h-10 bg-gray-300 rounded-full p-2"
          onClick={() => navigate("/profile")}
        >
          <CgMenuLeft size={26} />
        </button>
        <div>
          <h2 className="uppercase font-semibold text-xs text-amber-600">
            Deliver To
          </h2>
          <div className="flex items-center gap-2">
            <p className="text-xs">Halal Lab Office</p>
            <FaCaretDown />
          </div>
        </div>
      </div>
      <div className="flex items-center gap-5 text-sm">
        {isAdmin && (
          <>
            <button
              onClick={() => navigate("/admin")}
              className="bg-gray-500/30 h-8 rounded-xl px-3"
            >
              Admin
            </button>
            <button
              onClick={() => navigate("/admin/add-restaurant")}
              className="bg-gray-500/30 h-8 rounded-xl px-3"
            >
              Add Restaurant
            </button>
          </>
        )}
        {!isAdmin && isSeller && (
          <>
            <button
              onClick={() => navigate("/seller")}
              className="bg-gray-500/30 h-8 rounded-xl px-3"
            >
              Seller
            </button>
            <button
              onClick={() => navigate("/seller/add-restaurant")}
              className="bg-gray-500/30 h-8 rounded-xl px-3"
            >
              Add Restaurant
            </button>
          </>
        )}
        {!isAdmin && !isSeller && (
          <>
            <Link to="/search" className="bg-gray-500/30 rounded-full p-1">
              <CgSearch size={30} className="text-black m-auto px-0.5" />
            </Link>

            <button
              className="w-10 h-10 rounded-full bg-black p-1.5"
              onClick={() => navigate("/my-cart")}
            >
              <IoBagHandle size={28} fill="white" />
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default Navbar;
