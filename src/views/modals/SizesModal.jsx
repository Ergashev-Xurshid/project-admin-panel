import React, { useState } from 'react'
import { MdClose } from "react-icons/md";
import { toast } from 'react-toastify';
import { getToken } from '../../utils/auth';

function SizesModal({setOpen , getSizes}) {
    
    const [size , setSize]= useState("");
  
    const addCategoryItem =(e)=>{
      e.preventDefault()
  
      fetch("https://back.ifly.com.uz/api/sizes",{
        method:"POST",
        headers:{
          "Content-type":"application/json",
          "Authorization" : `Bearer ${getToken()}`
        },
        body: JSON.stringify({
          "size":size
        })
      })
      .then(res=>res.json())
      .then(item=> {
        if(item?.success){
          toast.success("Category successfully"),
          // ma'lumotlarni yangilash 
          getSizes()
          // modalni yopish 
          setOpen(false)
        }else{
          toast.error("Category failed")
        }
      })
  
     // formni tozalash 
     setSize("")
    }
  


  return (
    <div onClick={() => setOpen(false)} className='fixed inset-0 bg-black/60 flex  justify-center items-center z-50 overflow-y-auto' >
      <div onClick={(e) => e.stopPropagation()} className='bg-white rounded-lg relative  shadow-md p-6 max-h-[90vh] w-[45%]'>
        <button
          onClick={() => setOpen(false)}
          className='absolute top-2 right-2 text-white bg-red-500 px-2 py-2 cursor-pointer rounded-full'><MdClose /></button>
        <h2 className='font-bold text-xl mb-4'>Add Size</h2>
        <form onSubmit={addCategoryItem}>
          <label>
            <input
              placeholder='Size name'
              required
              value={size}
              onChange={(e) => setSize(e.target.value)}
              className='outline-none w-full p-2 border border-gray-300 rounded mb-1'
              type="text" />
          </label>
          <button className='w-full mt-4 cursor-pointer p-2 bg-green-500 hover:bg-green-600  text-white rounded-lg'>Add Size</button>
        </form>
      </div>
    </div>
  )
}

export default SizesModal