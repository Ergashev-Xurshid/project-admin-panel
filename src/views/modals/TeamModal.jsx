import React, { useEffect, useState } from 'react'
import { MdClose } from "react-icons/md";
import { getToken } from '../../utils/auth';
import { toast } from 'react-toastify';

function TeamModal({setOpen , getTeam ,editData}) {


  const [full_name, setFull_name] = useState("");
  const [image, setImage] = useState("");
  const [position_en, setPositionEn] = useState("");
  const [position_ru, setPositionRu] = useState("");
  const [position_de, setPositionDe] = useState("");



  const formdata = new FormData()

  formdata.append("full_name",full_name)
  formdata.append("position_de",position_de)
  formdata.append("position_en",position_en)
  formdata.append("position_ru",position_ru)
  formdata.append("file",image)


  const addCTeamItem = (e) => {
    e.preventDefault()

     fetch("https://back.ifly.com.uz/api/team-section", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${getToken()}`
      },
      body: formdata
    })
      .then(res => res.json())
      .then(item => {
        if (item?.success) {
          toast.success("Team member successfully added!");
            // ma'lumotlarni yangilash 
            getTeam()
          // modalni yopish 
          setOpen(false)
        } else {
          toast.error(item?.message?.message[0])
        }
      })

      setFull_name("");
      setPositionEn("");
      setPositionRu("");
      setPositionDe("");
      setImage(null);
  }


  // edit team 


  useEffect(() => {
    if (editData?.id) {
      setFull_name(editData.full_name || "");
      setPositionEn(editData.position_en || "");
      setPositionRu(editData.position_ru || "");
      setPositionDe(editData.position_de || "");
    }
  }, [editData]);



  const editTeam = async (e)=>{
    e.preventDefault()

    const resurs = await fetch(`https://back.ifly.com.uz/api/team-section/${editData.id}`,{
      method:"PATCH",
      headers: {
        "Authorization": `Bearer ${getToken()}`
      },
      body: formdata
    })
    const item = await resurs.json()
    if (item?.success) {
      toast.success(),
        // ma'lumotlarni yangilash 
        getTeam()
      // modalni yopish 
      setOpen(false)
    } else {
      toast.error(item?.message?.message[0])
    }

    setFull_name("");
    setPositionEn("");
    setPositionRu("");
    setPositionDe("");
    setImage(null);
  }
  return (
    <div onClick={() => setOpen(false)} className='fixed inset-0 bg-black/60 flex  justify-center items-center z-50 overflow-y-auto' >
      <div onClick={(e) => e.stopPropagation()} className='bg-white rounded-lg relative  overflow-y-auto shadow-md p-6 max-h-[90vh] w-[45%]'>
        <button
          onClick={() => setOpen(false)}
          className='absolute top-2 right-2 text-white bg-red-500 px-2 py-2 cursor-pointer rounded-full'><MdClose /></button>
        <h2 className='font-bold text-xl mb-4'> {editData?.id > 0  ? "Edit" : "Add"} Team Member</h2>
        <form onSubmit={editData?.id > 0  ? editTeam : addCTeamItem}>
          <label>
            <p className='block mb-1 text-sm font-medium'>Full Name</p>
            <input
              required={!editData?.id}
              onChange={(e) => setFull_name(e.target.value)}
              className='outline-none w-full p-2 border border-gray-300 rounded mb-1'
              type="text" 
              value={full_name}/>
          </label>
          <label>
            <p className='block mb-1 text-sm font-medium'>Position  (English)</p>
            <textarea
              required={!editData?.id}
              onChange={(e) => setPositionEn(e.target.value)}
              className='outline-none w-full p-2 border border-gray-300 rounded mb-1'
              type="text"
              value={position_en}>
            </textarea>
          </label>
          <label>
            <p className='block mb-1 text-sm font-medium'>Position (Russian)</p>
            <textarea
              required={!editData?.id}
              onChange={(e) => setPositionRu(e.target.value)}
              className='outline-none w-full p-2 border border-gray-300 rounded mb-1'
              type="text"
              value={position_ru}>
            </textarea>
          </label>
          <label>
            <p className='block mb-1 text-sm font-medium'>Position (German)</p>
            <textarea
              required={!editData?.id}
              onChange={(e) => setPositionDe(e.target.value)}
              className='outline-none w-full p-2 border border-gray-300 rounded mb-1'
              type="text"
              value={position_de}>
            </textarea>
          </label>
          <label>
            <p className='block mb-1 text-sm font-medium'>Upload Image</p>
            <input
              required
              onChange={(e) => setImage(e.target.files[0])}
              accept='image/*'
              className='w-full p-2 border border-gray-300 rounded mb-2'
              type="file" />
          </label>
          <button type='submit' className='w-full mt-4 cursor-pointer p-2 bg-green-500 hover:bg-green-600  text-white rounded-lg'>{editData?.id > 0  ? "Edit" : "Add"} Team</button>
        </form>
      </div>
    </div>
  )
}

export default TeamModal