import React, { useEffect, useState } from 'react'
import { getToken } from '../../utils/auth';
import { MdClose } from "react-icons/md";
import { toast } from 'react-toastify';
import { uploud } from '../../assets';

function productsModal({ getProducts, setOpen, editData }) {


  const [titleEn, setTitleEn] = useState("");
  const [titleRu, setTitleRu] = useState("");
  const [titleDe, setTitleDe] = useState("");
  const [desEn, setDesEn] = useState("");
  const [desRu, setDesRu] = useState("");
  const [desDe, setDesDe] = useState("");
  const [image, setImage] = useState(null);
  const [price, setPrice] = useState("");
  const [priceNum, setPriceNum] = useState("");

  const addProductItem = (e) => {
    e.preventDefault();

    const formdata = new FormData();
    formdata.append("title_en", titleEn);
    formdata.append("title_ru", titleRu);
    formdata.append("title_de", titleDe);
    formdata.append("description_en", desEn);
    formdata.append("description_ru", desRu);
    formdata.append("description_de", desDe);
    formdata.append("price", price);
    formdata.append("min_sell", priceNum);
    formdata.append("category_id", 2);
    formdata.append("discount_id", 1);

    formdata.append("sizes_id[]", 1);
    formdata.append("sizes_id[]", 2);
    formdata.append("sizes_id[]", 3);

    formdata.append("colors_id[]", 4);
    formdata.append("colors_id[]", 5);

    // Agar siz bir nechta fayl tanlayotgan bo‘lsangiz (input type='file' da `multiple` bor bo‘lsa)
    if (Array.isArray(image)) {
      image.forEach((img) => {
        formdata.append("images", img); // to‘g‘ri kalit nomi bilan
      });
    } else if (image) {
      formdata.append("images", image); // bitta bo‘lsa ham array bo‘lishi kerak
    }

    formdata.append("materials", JSON.stringify({ cotton: "80%", wool: "20%" }));

    fetch("https://back.ifly.com.uz/api/product", {
      method: "POST",
      headers: {
        "Content-type" : "multipart/form-data",
        "Authorization": `Bearer ${getToken()}`
      },
      body: formdata
    })
      .then(res => res.json())
      .then(item => {
        if (item?.success) {
          toast.success("Product successfully added");
          getProducts();
          setOpen(false);

          // Reset
          setTitleEn(""); setTitleRu(""); setTitleDe("");
          setDesEn(""); setDesRu(""); setDesDe("");
          setImage(null);
          setPrice(""); setPriceNum("");
        } else {
          toast.error(item?.message?.message);
        }
      });
  };



  // useEffect(() => {
  //   if (editData?.id) {
  //     setTitleEn(editData?.titleEn || "");
  //     setTitleRu(editData?.titleRu || "");
  //     setTitleDe(editData?.titleDe || "");
  //     setDesEn(editData?.desEn || "");
  //     setDesRu(editData?.desRu || "");
  //     setDesDe(editData?.desDe || "");
  //   }
  // }, [editData]);


  //  const editProduct = async (e)=>{
  //     e.preventDefault()

  //     const resurs = await fetch(`https://back.ifly.com.uz/api/Product/${editData?.id}`,{
  //       method:"PATCH",
  //       headers: {
  //         "Content-type":"multipart/form-data",
  //         "Authorization": `Bearer ${getToken()}`
  //       },
  //       body: formdata
  //     })
  //     const item = await resurs.json()
  //     if (item?.success) {
  //       toast.success(),
  //         // ma'lumotlarni yangilash 
  //         getProducts()
  //       // modalni yopish 
  //       setOpen(false)
  //     } else {
  //       toast.error(item?.message?.message[0])
  //     }
  //   }



  return (
    <div onClick={() => setOpen(false)} className='fixed inset-0 bg-black/60 flex  justify-center items-center z-50 overflow-y-auto' >
      <div onClick={(e) => e.stopPropagation()} className='relative bg-white p-6 rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto custom-scrollbar'>
        <button
          onClick={() => setOpen(false)}
          className='absolute top-2 right-2 text-white bg-red-500 px-2 py-2 cursor-pointer rounded-full'><MdClose /></button>
        <h2 className='font-bold text-xl mb-4'> {editData?.id > 0 ? "Edit" : "Add"} Products</h2>
        <form onSubmit={editData?.id > 0 ? editProduct : addProductItem}>
          <label>
            <p className='block mb-1 text-sm font-medium'>Product Title (English)</p>
            <input
              required={!editData?.id}
              value={titleEn}
              placeholder='Product Title (English)'
              onChange={(e) => setTitleEn(e.target.value)}
              className='outline-none w-full p-2 border border-gray-300 rounded mb-4'
              type="text" />
          </label>
          <label>
            <p className='block mb-1 text-sm font-medium'>Product Title (Russian)</p>
            <input
              required={!editData?.id}
              value={titleRu}
              placeholder='Product Title (Russian)'
              onChange={(e) => setTitleRu(e.target.value)}
              className='outline-none w-full p-2 border border-gray-300 rounded mb-4'
              type="text" />
          </label>
          <label>
            <p className='block mb-1 text-sm font-medium'>Product Title (German)</p>
            <input
              required={!editData?.id}
              value={titleDe}
              placeholder='Product Title (German)'
              onChange={(e) => setTitleDe(e.target.value)}
              className='outline-none w-full p-2 border border-gray-300 rounded mb-4'
              type="text" />
          </label>
          <label>
            <p className='block mb-1 text-sm font-medium'>Product Description (English)</p>
            <textarea
              value={desEn}
              onChange={(e) => setDesEn(e.target.value)}
              required={!editData?.id}
              className="outline-none border border-gray-300 w-full p-2  rounded"
              placeholder='Product Description (English)'></textarea>
          </label>
          <label>
            <p className='block mb-1 text-sm font-medium'>Product Description (Russian)</p>
            <textarea
              value={desRu}
              onChange={(e) => setDesRu(e.target.value)}
              required={!editData?.id}
              className="outline-none border border-gray-300 w-full p-2  rounded"
              placeholder='Product Description (Russian)'></textarea>
          </label>
          <label>
            <p className='block mb-1 text-sm font-medium'>Product Description (German)</p>
            <textarea
              value={desDe}
              onChange={(e) => setDesDe(e.target.value)}
              required={!editData?.id}
              className="outline-none border border-gray-300 w-full p-2  rounded"
              placeholder='Product Description (German)'></textarea>
          </label>
          <label>
            <p className='block mb-1 text-sm font-medium'>Price</p>
            <input
              required={!editData?.id}
              value={price}
              placeholder='Product Title (English)'
              onChange={(e) => setPrice(e.target.value)}
              className='outline-none w-full p-2 border border-gray-300 rounded mb-4'
              type="number" />
          </label>
          <label>
            <p className='block mb-1 text-sm font-medium'>Minimal nechta sotish</p>
            <input
              required={!editData?.id}
              value={priceNum}
              placeholder='Product Title (English)'
              onChange={(e) => setPriceNum(e.target.value)}
              className='outline-none w-full p-2 border border-gray-300 rounded mb-4'
              type="number" />
          </label>
          <label>
            <p className='block mb-1 text-sm font-medium'>Category</p>
            <select className='w-full p-2 border border-gray-300 rounded mb-2'>
              <option value="3">Product</option>
            </select>
          </label>
          <label>
            <p className='block mb-1 text-sm font-medium'>Sizes</p>
            <div className='flex flex-wrap gap-4 mb-4'>
              <div className='flex items-center'>
                <input type="checkbox" className='mr-2' />
                <label className='text-sm'>1</label>
              </div>
            </div>
          </label>
          <label>
            <p className='block mb-1 text-sm font-medium'>Colors</p>
            <div className='flex flex-wrap gap-4 mb-4'>
              <div className='flex items-center'>
                <input type="checkbox" className='mr-2' />
                <label className='text-sm'>red</label>
              </div>
            </div>
          </label>
          <label>
            <p className='block mb-1 text-sm font-medium'>Discount</p>
            <select className='w-full p-2 border border-gray-300 rounded mb-4'>
              <option value="1">No Discount</option>
              <option value="2">1234</option>
            </select>
          </label>
          <label>
            <p className='block mb-1 text-sm font-medium'>Upload Images</p>
            <div className='mb-4'>
              <div className='flex items-center justify-center w-full'>
                <label className='flex flex-col items-center justify-center w-full h-30 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100'>
                  <div className='flex flex-col items-center justify-center pt-5 pb-6'>
                    <img className='w-12 h-12 mb-2' src={uploud} alt="" />
                    <p className='mb-2 text-sm text-gray-500'>
                      <span className='font-semibold'>Click to upload</span> or drag and drop </p>
                    <p className='text-xs text-gray-500'>Multiple images allowed (PNG, JPG, JPEG)</p>
                  </div>
                  <input type="file" accept="image/*" multiple onChange={(e) => setImage(Array.from(e.target.files))} className='hidden' />
                </label>
              </div>
            </div>
          </label>
          <button className='w-full bg-green-500 cursor-pointer text-white rounded py-2 hover:bg-green-600 transition'>Save Product</button>
        </form>
      </div>
    </div>
  )
}

export default productsModal