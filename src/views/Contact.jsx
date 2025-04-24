import React from 'react'
import { noData } from '../assets'

function Contact() {
  return (
    <div className='shadow-md p-6 bg-white rounded-lg'>
    <div className='flex  justify-between'>
      <h2 className='font-bold text-xl mb-6'>Contact</h2>
      <button className='cursor-pointer text-white py-2 px-4 bg-green-500 hover:bg-green-600 rounded-lg mb-4 transition-all duration-150 '>Add Contact</button>
    </div>
    <div>
      <div className='text-center py-6'>
        <img src={noData} alt="nodata" className='mx-auto w-20' />
        <p className="text-gray-500 mt-2">No Data Available</p>
      </div>
    </div>
  </div>
  )
}

export default Contact