import React, { useState } from 'react'
import { getToken } from '../../utils/auth';
import { MdClose } from "react-icons/md";
import { toast } from 'react-toastify';
function NewsModal({ getNews, setOpen }) {


  const [titleEn, setTitleEn] = useState("");
  const [titleRu, setTitleRu] = useState("");
  const [titleDe, setTitleDe] = useState("");
  const [desEn, setDesEn] = useState("");
  const [desRu, setDesRu] = useState("");
  const [desDe, setDesDe] = useState("");
  const [image, setImage] = useState(null);

  const addCategoryItem = (e) => {
    e.preventDefault();

    if (!image) {
      toast.error("Please upload an image");
      return;
    }

    const formData = new FormData();
    const fields = {
      title_en: titleEn,
      title_ru: titleRu,
      title_de: titleDe,
      description_en: desEn,
      description_ru: desRu,
      description_de: desDe,
      image: image
    };

    Object.entries(fields).forEach(([key, value]) => {
      formData.append(key, value);
    });

    fetch("https://back.ifly.com.uz/api/news", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${getToken()}`
      },
      body: formData
    })
      .then(res => res.json())
      .then(item => {
        if (item?.success) {
          toast.success("News successfully added");
          getNews();
          setOpen(false);

          // Formni tozalash
          setTitleEn("");
          setTitleRu("");
          setTitleDe("");
          setDesEn("");
          setDesRu("");
          setDesDe("");
          setImage(null);
        } else {
          toast.error(item?.message || "Something went wrong");
        }
      });


  };


  return (
    <div onClick={() => setOpen(false)} className='fixed inset-0 bg-black/60 flex  justify-center items-center z-50 overflow-y-auto' >
      <div onClick={(e) => e.stopPropagation()} className='bg-white rounded-lg relative  shadow-md p-6 max-h-[90vh] w-[45%]'>
        <button
          onClick={() => setOpen(false)}
          className='absolute top-2 right-2 text-white bg-red-500 px-2 py-2 cursor-pointer rounded-full'><MdClose /></button>
        <h2 className='font-bold text-xl mb-4'>Add Category</h2>
        <form onSubmit={addCategoryItem}>
          <label>
            <input
              required
              value={titleEn}
              placeholder='Title En'
              onChange={(e) => setTitleEn(e.target.value)}
              className='outline-none w-full p-2 border border-gray-300 rounded mb-1'
              type="text" />
          </label>
          <label>
            <input
              required
              value={titleRu}
              placeholder='Title Ru'
              onChange={(e) => setTitleRu(e.target.value)}
              className='outline-none w-full p-2 border border-gray-300 rounded mb-1'
              type="text" />
          </label>
          <label>
            <input
              required
              value={titleDe}
              placeholder='Title De'
              onChange={(e) => setTitleDe(e.target.value)}
              className='outline-none w-full p-2 border border-gray-300 rounded mb-1'
              type="text" />
          </label>
          <label>
            <textarea
              value={desEn}
              onChange={(e) => setDesEn(e.target.value)}
              required
              className="outline-none border border-gray-300 w-full p-2  rounded"
              placeholder='Description (EN)'></textarea>
          </label>
          <label>
            <textarea
              value={desRu}
              onChange={(e) => setDesRu(e.target.value)}
              required
              className="outline-none border border-gray-300 w-full p-2  rounded"
              placeholder='Description (RU)'></textarea>
          </label>
          <label>
            <textarea
              value={desDe}
              onChange={(e) => setDesDe(e.target.value)}
              required
              className="outline-none border border-gray-300 w-full p-2  rounded"
              placeholder='Description (DE)'></textarea>
          </label>
          <label>
            <input
              required
              type="file"
              accept="image/*"
              className='w-full'
              onChange={(e) => setImage(e.target.files[0])} />
          </label>
          <button className='w-full mt-4 cursor-pointer p-2 bg-green-500 hover:bg-green-600  text-white rounded-lg'>Add Category</button>
        </form>
      </div>
    </div>
  )
}

export default NewsModal