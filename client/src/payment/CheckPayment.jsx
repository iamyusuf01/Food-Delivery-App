import React from 'react'

const CheckPayment = () => {
  return (
    <div className="p-6">
      <div className='flex flex-col justify-center items-center pt-26'>
        <div className=' bg-gray-300 w-52 h-32 rounded-2xl'>
          <img  className='' src=''/>
        </div>
        <div className='text-center pt-6'>
          <h2 className='text-xl'>Congratulations!</h2>
          <p className='py-2'>You successfully maked a payment, <br/> enjoy our service!</p>
        </div>
      </div>
      <div className='text-center my-12 h-12 rounded bg-orange-500'>
        <p className='pt-2 text-white text-xl uppercase'>Track order</p>
      </div>
    </div>
  )
}

export default CheckPayment