import React, { useState } from 'react';
import { getToken } from '../../utils/auth';
import { MdClose } from "react-icons/md";
import { toast } from 'react-toastify';
import { uploud } from '../../assets';

function ProductsModal({ getProducts, setOpen, editData }) {
  const [form, setForm] = useState({
    titleEn: '',
    titleRu: '',
    titleDe: '',
    desEn: '',
    desRu: '',
    desDe: '',
    price: '',
    priceNum: '',
    image: null,
    sizes: [],
    colors: [],
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    setForm(prev => ({ ...prev, image: Array.from(e.target.files) }));
  };

  const handleCheckboxChange = (e, key, id) => {
    const checked = e.target.checked;
    setForm(prev => {
      const updated = checked
        ? [...prev[key], id]
        : prev[key].filter(item => item !== id);
      return { ...prev, [key]: updated };
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();

    formData.append("title_en", form.titleEn);
    formData.append("title_ru", form.titleRu);
    formData.append("title_de", form.titleDe);
    formData.append("description_en", form.desEn);
    formData.append("description_ru", form.desRu);
    formData.append("description_de", form.desDe);
    formData.append("price", form.price);
    formData.append("min_sell", form.priceNum);
    formData.append("category_id", 2); // static for now
    formData.append("discount_id", 1); // static for now
    formData.append("materials", JSON.stringify({ cotton: "80%", wool: "20%" }));

    form.sizes.forEach(id => formData.append("sizes_id[]", id));
    form.colors.forEach(id => formData.append("colors_id[]", id));

    if (form.image) {
      form.image.forEach(img => formData.append("images", img));
    }

    fetch("https://back.ifly.com.uz/api/product", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${getToken()}`
        // Do NOT set 'Content-Type' here manually
      },
      body: formData
    })
    .then(res => res.json())
    .then(data => {
      if (data?.success) {
        toast.success("Product successfully added");
        getProducts();
        setOpen(false);
        setForm({
          titleEn: '', titleRu: '', titleDe: '',
          desEn: '', desRu: '', desDe: '',
          price: '', priceNum: '', image: null,
          sizes: [], colors: []
        });
      } else {
        toast.error(data?.message?.message || "Something went wrong.");
      }
    })
    .catch(() => toast.error("Server error"));
  };

  // Example static sizes/colors
  const sizesList = [1, 2, 3];
  const colorsList = [
    { id: 4, name: 'Red' },
    { id: 5, name: 'Blue' }
  ];

  return (
    <div onClick={() => setOpen(false)} className="fixed inset-0 bg-black/60 flex justify-center items-center z-50 overflow-y-auto">
      <div onClick={e => e.stopPropagation()} className="relative bg-white p-6 rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <button onClick={() => setOpen(false)} className="absolute top-2 right-2 text-white bg-red-500 p-2 rounded-full"><MdClose /></button>
        <h2 className="text-xl font-bold mb-4">{editData?.id ? 'Edit' : 'Add'} Product</h2>

        <form onSubmit={handleSubmit}>
          {[
            { label: 'Product Title (English)', name: 'titleEn' },
            { label: 'Product Title (Russian)', name: 'titleRu' },
            { label: 'Product Title (German)', name: 'titleDe' },
          ].map(({ label, name }) => (
            <label key={name}>
              <p className="text-sm font-medium mb-1">{label}</p>
              <input
                name={name}
                value={form[name]}
                onChange={handleInputChange}
                required={!editData?.id}
                className="w-full p-2 mb-4 border rounded"
                type="text"
                placeholder={label}
              />
            </label>
          ))}

          {[
            { label: 'Product Description (English)', name: 'desEn' },
            { label: 'Product Description (Russian)', name: 'desRu' },
            { label: 'Product Description (German)', name: 'desDe' },
          ].map(({ label, name }) => (
            <label key={name}>
              <p className="text-sm font-medium mb-1">{label}</p>
              <textarea
                name={name}
                value={form[name]}
                onChange={handleInputChange}
                required={!editData?.id}
                className="w-full p-2 mb-4 border rounded"
                placeholder={label}
              />
            </label>
          ))}

          <label>
            <p className="text-sm font-medium mb-1">Price</p>
            <input
              name="price"
              type="number"
              value={form.price}
              onChange={handleInputChange}
              className="w-full p-2 mb-4 border rounded"
              required={!editData?.id}
            />
          </label>

          <label>
            <p className="text-sm font-medium mb-1">Minimal sotish miqdori</p>
            <input
              name="priceNum"
              type="number"
              value={form.priceNum}
              onChange={handleInputChange}
              className="w-full p-2 mb-4 border rounded"
              required={!editData?.id}
            />
          </label>

          <label>
            <p className="text-sm font-medium mb-1">Sizes</p>
            <div className="flex gap-4 mb-4">
              {sizesList.map(id => (
                <label key={id} className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={form.sizes.includes(id)}
                    onChange={(e) => handleCheckboxChange(e, 'sizes', id)}
                  />
                  Size {id}
                </label>
              ))}
            </div>
          </label>

          <label>
            <p className="text-sm font-medium mb-1">Colors</p>
            <div className="flex gap-4 mb-4">
              {colorsList.map(({ id, name }) => (
                <label key={id} className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={form.colors.includes(id)}
                    onChange={(e) => handleCheckboxChange(e, 'colors', id)}
                  />
                  {name}
                </label>
              ))}
            </div>
          </label>

          <label>
            <p className="text-sm font-medium mb-1">Upload Images</p>
            <div className="mb-4 border-dashed border-2 border-gray-300 rounded-lg p-4 cursor-pointer bg-gray-50 hover:bg-gray-100">
              <label className="flex flex-col items-center">
                <img src={uploud} alt="Upload" className="w-12 h-12 mb-2" />
                <p className="text-sm text-gray-500 mb-1"><strong>Click</strong> or drag to upload</p>
                <p className="text-xs text-gray-500">Multiple images allowed</p>
                <input type="file" accept="image/*" multiple onChange={handleFileChange} className="hidden" />
              </label>
            </div>
          </label>

          <button className="w-full bg-green-500 text-white py-2 rounded hover:bg-green-600 transition">
            {editData?.id ? 'Update Product' : 'Save Product'}
          </button>
        </form>
      </div>
    </div>
  );
}

export default ProductsModal;
