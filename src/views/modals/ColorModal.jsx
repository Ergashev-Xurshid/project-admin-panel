import React, { useState } from 'react'
import { getToken } from '../../utils/auth';
import { toast } from 'react-toastify';
import { MdClose } from "react-icons/md";
function ColorModal({setOpen,getColors}) {

    const [colorEn,setColorEn]= useState("");
    const [colorRu,setColorRu]= useState("");
    const [colorDe,setColorDe]= useState("");
  
    const addColorItem =(e)=>{
      e.preventDefault()
  
      fetch("https://back.ifly.com.uz/api/colors",{
        method:"POST",
        headers:{
          "Content-type":"application/json",
          "Authorization" : `Bearer ${getToken()}`
        },
        body: JSON.stringify({
          "color_en": colorEn,
          "color_de": colorDe,
          "color_ru": colorRu
        })
      })
      .then(res=>res.json())
      .then(item=> {
        if(item?.success){
          toast.success("Category successfully"),
          // ma'lumotlarni yangilash 
          getColors()
          // modalni yopish 
          setOpen(false)
        }else{
          toast.error("Category failed")
        }
      })
  
      // formni tozalash 
      setColorEn(""),
      setColorDe(""),
      setColorRu("")   
    }
  
  

  return (
    <div className='fixed inset-0 bg-black/60 flex  justify-center items-center z-50 overflow-y-auto' >
      <div className='bg-white rounded-lg relative  shadow-md p-6 max-h-[90vh] w-[45%]'>
        <button
          onClick={() => setOpen(false)}
          className='absolute top-2 right-2 text-white bg-red-500 px-2 py-2 cursor-pointer rounded-full'><MdClose /></button>
        <h2 className='font-bold text-xl mb-4'>Add Color </h2>
        <form onSubmit={addColorItem}>
          <label>
            <p className='block mb-1 text-sm font-medium'>Color  (EN)</p>
            <input
              required
              value={colorEn}
              onChange={(e) => setColorEn(e.target.value)}
              className='outline-none w-full p-2 border border-gray-300 rounded mb-1'
              type="text" />
          </label>
          <label>
            <p className='block mb-1 text-sm font-medium'>Color  (RU)</p>
            <input
              required
              value={colorRu}
              onChange={(e) => setColorRu(e.target.value)}
              className='outline-none w-full p-2 border border-gray-300 rounded mb-1'
              type="text" />
          </label>
          <label>
            <p className='block mb-1 text-sm font-medium'>Color  (DE)</p>
            <input
              required
              value={colorDe}
              onChange={(e) => setColorDe(e.target.value)}
              className='outline-none w-full p-2 border border-gray-300 rounded mb-1'
              type="text" />
          </label>
          <button className='w-full mt-4 cursor-pointer p-2 bg-green-500 hover:bg-green-600  text-white rounded-lg'>Add Category</button>
        </form>
      </div>
    </div>
  )
}

export default ColorModal