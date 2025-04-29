import React, { useEffect, useState } from 'react'
import { getToken } from '../utils/auth'
import { toast } from 'react-toastify'
import ColorModal from './modals/ColorModal'
import { noData } from '../assets'
import ColorEdit from './editModals/ColorEdit'

function Colors() {


  // Open modal 
  const [open, setOpen] = useState(false)

  const [data, setData] = useState([])


  // get color 
  const getColors = () => {
    fetch("https://back.ifly.com.uz/api/colors")
      .then(res => res.json())
      .then(item => setData(item?.data)
      )
  }

  useEffect(() => {
    getColors()
  }, [])


  //delete Color
  const deleteColor = (id) => {

    fetch(`https://back.ifly.com.uz/api/colors/${id}`, {
      method: "DELETE",
      headers: {
        "Content-type": "application/json",
        "Authorization": `Bearer ${getToken()}`
      }
    })
      .then(res => res.json())
      .then(item => {
        if (item?.success) {
          toast.success(item?.data?.message)
          getColors()
        } else {
          toast.error(item?.message?.message)
        }
      })
  }



  const [dataID, setDataID] = useState([])
  const [editID, setEditID] = useState("")
  // Edit modal 
  const [editOpen, seteditOpen] = useState(false)
  const getColorsID = async (id) => {
    const res = await fetch(`https://back.ifly.com.uz/api/colors/${id}`);
    const item = await res.json();
    setDataID(item?.data);
    setEditID(id)
    seteditOpen(true)
  }


  return (
    <>
      <div className='shadow-md p-6 bg-white rounded-lg'>
        <div className='flex  justify-between'>
          <h2 className='font-bold text-xl mb-6'>Colors</h2>
          <button
            onClick={() => setOpen(true)}
            className='cursor-pointer text-white py-2 px-4 bg-green-500 hover:bg-green-600 rounded-lg mb-4 transition-all duration-150  '>Add Color</button>
        </div>
        <div>
          <table className='min-w-full table-auto'>
            <thead>
              <tr className='bg-gray-200'>
                <th className='border border-gray-300 p-2'>№</th>
                <th className='border border-gray-300 p-2'>Colors ENG</th>
                <th className='border border-gray-300 p-2'>Colors RU</th>
                <th className='border border-gray-300 p-2'>Colors DE</th>
                <th className='border border-gray-300 p-2'>Actions</th>
              </tr>
            </thead>
            {data && <tbody>
              {data.map((item, i) => (
                <tr key={i} className='text-center hover:bg-gray-100'>
                  <td className='border border-gray-300 p-2'>{i + 1}</td>
                  <td className='border border-gray-300 p-2'>{item.color_en}</td>
                  <td className='border border-gray-300 p-2'>{item.color_ru}</td>
                  <td className='border border-gray-300 p-2'>{item.color_de}</td>
                  <td className='border border-gray-300 p-2 w-[200px]'>
                    <button 
                      onClick={()=>getColorsID(item.id)}  
                      className='px-4 py-2 mr-2 cursor-pointer bg-yellow-500 text-white rounded-lg hover:bg-yellow-600 transition'>Edit</button>
                    <button
                      onClick={() => deleteColor(item.id)}
                      className='px-4 py-2 cursor-pointer bg-red-500 text-white rounded-lg hover:bg-red-600 transition'>Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>}
          </table>
          {data.length === 0 ? <div className='text-center py-6'>
            <img src={noData} alt="nodata" className='mx-auto w-20' />
            <p className="text-gray-500 mt-2">No Data Available</p>
          </div> : <span></span>}
        </div>
      </div>
      {open && <ColorModal setOpen={setOpen} getColors={getColors} />}
      {editOpen && <ColorEdit dataID={dataID} editID={editID} seteditOpen={seteditOpen} getColors={getColors} />}
    </>
  )
}

export default Colors