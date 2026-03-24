import { FaChevronRight } from "react-icons/fa";
import { FaArrowRightArrowLeft, FaRightLong } from "react-icons/fa6";
import { Link } from "react-router-dom";

const Menu = ({ closeSidebar }) => {
  return (
    <ul className="flex flex-col gap-4 font-ui">
      <li
        onClick={closeSidebar}
        className=" cursor-pointer  px-2 bg-gray-200 py-2 rounded"
      >
        <Link
          to="/admin/all-users"
          className="flex justify-between items-center"
        >
          <p>Users</p>
          <FaChevronRight size={12} />
        </Link>
      </li>

      <li
        onClick={closeSidebar}
        className="cursor-pointer  px-2 bg-gray-200 py-2 rounded"
      >
        <Link
          to="/admin/all-restaurants"
          className="flex justify-between items-center "
        >
          <p>Restaurants</p>
          <FaChevronRight size={12} />
        </Link>
      </li>
    </ul>
  );
};

export default Menu;
