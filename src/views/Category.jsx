import React from 'react'

function Category() {
  return (
    <div className='shadow-md p-6 bg-white rounded-lg'>
          <div className='flex  justify-between'>
            <h2 className='font-bold text-xl mb-6'>Category</h2>
            <button className='cursor-pointer text-white py-2 px-4 bg-green-500 hover:bg-green-600 rounded-lg mb-4 transition-all duration-150  '>Add Category</button>
          </div>
          <div>
            <table className='min-w-full table-auto'>
              <thead>
                <tr className='bg-gray-200'>
                  <th className='border border-gray-300 p-2'>№</th>
                  <th className='border border-gray-300 p-2'>Title ENG</th>
                  <th className='border border-gray-300 p-2'>Title RU</th>
                  <th className='border border-gray-300 p-2'>Title DE	</th>
                  <th className='border border-gray-300 p-2'>Actions</th>
                </tr>
              </thead>
              <tbody>
                <tr className='text-center hover:bg-gray-100'>
                  <td className='border border-gray-300 p-2'>1</td>
                  <td className='border border-gray-300 p-2'>en</td>
                  <td className='border border-gray-300 p-2'>ru</td>
                  <td className='border border-gray-300 p-2'>de</td>
                  <td className='border border-gray-300 p-2 w-[200px]'>
                    <button className='px-4 py-2 mr-2 cursor-pointer bg-yellow-500 text-white rounded-lg hover:bg-yellow-600 transition'>Edit</button>
                    <button className='px-4 py-2 cursor-pointer bg-red-500 text-white rounded-lg hover:bg-red-600 transition'>Delete</button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
  )
}

export default Category