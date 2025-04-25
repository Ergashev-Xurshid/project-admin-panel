import React, { useEffect, useState } from 'react'
import { getToken } from '../utils/auth'
import { toast } from 'react-toastify'
import SizesModal from './modals/SizesModal'

function Sizes() {


  
    // Open modal 
    const [open , setOpen] = useState(false)
  
    const [data, setData] = useState([])
  
  
    // get category 
  const getSizes = () => {
      fetch("https://back.ifly.com.uz/api/sizes")
        .then(res => res.json())
        .then(item => setData(item?.data)
        )
    }
  
    useEffect(() => {
      getSizes()
    },[])
  
  
    //delete category
    const deleteSizes = (id)=>{
  
      fetch(`https://back.ifly.com.uz/api/sizes/${id}`,{
        method:"DELETE",
        headers:{
          "Content-type":"application/json",
          "Authorization" : `Bearer ${getToken()}`
        }})
        .then(res=>res.json())
        .then(item=> {
          if(item?.success){
            toast.success(item?.data?.message)
            getSizes()
          }else{
            toast.error(item?.message?.message)
          }
        })      
  }
  

  return (
    <>
      <div className='shadow-md p-6 bg-white rounded-lg'>
    <div className='flex  justify-between'>
      <h2 className='font-bold text-xl mb-6'>Sizes</h2>
      <button 
        onClick={()=>setOpen(true)}
        className='cursor-pointer text-white py-2 px-4 bg-green-500 hover:bg-green-600 rounded-lg mb-4 transition-all duration-150  '>Add Size</button>
    </div>
    <div>
      <table className='min-w-full table-auto'>
        <thead>
          <tr className='bg-gray-200'>
            <th className='border border-gray-300 p-2'>№</th>
            <th className='border border-gray-300 p-2'>Sizes</th>
            <th className='border border-gray-300 p-2'>Actions</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item , i)=> (
            <tr key={i} className='text-center hover:bg-gray-100'>
              <td className='border border-gray-300 p-2'>{item.id}</td>
              <td className='border border-gray-300 p-2'>{item.size}</td>
              <td className='border border-gray-300 p-2 w-[200px]'>
                <button className='px-4 py-2 mr-2 cursor-pointer bg-yellow-500 text-white rounded-lg hover:bg-yellow-600 transition'>Edit</button>
                <button 
                  onClick={()=>deleteSizes(item.id)}
                  className='px-4 py-2 cursor-pointer bg-red-500 text-white rounded-lg hover:bg-red-600 transition'>Delete</button>
              </td>
          </tr>
          ))}
        </tbody>
      </table>
    </div>
  </div>
  {open && <SizesModal setOpen={setOpen} getSizes={getSizes}/>}
    </>
  )
}

export default Sizes