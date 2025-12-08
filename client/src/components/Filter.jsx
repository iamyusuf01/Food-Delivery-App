import React, { useState } from 'react'
import { RxCross2 } from "react-icons/rx";

const Filter = () => {
  const [active, setActive] = useState(false)

  const handleClick = () => {
    setActive(!active)
  }
  const list = [
    {name: 'Delivery',
      mintues: '10-15 min'
    },

    {name: 'Pick Up', mintues: '20 min'},
    {name: 'Offers', mintues: '30-40 min'},
    {name: 'Online payment available', mintues: '45 min' },
  ]
  return (
    <div className='p-6'>
        {/*  */}
        <div className='flex justify-between items-center'>
          <h2 className='text-xl'>Filter your search</h2>
          <p className='w-10 h-10 rounded-full p-3 bg-gray-200'><RxCross2/></p>
        </div>
        {/* Offers */}
        <div className='flex flex-wrap items-center pt-6 gap-4'>
           {list.map((item, index) => (
            <div key={index.name} className=''>
              <ul className='border border-gray-300 w-full h-8 text-center rounded-full mx-4'>
                <li className='text-xl'>{item.name}</li>
              </ul>
            </div>
           ))}
        </div>
        {/* Delivery Time */}
        <div className='pt-8'>
           <h2 className='text-xl uppercase'>Delivery Time</h2>
           <div className='flex flex-wrap items-center pt-6 gap-4'>
              {list.map((item, key) => (
                <div key={key.mintues}>
                   <div className={`border border-gray-200 w-full h-8 text-center rounded-full mx-4 cursor-pointer hover:bg-orange-400 hover:text-white ${active ? 'bg-orange-400 text-white' : ''}`}
                   onClick={handleClick}>
                      <p className='text-xl'>{item.mintues}</p>
                   </div>
                </div>
              ))}
           </div>
        </div>
    </div>
  )
}

export default Filter