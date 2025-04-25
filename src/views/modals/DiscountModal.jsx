import React, { useState } from 'react'
import { MdClose } from "react-icons/md";
import { getToken } from '../../utils/auth';
import { toast } from 'react-toastify';
function DiscountModal({setOpen , getDiscounts}) {


    const [discount,setDiscount]= useState("");
    const [startDe,setStartDe]= useState("");
    const [finishDe,setFinishDe]= useState("");
    const [status,setStatus]= useState(false);
  
    const addDiscountItem =(e)=>{
      e.preventDefault()
  
      fetch("https://back.ifly.com.uz/api/discount",{
        method:"POST",
        headers:{
          "Content-type":"application/json",
          "Authorization" : `Bearer ${getToken()}`
        },
        body: JSON.stringify({
          "discount": discount ? Number(discount) : 0,
          "started_at": startDe,
          "finished_at": finishDe,
          "status":status
        })
      })
      .then(res=>res.json())
      .then(item => {
      if (item?.success) {
         toast.success(item?.data?.message)
         getDiscounts()
         setOpen(false)     
      } else {
        toast.error(item?.message?.message)
      }
      })
  
      // formni tozalash 
      setDiscount(""),
      setStartDe(""),
      setFinishDe("")   
      setStatus(false)   
    }

  return (
    <div className='fixed inset-0 bg-black/60 flex  justify-center items-center z-50 overflow-y-auto' >
          <div className='bg-white rounded-lg relative  shadow-md p-6 max-h-[90vh] w-[45%]'>
            <button
              onClick={()=>setOpen(false)} 
              className='absolute top-2 right-2 text-white bg-red-500 px-2 py-2 cursor-pointer rounded-full'><MdClose /></button>
            <h2 className='font-bold text-xl mb-4'>Add Discount</h2>
            <form onSubmit={addDiscountItem}>
              <label>
                <input
                  required
                  value={discount}
                  onChange={(e)=>setDiscount(e.target.value)}
                  className='outline-none w-full p-2 border border-gray-300 rounded mb-1' 
                  type="number" 
                  min={1}
                  max={100}
                  placeholder='Discount (%)'
                  />
              </label>
              <label>
                <input
                  required
                  value={startDe}
                  onChange={(e)=>setStartDe(e.target.value)}
                  className='outline-none w-full p-2 border border-gray-300 rounded mb-1' 
                  type="date" />
              </label>
              <label>
                <input
                  required
                  value={finishDe}
                  onChange={(e)=>setFinishDe(e.target.value)}
                  className='outline-none w-full p-2 border border-gray-300 rounded mb-1' 
                  type="date" />
              </label>
              <label className='flex items-center space-x-2 mb-4'>
                <input 
                  checked={status}
                  onChange={(e)=>setStatus(e.target.checked)}
                  type="checkbox" 
                  className='w-4 h-4 border-2 border-gray-300 rounded-lg checked:bg-green-500  focus:bg-green-500 transition-all duration-200' />
                <span className='text-md text-gray-700 font-medium'>Active</span>
              </label>
              <button className='w-full mt-4 cursor-pointer p-2 bg-green-500 hover:bg-green-600  text-white rounded-lg'>Add Discount</button>
            </form>
          </div>
        </div>
  )
}

export default DiscountModal