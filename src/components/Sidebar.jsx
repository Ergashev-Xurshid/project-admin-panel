import React from 'react'
import { logo } from '../assets'
import { adminNav } from '../utils/constanta'
import { NavLink } from 'react-router-dom'

function Sidebar() {
  return (
    <div className='text-white p-4 bg-gray-800 flex items-center flex-col w-64 h-full fixed'>
      <div>
        <img className='w-20 h-16 max-w-full mb-2' src={logo} alt="logo" />
      </div>
      <ul className='w-full'>
        {adminNav.map((item,idx)=>(
          <li 
            key={idx}
            className='w-full  mt-2'
            >
            <NavLink 
              to={item.path}
              className={({ isActive }) =>
                `text-center text-white py-2 px-4 rounded-lg block hover:bg-gray-700 transition-all duration-200 ${
                  isActive ? "bg-green-600 text-white font-bold" : "text-gray-300"
                }`
              }
              >{item.title}
            </NavLink>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default Sidebar