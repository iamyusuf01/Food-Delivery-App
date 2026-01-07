import React from "react";
import { FaChevronLeft } from "react-icons/fa";
import { Link } from "react-router";

const AddItem = () => {
  const basic = [
    { name: "Salt", image: "" },
    { name: "Chicken", image: "" },
    { name: "Onion", image: "" },
    { name: "Garlic", image: "" },
    { name: "Poppers", image: "" },
    { name: "Ginger", image: "" },
  ];

  const fruit = [
    { name: "Salt", image: "" },
    { name: "Chicken", image: "" },
    { name: "Onion", image: "" },
    { name: "Garlic", image: "" },
    { name: "Poppers", image: "" },
    { name: "Ginger", image: "" },
  ];
  return (
    <div className="p-6">
      <div className=" flex justify-between items-center  max-h-screen rounded-2xl">
        <div className="flex items-center gap-4 ">
          <Link
            className="w-10 h-10 rounded-full p-3 bg-gray-300 text-black"
            to={"/add-item"}
          >
            <FaChevronLeft />
          </Link>
          <h2 className="text-xl">My Food List</h2>
        </div>
        <button className="uppercase text-orange-500 font-medium">Reset</button>
      </div>
      <div>
        <form>
          <div className="pt-6 py-4">
            <p className="uppercase">Item Name</p>
            <input
              type="text"
              placeholder="Food Name"
              className="border border-gray-400 rounded px-2 outline-none mt-2 py-1 w-full"
            />
          </div>
          <div>
            <p className="uppercase">Upload Photo</p>
            <input
              type="file"
              accept="image/*"
              id="uploadItem"
              placeholder="Food Name"
              className="border hidden border-gray-400 rounded px-2 outline-none mt-2 py-1 w-full"
            />
            <label htmlFor="uploadItem">
              <img src="" className="w-32 h-32 rounded-xl mt-1 bg-gray-300" />
            </label>
          </div>
          <div>
            <p>Price</p>
            <input />
            <input />
            <input />
          </div>
          <div>
            <h2>Ingriedents</h2>
            <div>
              <p>Basic</p>
              <div>
                <p>See All</p>
                <p>Icon</p>
              </div>
              <div>
                {basic.map((item, basic) => (
                  <div className="" key={basic}>
                    <ul>
                      <li>{item.name}</li>
                    </ul>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <p>Fruit</p>
              <div>
                <p>See All</p>
                <p>Icon</p>
              </div>
              <div>
                {fruit.map((item, fruit) => (
                  <div className="" key={fruit}>
                    <ul>
                      <li>{item.name}</li>
                    </ul>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div>
            <p>Details</p>
            <textarea />
          </div>
          <button>Save Change</button>
        </form>
      </div>
    </div>
  );
};

export default AddItem;
