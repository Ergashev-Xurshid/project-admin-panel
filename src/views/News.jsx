import React from 'react'
import { newsImg } from '../assets'

function News() {
  return (
    <div className='shadow-md p-6 bg-white rounded-lg'>
    <div className='flex  justify-between'>
      <h2 className='font-bold text-xl mb-6'>News</h2>
      <button className='cursor-pointer text-white py-2 px-4 bg-green-500 hover:bg-green-600 rounded-lg mb-4 transition-all duration-150  '>Add News</button>
    </div>
    <div>
      <table className='min-w-full table-auto'>
        <thead>
          <tr className='bg-gray-200'>
            <th className='border border-gray-300 p-2'>№</th>
            <th className='border border-gray-300 p-2'>Image</th>
            <th className='border border-gray-300 p-2'>Title (EN)</th>
            <th className='border border-gray-300 p-2'>Description</th>
            <th className='border border-gray-300 p-2'>Actions</th>
          </tr>
        </thead>
        <tbody >
          <tr className='text-center hover:bg-gray-100'>
            <td className='border border-gray-300 p-2'>1</td>
            <td className='border border-gray-300 p-2 cursor-pointer'>
              <img src={newsImg} alt="img" className='w-16 h-16 object-cover mx-auto rounded' />
            </td>
            <td className='border border-gray-300 p-2'>news</td>
            <td className='border border-gray-300 p-2'>news</td>
            <td className='border border-gray-300 p-2 w-[200px]'>
              <button className='px-4 py-2 mr-2 cursor-pointer bg-yellow-500 text-white rounded-lg hover:bg-yellow-600 transition'>Edit</button>
              <button className='px-4 py-2 cursor-pointer bg-red-500 text-white rounded-lg hover:bg-red-600 transition'>Delete</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
  )
}

export default News