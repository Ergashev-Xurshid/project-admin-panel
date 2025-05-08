import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import { getToken } from '../utils/auth'
import ProductsModal from "./modals/ProductsModal"

function Products() {
  // Open modal 
  const [open, setOpen] = useState(false)

  const [data, setData] = useState([])

  const getProducts = async () => {
    const res = await fetch("https://back.ifly.com.uz/api/product?page=1&limit=10&min_sell=1")
    const item = await res.json()
    setData(item?.data?.products);
    console.log(item?.data?.products);
  }

  useEffect(() => {
    getProducts()
  }, [])



  const deleteProduccts = async (id) => {
    const res = await fetch(`https://back.ifly.com.uz/api/product/${id}`, {
      method: "Delete",
      headers: { "Authorization": `Bearer ${getToken()}` }
    })
    const item = await res.json();
    if (item?.success) {
      toast.success(item?.data?.message)
      getProducts()
    } else {
      toast.error(item?.message?.message)
    }
  }


  // edit 
const [editData , setEditData] = useState()


  return (
    <>
      <div className='shadow-md p-6 bg-white rounded-lg'>
        <div className='flex  justify-between'>
          <h2 className='font-bold text-xl mb-6'>Products</h2>
          <button onClick={() =>{
            setOpen(true)
            setEditData(null)
            }} className='cursor-pointer text-white py-2 px-4 bg-green-500 hover:bg-green-600 rounded-lg mb-4 transition-all duration-150  '>Add Product</button>
        </div>
        <div>
          <table className='min-w-full table-auto'>
            <thead>
              <tr className='bg-gray-200'>
                <th className='border border-gray-300 p-2'>№</th>
                <th className='border border-gray-300 p-2'>Images</th>
                <th className='border border-gray-300 p-2'>Title</th>
                <th className='border border-gray-300 p-2'>Description</th>
                <th className='border border-gray-300 p-2'>Price</th>
                <th className='border border-gray-300 p-2'>Category</th>
                <th className='border border-gray-300 p-2'>Colors</th>
                <th className='border border-gray-300 p-2'>Sizes</th>
                <th className='border border-gray-300 p-2'>Discount</th>
                <th className='border border-gray-300 p-2'>Materials</th>
                <th className='border border-gray-300 p-2'>Actions</th>
              </tr>
            </thead>
            <tbody>
              {data.map((item, i) => (
                <tr key={item.id} className='text-center hover:bg-gray-100'>
                  <td className='border border-gray-300 p-2'>{i + 1}</td>
                  <td className='border border-gray-300 p-2 cursor-pointer w-[150px] h-[100px]'>
                    <img src={`https://back.ifly.com.uz/${item?.images?.[0]}`} className='w-full h-full rounded-sm' alt="img" />
                  </td>
                  <td className='border border-gray-300 p-2'>{item?.title_en}</td>
                  <td className='border border-gray-300 p-2'>{item?.description_en}</td>
                  <td className='border border-gray-300 p-2'>{item?.price}</td>
                  <td className='border border-gray-300 p-2'>{item?.category?.name_en}</td>
                  <td className='border border-gray-300 p-2'>{item?.colors?.[0]?.color_en}</td>
                  <td className='border border-gray-300 p-2'>{item?.sizes?.[0]?.size}</td>
                  <td className='border border-gray-300 p-2'>{item?.discount?.discount}</td>
                  <td className='border border-gray-300 p-2'>{Object.keys(item.materials)[0]}                </td>
                  <td className='border border-gray-300 p-2'>
                    <button 
                      onClick={()=>{
                        setOpen(true)
                        setEditData(item)
                      }}
                      className='px-4 py-2 mr-2 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600 transition cursor-pointer'>Edit</button>
                    <button
                      onClick={() => deleteProduccts(item.id)}
                      className='px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition cursor-pointer'>Delete</button>
                  </td>
                </tr>
              ))
              }
            </tbody>
          </table>
        </div>
      </div>
      {open && <ProductsModal editData={editData} setOpen={setOpen} getProducts={getProducts} />}
    </>
  )
}

export default Products