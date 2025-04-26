import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import { getToken } from '../utils/auth'
import DiscountModal from './modals/DiscountModal'
import { noData } from '../assets'
import { TailSpin } from 'react-loader-spinner';
function Discount() {

  // Open modal 
  const [open, setOpen] = useState(false)

  const [data, setData] = useState([])

  // get Discount 
  const getDiscounts = () => {
    fetch("https://back.ifly.com.uz/api/discount")
      .then(res => res.json())
      .then(item => setData(item?.data))
  }

  useEffect(() => {
    getDiscounts()
  }, [])

  // delete Discount
  const deleteDiscount = (id) => {
    fetch(`https://back.ifly.com.uz/api/discount/${id}`, {
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
          getDiscounts()
        } else {
          toast.error(item?.message?.message)
        }
      })
  }


  return (
    <>
      <div className='shadow-md p-6 bg-white rounded-lg'>
        <div className='flex  justify-between'>
          <h2 className='font-bold text-xl mb-6'>Discounts</h2>
          <button
            onClick={() => setOpen(true)}
            className='cursor-pointer text-white py-2 px-4 bg-green-500 hover:bg-green-600 rounded-lg mb-4 transition-all duration-150  '>Add Discount</button>
        </div>
        <div>
          <table className='min-w-full table-auto'>
            <thead>
              <tr className='bg-gray-200'>
                <th className='border border-gray-300 p-2'>№</th>
                <th className='border border-gray-300 p-2'>Discount (%)</th>
                <th className='border border-gray-300 p-2'>Created Date</th>
                <th className='border border-gray-300 p-2'>Finished Date</th>
                <th className='border border-gray-300 p-2'>Status</th>
                <th className='border border-gray-300 p-2'>Actions</th>
              </tr>
            </thead>
            {data && <tbody >
              {data.map((item, i) => (
                <tr key={i} className='text-center hover:bg-gray-100'>
                  <td className='border border-gray-300 p-2'>{item.id}</td>
                  <td className='border border-gray-300 p-2'>{item.discount}%</td>
                  <td className='border border-gray-300 p-2'>{item.started_at}</td>
                  <td className='border border-gray-300 p-2'>{item.finished_at}</td>
                  <td className={`border border-gray-300 p-2 ${item.status ? "text-green-600" : "text-red-600"}  `}>{item.status ? "Active" : "Inactive"}</td>
                  <td className='border border-gray-300 p-2 w-[200px]'>
                    <button className='px-4 py-2 mr-2 cursor-pointer bg-yellow-500 text-white rounded-lg hover:bg-yellow-600 transition'>Edit</button>
                    <button
                      onClick={() => deleteDiscount(item.id)}
                      className='px-4 py-2 cursor-pointer bg-red-500 text-white rounded-lg hover:bg-red-600 transition'>Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>}
          </table>
          {data.length === 0 ? <TailSpin
            height={80}
            width={80}
            color="#00ff00"
            ariaLabel="loading"
            radius="1"
            wrapperStyle={{}}
            wrapperClass=""
            visible={true}
          /> : <span></span>}
        </div>
      </div>
      {open && <DiscountModal setOpen={setOpen} getDiscounts={getDiscounts} />}
    </>
  )
}

export default Discount