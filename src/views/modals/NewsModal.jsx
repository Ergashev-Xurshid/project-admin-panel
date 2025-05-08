import React, { useEffect, useState } from 'react';
import { getToken } from '../../utils/auth';
import { MdClose } from "react-icons/md";
import { toast } from 'react-toastify';

function NewsModal({ getNews, setOpen, editData }) {
  const [form, setForm] = useState({
    titleEn: '',
    titleRu: '',
    titleDe: '',
    desEn: '',
    desRu: '',
    desDe: '',
    image: null
  });

  useEffect(() => {
    if (editData) {
      setForm({
        titleEn: editData.title_en || '',
        titleRu: editData.title_ru || '',
        titleDe: editData.title_de || '',
        desEn: editData.description_en || '',
        desRu: editData.description_ru || '',
        desDe: editData.description_de || '',
        image: null
      });
    }
  }, [editData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    setForm(prev => ({ ...prev, image: e.target.files[0] }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();

    formData.append("title_en", form.titleEn);
    formData.append("title_ru", form.titleRu);
    formData.append("title_de", form.titleDe);
    formData.append("description_en", form.desEn);
    formData.append("description_ru", form.desRu);
    formData.append("description_de", form.desDe);
    if (form.image) formData.append("file", form.image);

    const url = editData
      ? `https://back.ifly.com.uz/api/news/${editData.id}`
      : "https://back.ifly.com.uz/api/news";

    const method = editData ? "PATCH" : "POST";

    try {
      const res = await fetch(url, {
        method,
        headers: {
          Authorization: `Bearer ${getToken()}`
        },
        body: formData
      });

      const data = await res.json();

      if (data?.success) {
        toast.success(editData ? "News updated!" : "News added!");
        getNews();
        setOpen(false);
      } else {
        toast.error(data?.message?.message || "Xatolik yuz berdi");
      }
    } catch (error) {
      toast.error("Server bilan bog‘lanishda xatolik");
    }
  };

  return (
    <div onClick={() => setOpen(false)} className='fixed inset-0 bg-black/60 flex justify-center items-center z-50 overflow-y-auto'>
      <div onClick={(e) => e.stopPropagation()} className='bg-white overflow-y-auto rounded-lg relative shadow-md p-6 max-h-[90vh] w-[45%]'>
        <button
          onClick={() => setOpen(false)}
          className='absolute top-2 right-2 text-white bg-red-500 px-2 py-2 cursor-pointer rounded-full'>
          <MdClose />
        </button>
        <h2 className='font-bold text-xl mb-4'>{editData ? "Edit" : "Add"} News</h2>

        <form onSubmit={handleSubmit}>
          {['titleEn', 'titleRu', 'titleDe'].map((field, i) => (
            <input
              key={field}
              name={field}
              value={form[field]}
              onChange={handleChange}
              required={!editData}
              placeholder={`Title ${field.slice(-2).toUpperCase()}`}
              className='outline-none w-full p-2 border border-gray-300 rounded mb-1'
              type="text"
            />
          ))}

          {['desEn', 'desRu', 'desDe'].map((field, i) => (
            <textarea
              key={field}
              name={field}
              value={form[field]}
              onChange={handleChange}
              required={!editData}
              placeholder={`Description ${field.slice(-2).toUpperCase()}`}
              className='outline-none border border-gray-300 w-full p-2 rounded mb-1'
            />
          ))}

          <input
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className='w-full mb-3'
            required={!editData}
          />

          <button type="submit" className='w-full mt-4 cursor-pointer p-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg'>
            {editData ? 'Update' : 'Create'} News
          </button>
        </form>
      </div>
    </div>
  );
}

export default NewsModal;
