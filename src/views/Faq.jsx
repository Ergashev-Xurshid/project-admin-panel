import React, { useEffect, useState } from 'react'
import { getToken } from '../utils/auth'
import { toast } from 'react-toastify'
import { noData } from '../assets'
import FaqModal from './modals/FaqModal'
import FaqEdit from './editModals/FaqEdit'
function Faq() {


  // Faq modal 
  const [open, setOpen] = useState(false)

  const [data, setData] = useState([])


  // get Faq 
  const getFaq = () => {
    fetch("https://back.ifly.com.uz/api/faq")
      .then(res => res.json())
      .then(item => setData(item?.data)
      )
  }

  useEffect(() => {
    getFaq()
  }, [])


  //delete Faq
  const deleteFaq = (id) => {

    fetch(`https://back.ifly.com.uz/api/faq/${id}`, {
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
          getFaq()
        } else {
          toast.error(item?.message?.message)
        }
      })
  }




  const [dataID, setDataID] = useState([])
  const [editID, setEditID] = useState("")
  // Edit modal 
  const [editOpen, seteditOpen] = useState(false)
  const getFaqID = async (id) => {
    const res = await fetch(`https://back.ifly.com.uz/api/faq/${id}`);
    const item = await res.json();
    setDataID(item?.data);
    setEditID(id)
    seteditOpen(true)
  }

  return (
    <>
      <div className='shadow-md p-6 bg-white rounded-lg'>
        <div className='flex  justify-between'>
          <h2 className='font-bold text-xl mb-6'>FAQ Management</h2>
          <button
            onClick={() => setOpen(true)}
            className='cursor-pointer text-white py-2 px-4 bg-green-500 hover:bg-green-600 rounded-lg mb-4 transition-all duration-150  '>Add FAQ</button>
        </div>
        <div>
          <table className='min-w-full table-auto'>
            <thead>
              <tr className='bg-gray-200'>
                <th className='border border-gray-300 p-2'>№</th>
                <th className='border border-gray-300 p-2'>Question (EN)</th>
                <th className='border border-gray-300 p-2'>Answer (EN)</th>
                <th className='border border-gray-300 p-2'>Actions</th>
              </tr>
            </thead>
            {data && <tbody>
              {data.map((item, i) => (
                <tr key={i} className='text-center hover:bg-gray-100'>
                  <td className='border border-gray-300 p-2'>{i + 1}</td>
                  <td className='border border-gray-300 p-2'>{item.question_en}</td>
                  <td className='border border-gray-300 p-2'>{item.answer_en}</td>
                  <td className='border border-gray-300 p-2 '>
                    <button 
                      onClick={()=>getFaqID(item.id)}
                      className='px-4 py-2 mr-2 cursor-pointer bg-yellow-500 text-white rounded-lg hover:bg-yellow-600 transition'>Edit</button>
                    <button
                      onClick={() => deleteFaq(item.id)}
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
      {open && <FaqModal setOpen={setOpen} getFaq={getFaq} />}
      {editOpen && <FaqEdit dataID={dataID} editID={editID} seteditOpen={seteditOpen} getFaq={getFaq} />}
    </>
  )
}

export default Faq