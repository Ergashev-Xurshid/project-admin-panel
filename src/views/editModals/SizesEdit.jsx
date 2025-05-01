import React, { useEffect, useState } from 'react'
import { getToken } from '../../utils/auth';
import { MdClose } from 'react-icons/md';
import { toast } from 'react-toastify';

function SizesEdit({editID, getSizes, seteditOpen, dataID}) {

const [size , setSize]= useState("");

  useEffect(() => {
    if (dataID) {
      setSize(dataID.size || "");
    }
  }, [dataID])


  const editSizeItem = async (e) => {
    e.preventDefault()

    const res = await fetch(`https://back.ifly.com.uz/api/sizes/${editID}`, {
      method: "PATCH",
      headers: {
        "Content-type": "application/json",
        "Authorization": `Bearer ${getToken()}`
      },
      body: JSON.stringify({
        "size": size
      })
    })

    const item = await res.json()
    if (item?.success) {
      toast.success("Size edited successfully")
      getSizes()
      seteditOpen(false)
    } else {
      toast.error("Size edit failed")
    }

    // formni tozalash 
    setSize("")

  }


  return (
    <div onClick={() => seteditOpen(false)} className='fixed inset-0 bg-black/60 flex  justify-center items-center z-50 overflow-y-auto' >
      <div onClick={(e) => e.stopPropagation()} className='bg-white rounded-lg relative  shadow-md p-6 max-h-[90vh] w-[45%] z-99'>
        <button
          onClick={() => seteditOpen(false)}
          className='absolute top-2 right-2 text-white bg-red-500 px-2 py-2 cursor-pointer rounded-full'><MdClose /></button>
        <h2 className='font-bold text-xl mb-4'>Edit Size</h2>
        <form onSubmit={editSizeItem}>
          <label>
            <input
              placeholder='Size name'
              required
              value={size}
              onChange={(e) => setSize(e.target.value)}
              className='outline-none w-full p-2 border border-gray-300 rounded mb-1'
              type="text" />
          </label>
          <button className='w-full mt-4 cursor-pointer p-2 bg-green-500 hover:bg-green-600  text-white rounded-lg'>Updated Size</button>
        </form>
      </div>
    </div>
  )
}

export default SizesEdit