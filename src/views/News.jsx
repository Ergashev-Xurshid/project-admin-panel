import React, { useEffect, useState } from 'react'
import { getToken } from '../utils/auth'
import { toast } from 'react-toastify'
import NewsModal from './modals/NewsModal'
import { noData } from '../assets'
function News() {

  // Open modal 
  const [open, setOpen] = useState(false)

  const [data, setData] = useState([])


  // get News 
  const getNews = () => {
    fetch("https://back.ifly.com.uz/api/news")
      .then(res => res.json())
      .then(item => setData(item?.data)
      )
  }

  useEffect(() => {
    getNews()
  }, [])


  //delete News
  const deleteNews = (id) => {

    fetch(`https://back.ifly.com.uz/api/news/${id}`, {
      method: "DELETE",
      headers: {
        "Authorization": `Bearer ${getToken()}`
      }
    })
      .then(res => res.json())
      .then(item => {
        if (item?.success) {
          toast.success(item?.data?.message)
          getNews()
        } else {
          toast.error(item?.message?.message)
        }
      })
  }



  return (
    <>
      <div className='shadow-md p-6 bg-white rounded-lg'>
        <div className='flex  justify-between'>
          <h2 className='font-bold text-xl mb-6'>News</h2>
          <button onClick={() => setOpen(true)} className='cursor-pointer text-white py-2 px-4 bg-green-500 hover:bg-green-600 rounded-lg mb-4 transition-all duration-150  '>Add News</button>
        </div>
        <div>
          <table className='min-w-full table-auto'>
            <thead>
              <tr className='bg-gray-200'>
                <th className='border border-gray-300 p-2'>№</th>
                <th className='border border-gray-300 p-2'>Image</th>
                <th className='border border-gray-300 p-2'>Title (EN)</th>
                <th className='border border-gray-300 p-2'>Description</th>
                <th className='border border-gray-300 p-2'>Actions</th>
              </tr>
            </thead>
            {data && <tbody >
              {data.map((item, i) => (
                <tr key={i} className='text-center hover:bg-gray-100'>
                  <td className='border border-gray-300 p-2'>{i + 1}</td>
                  <td className='border border-gray-300 p-2 cursor-pointer'>
                    <img src={`https://back.ifly.com.uz/uploads/${item.image}`} alt="img" className='w-16 h-16 object-cover mx-auto rounded' />
                  </td>
                  <td className='border border-gray-300 p-2'>{item.title_en}</td>
                  <td className='border border-gray-300 p-2'>{item.description_en}</td>
                  <td className='border border-gray-300 p-2 w-[200px]'>
                    <button className='px-4 py-2 mr-2 cursor-pointer bg-yellow-500 text-white rounded-lg hover:bg-yellow-600 transition'>Edit</button>
                    <button
                      onClick={() => deleteNews(item.id)}
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
      {open && <NewsModal setOpen={setOpen} getNews={getNews} />}
    </>
  )
}

export default News