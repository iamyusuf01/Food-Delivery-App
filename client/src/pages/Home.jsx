import React from 'react'
import Navbar from '../components/Navbar'
import Categories from '../components/Categories'
import Search from '../components/Search'
import Restaurants from '../components/Restaurants'

const Home = () => {
  return (
    <div>
      <Navbar/>
      <Search/>
      <Categories/>
      <Restaurants/>
    </div>
  )
}

export default Home