import Background from "./Bg_Background.png";

export const BgImages = {
  Background,
};

export const RestaurantsList = {
  "restaurants": [
    {
      "id": 1,
      "name": "Spice Route Kitchen",
      "type": "Indian",
      "rating": 4.5,
      "deliveryTime": "30-40 mins",
      "isVeg": false,
      "location": {
        "city": "Mumbai",
        "address": "12 Lokhandwala Road, Andheri West"
      },
      "image": "https://example.com/spice-route.jpg",
      "menu": [
        {
          "itemId": 101,
          "name": "Butter Chicken",
          "price": 320,
          "isVeg": false,
          "description": "Creamy tomato-based gravy with tender tandoori chicken pieces."
        },
        {
          "itemId": 102,
          "name": "Paneer Tikka",
          "price": 260,
          "isVeg": true,
          "description": "Charcoal-grilled paneer cubes marinated in spicy yoghurt."
        }
      ]
    },
    {
      "id": 2,
      "name": "Green Bowl Café",
      "type": "Healthy / Vegan",
      "rating": 4.2,
      "deliveryTime": "20-30 mins",
      "isVeg": true,
      "location": {
        "city": "Bangalore",
        "address": "4th Block, Koramangala"
      },
      "image": "https://example.com/green-bowl.jpg",
      "menu": [
        {
          "itemId": 201,
          "name": "Quinoa Salad",
          "price": 180,
          "isVeg": true,
          "description": "A refreshing mix of quinoa, veggies, and a lemon herb dressing."
        },
        {
          "itemId": 202,
          "name": "Avocado Smoothie",
          "price": 150,
          "isVeg": true,
          "description": "Creamy smoothie made with fresh avocado and almond milk."
        }
      ]
    },
    {
      "id": 3,
      "name": "Pizza Wave",
      "type": "Italian",
      "rating": 4.7,
      "deliveryTime": "25-35 mins",
      "isVeg": false,
      "location": {
        "city": "Delhi",
        "address": "Connaught Place, Block C"
      },
      "image": "https://example.com/pizza-wave.jpg",
      "menu": [
        {
          "itemId": 301,
          "name": "Pepperoni Pizza",
          "price": 450,
          "isVeg": false,
          "description": "Thin-crust pizza topped with mozzarella and spicy pepperoni slices."
        },
        {
          "itemId": 302,
          "name": "Margherita Pizza",
          "price": 350,
          "isVeg": true,
          "description": "Classic pizza with basil, mozzarella, and rich tomato sauce."
        }
      ]
    },
    {
      "id": 4,
      "name": "Tandoori Flames",
      "type": "North Indian",
      "rating": 4.3,
      "deliveryTime": "30-35 mins",
      "isVeg": false,
      "location": {
        "city": "Delhi",
        "address": "Rohini Sector 9"
      },
      "image": "https://example.com/tandoori-flames.jpg",
      "menu": [
        {
          "itemId": 401,
          "name": "Tandoori Chicken",
          "price": 380,
          "isVeg": false,
          "description": "Smoky and juicy chicken roasted in a clay oven with spicy marinade."
        },
        {
          "itemId": 402,
          "name": "Dal Makhani",
          "price": 220,
          "isVeg": true,
          "description": "Slow-cooked black lentils in a buttery, creamy Punjabi-style gravy."
        }
      ]
    },
    {
      "id": 5,
      "name": "Biryani Hub",
      "type": "Hyderabadi Biryani",
      "rating": 4.6,
      "deliveryTime": "35-45 mins",
      "isVeg": false,
      "location": {
        "city": "Hyderabad",
        "address": "Hitech City Road"
      },
      "image": "https://example.com/biryani-hub.jpg",
      "menu": [
        {
          "itemId": 501,
          "name": "Chicken Dum Biryani",
          "price": 300,
          "isVeg": false,
          "description": "Authentic Hyderabadi biryani with slow-cooked chicken and aromatic spices."
        },
        {
          "itemId": 502,
          "name": "Veg Biryani",
          "price": 240,
          "isVeg": true,
          "description": "Fragrant basmati rice cooked with mixed vegetables and spices."
        }
      ]
    },
    {
      "id": 6,
      "name": "Sushi Zen",
      "type": "Japanese",
      "rating": 4.4,
      "deliveryTime": "25-30 mins",
      "isVeg": false,
      "location": {
        "city": "Pune",
        "address": "Viman Nagar"
      },
      "image": "https://example.com/sushi-zen.jpg",
      "menu": [
        {
          "itemId": 601,
          "name": "Salmon Sushi",
          "price": 520,
          "isVeg": false,
          "description": "Fresh salmon slices rolled with seasoned rice and seaweed."
        },
        {
          "itemId": 602,
          "name": "Avocado Roll",
          "price": 350,
          "isVeg": true,
          "description": "Creamy avocado wrapped with sticky rice and nori sheets."
        }
      ]
    },
    {
      "id": 7,
      "name": "Burger Town",
      "type": "Fast Food",
      "rating": 4.1,
      "deliveryTime": "20-25 mins",
      "isVeg": false,
      "location": {
        "city": "Chennai",
        "address": "TN Nagar"
      },
      "image": "https://example.com/burger-town.jpg",
      "menu": [
        {
          "itemId": 701,
          "name": "Cheese Burger",
          "price": 150,
          "isVeg": false,
          "description": "Juicy beef patty layered with cheese, lettuce, and house sauce."
        },
        {
          "itemId": 702,
          "name": "Veggie Burger",
          "price": 120,
          "isVeg": true,
          "description": "Crispy vegetable patty with tomato, onions, and tangy mayo."
        }
      ]
    },
    {
      "id": 8,
      "name": "Café Mocha Bliss",
      "type": "Cafe",
      "rating": 4.8,
      "deliveryTime": "15-20 mins",
      "isVeg": true,
      "location": {
        "city": "Mumbai",
        "address": "Marine Drive"
      },
      "image": "https://example.com/mocha-bliss.jpg",
      "menu": [
        {
          "itemId": 801,
          "name": "Cold Coffee",
          "price": 160,
          "description": "Chilled creamy coffee blended with ice and cocoa.",
          "isVeg": true
        },
        {
          "itemId": 802,
          "name": "Chocolate Muffin",
          "price": 90,
          "isVeg": true,
          "description": "Soft, rich muffin loaded with melted chocolate chunks."
        }
      ]
    },
    {
      "id": 9,
      "name": "Wrap & Roll",
      "type": "Street Food",
      "rating": 4.0,
      "deliveryTime": "20-30 mins",
      "isVeg": true,
      "location": {
        "city": "Ahmedabad",
        "address": "SG Highway"
      },
      "image": "https://example.com/wrap-roll.jpg",
      "menu": [
        {
          "itemId": 901,
          "name": "Paneer Kathi Roll",
          "price": 140,
          "isVeg": true,
          "description": "Soft paratha stuffed with spiced paneer and veggies."
        },
        {
          "itemId": 902,
          "name": "Veg Spring Roll",
          "price": 100,
          "isVeg": true,
          "description": "Crispy rolls filled with sautéed vegetables and noodles."
        }
      ]
    },
    {
      "id": 10,
      "name": "Ocean Grill",
      "type": "Seafood",
      "rating": 4.3,
      "deliveryTime": "30-40 mins",
      "isVeg": false,
      "location": {
        "city": "Goa",
        "address": "Calangute Beach Road"
      },
      "image": "https://example.com/ocean-grill.jpg",
      "menu": [
        {
          "itemId": 1001,
          "name": "Grilled Fish",
          "price": 480,
          "isVeg": false,
          "description": "Freshly grilled fish seasoned with herbs and lemon butter."
        },
        {
          "itemId": 1002,
          "name": "Prawn Curry",
          "price": 520,
          "isVeg": false,
          "description": "A spicy Goan-style curry loaded with tender prawns."
        }
      ]
    },
    {
      "id": 11,
      "name": "The Great Punjab",
      "type": "Punjabi",
      "rating": 4.6,
      "deliveryTime": "25-35 mins",
      "isVeg": false,
      "location": {
        "city": "Ludhiana",
        "address": "Mall Road"
      },
      "image": "https://example.com/great-punjab.jpg",
      "menu": [
        {
          "itemId": 1101,
          "name": "Sarson Ka Saag",
          "price": 220,
          "isVeg": true,
          "description": "Traditional Punjabi dish made with mustard greens and spices."
        },
        {
          "itemId": 1102,
          "name": "Amritsari Kulcha",
          "price": 150,
          "isVeg": true,
          "description": "Stuffed kulcha baked until golden, served with chole."
        }
      ]
    },
    {
      "id": 12,
      "name": "Thai Spice House",
      "type": "Thai",
      "rating": 4.5,
      "deliveryTime": "30-40 mins",
      "isVeg": false,
      "location": {
        "city": "Kolkata",
        "address": "Park Street"
      },
      "image": "https://example.com/thai-spice.jpg",
      "menu": [
        {
          "itemId": 1201,
          "name": "Pad Thai",
          "price": 320,
          "isVeg": true,
          "description": "Rice noodles stir-fried with tofu, peanuts, and tamarind sauce."
        },
        {
          "itemId": 1202,
          "name": "Thai Green Curry",
          "price": 360,
          "isVeg": false,
          "description": "Spicy coconut-based curry cooked with chicken and vegetables."
        }
      ]
    }
  ]
}

