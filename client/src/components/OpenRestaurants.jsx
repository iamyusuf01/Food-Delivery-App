import React, { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

const OpenRestaurants = ({ filteredDishes }) => {
  const { restaurants } = useContext(AuthContext);

  const findRestaurant = (id) => {
    return restaurants.find((res) => res.id === id);
  };

  const restaurantDetails = filteredDishes.map((dish) =>
    findRestaurant(dish.restaurantId)
  );

  console.log(restaurantDetails);

  return (
    <div>
      <h1>Open Restaurants</h1>
      <div className="space-y-5">
        {restaurantDetails.map((res) => (
          <div key={res.id}>
            <div className="h-50 w-full bg-gray-400 rounded-2xl">
              {/* <img src="/" alt="/" /> */}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default OpenRestaurants;
