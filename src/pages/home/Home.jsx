import React from 'react'
import { Link } from 'react-router-dom'

function Home() {
  return (
    <div className='flex items-center justify-center  w-full h-[100vh] bg-gray-100' >
      <div className='bg-white rounded-xl text-center shadow-md p-8 h-[200px] w-[400px]'>
        <h1 className='font-bold text-3xl mb-10'>Home Page</h1>
        <Link to="/login">
          <button className='w-full bg-green-500 py-3 rounded-lg cursor-pointer text-white'>
            Login in
          </button>
        </Link>
      </div>
    </div>
  )
}

export default Home