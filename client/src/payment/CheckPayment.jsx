import React from 'react'

const CheckPayment = () => {
  return (
    <div className="p-6 font-ui overflow-hidden">
      <div className='flex flex-col justify-center items-center min-h-screen'>
        <div className=' bg-gray-300 w-52 h-32 rounded-2xl'>
          <img  className='' src=''/>
        </div>
        <div className='text-center pt-6'>
          <h2 className='text-xl'>Congratulations!</h2>
          <p className='py-2'>You successfully maked a payment, <br/> enjoy our service!</p>
        </div>
      </div>
      <button className='uppercase text-center w-full mt-4 h-12 rounded font-medium bg-orange-500 text-white'>
        Track order
      </button>
    </div>
  )
}

export default CheckPayment