import React, { useState , useEffect } from 'react'
import { getToken } from '../../utils/auth';
import { toast } from 'react-toastify';
import { MdClose } from "react-icons/md";

function ColorEdit({ editID, getColors, seteditOpen, dataID }) {




  const [colorEn, setColorEn] = useState("");
  const [colorRu, setColorRu] = useState("");
  const [colorDe, setColorDe] = useState("");




  useEffect(() => {
    if (dataID) {
      setColorEn(dataID.color_en || "");
      setColorRu(dataID.color_ru || "");
      setColorDe(dataID.color_de || "");
    }
  }, [dataID])



  const addColorItem = async (e) => {
    e.preventDefault()

    const res = await fetch(`https://back.ifly.com.uz/api/colors/${editID}`, {
      method: "PATCH",
      headers: {
        "Content-type": "application/json",
        "Authorization": `Bearer ${getToken()}`
      },
      body: JSON.stringify({
        "color_en": colorEn,
        "color_de": colorDe,
        "color_ru": colorRu
      })
    })

    const item = await res.json()
    if (item?.success) {
      toast.success("Discount edited successfully")
      getColors()
      seteditOpen(false)
    } else {
      toast.error("Discount edit failed")
    }


    // formni tozalash 
    setColorEn(""),
      setColorDe(""),
      setColorRu("")
  }


  return (
    <div onClick={() => seteditOpen(false)} className='fixed inset-0 bg-black/60 flex  justify-center items-center z-50 overflow-y-auto' >
      <div className='bg-white rounded-lg relative  shadow-md p-6 max-h-[90vh] w-[45%]'>
        <button
          onClick={() => seteditOpen(false)}
          className='absolute top-2 right-2 text-white bg-red-500 px-2 py-2 cursor-pointer rounded-full'><MdClose /></button>
        <h2 className='font-bold text-xl mb-4'>Edit  Color </h2>
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
          <button className='w-full mt-4 cursor-pointer p-2 bg-green-500 hover:bg-green-600  text-white rounded-lg'>Updated Category</button>
        </form>
      </div>
    </div>
  )
}

export default ColorEdit