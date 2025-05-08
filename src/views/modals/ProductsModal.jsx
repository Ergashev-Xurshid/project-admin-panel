import React, { useEffect, useState } from 'react';
import { getToken } from '../../utils/auth';
import { MdClose } from "react-icons/md";
import { toast } from 'react-toastify';
import { uploud } from '../../assets';

function ProductsModal({ getProducts, setOpen, editData }) {
  const [sizesList, setSizesList] = useState([]);
  const [colorsList, setColorsList] = useState([]);
  const [discountsList, setDiscountsList] = useState([]);
  const [categoryList, setCategoryList] = useState([]);

  const [form, setForm] = useState({
    titleEn: '',
    titleRu: '',
    titleDe: '',
    desEn: '',
    desRu: '',
    desDe: '',
    price: '',
    priceNum: '',
    image: [],
    sizes: [],
    colors: [],
    categoryId: '',
    discountId: '',
    materials: [{ name: '', value: '' }]
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = getToken();
        const [sizesRes, colorsRes, discountsRes, categoryRes] = await Promise.all([
          fetch("https://back.ifly.com.uz/api/sizes", { headers: { Authorization: `Bearer ${token}` } }),
          fetch("https://back.ifly.com.uz/api/colors", { headers: { Authorization: `Bearer ${token}` } }),
          fetch("https://back.ifly.com.uz/api/discount", { headers: { Authorization: `Bearer ${token}` } }),
          fetch("https://back.ifly.com.uz/api/category", { headers: { Authorization: `Bearer ${token}` } })
        ]);

        setSizesList((await sizesRes.json())?.data || []);
        setColorsList((await colorsRes.json())?.data || []);
        setDiscountsList((await discountsRes.json())?.data || []);
        setCategoryList((await categoryRes.json())?.data || []);
      } catch {
        toast.error("Ma'lumotlarni yuklab bo‘lmadi");
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    if (editData) {
      setForm({
        titleEn: editData.title_en || '',
        titleRu: editData.title_ru || '',
        titleDe: editData.title_de || '',
        desEn: editData.description_en || '',
        desRu: editData.description_ru || '',
        desDe: editData.description_de || '',
        price: editData.price || '',
        priceNum: editData.min_sell || '',
        image: [],
        sizes: editData.sizes?.map(s => s.id) || [],
        colors: editData.colors?.map(c => c.id) || [],
        categoryId: editData.category?.id || '',
        discountId: editData.discount?.id || '',
        materials: editData.materials
          ? Object.entries(editData.materials).map(([name, value]) => ({ name, value }))
          : [{ name: '', value: '' }]
      });
    }
  }, [editData]);

  const handleChange = e => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const handleCheckbox = (key, id) => {
    setForm(prev => {
      const updated = prev[key].includes(id)
        ? prev[key].filter(item => item !== id)
        : [...prev[key], id];
      return { ...prev, [key]: updated };
    });
  };

  const handleMaterialChange = (index, key, value) => {
    const updated = [...form.materials];
    updated[index][key] = value;
    setForm(prev => ({ ...prev, materials: updated }));
  };

  const addMaterial = () => setForm(prev => ({ ...prev, materials: [...prev.materials, { name: '', value: '' }] }));
  const removeMaterial = (index) => {
    setForm(prev => ({ ...prev, materials: prev.materials.filter((_, i) => i !== index) }));
  };

  const handleFileChange = (e) => {
    setForm(prev => ({ ...prev, image: Array.from(e.target.files) }));
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
    formData.append("price", form.price);
    formData.append("min_sell", form.priceNum);
    formData.append("category_id", form.categoryId);
    formData.append("discount_id", form.discountId);

    form.sizes.forEach(id => formData.append("sizes_id[]", id));
    form.colors.forEach(id => formData.append("colors_id[]", id));
    form.image.forEach(img => formData.append("files", img));

    const materials = {};
    form.materials.forEach(({ name, value }) => {
      if (name && value) materials[name] = value;
    });
    formData.append("materials", JSON.stringify(materials));

    const url = editData
      ? `https://back.ifly.com.uz/api/product/${editData.id}`
      : "https://back.ifly.com.uz/api/product";

    const method = editData ? "PATCH" : "POST";

    try {
      const res = await fetch(url, {
        method,
        headers: { Authorization: `Bearer ${getToken()}` },
        body: formData
      });
      const result = await res.json();

      if (result?.success) {
        toast.success(editData ? "Product updated!" : "Product created!");
        getProducts();
        setOpen(false);
      } else {
        toast.error(result?.message?.message || "Xatolik yuz berdi");
      }
    } catch (error) {
      toast.error("Server bilan bog‘lanishda xatolik");
    }
  };

  return (
    <div onClick={() => setOpen(false)} className="fixed inset-0 bg-black/60 flex justify-center items-center z-50 overflow-y-auto">
      <div onClick={e => e.stopPropagation()} className="relative bg-white p-6 rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <button onClick={() => setOpen(false)} className="absolute top-2 right-2 text-white bg-red-500 p-2 rounded-full"><MdClose /></button>
        <h2 className="text-xl font-bold mb-4">{editData ? 'Edit Product' : 'Add Product'}</h2>

        <form onSubmit={handleSubmit}>
          {/* Titles & Descriptions */}
          {['titleEn', 'titleRu', 'titleDe'].map(key => (
            <input
              key={key}
              name={key}
              value={form[key]}
              onChange={handleChange}
              className="w-full mb-3 p-2 border rounded"
              placeholder={`Title ${key.slice(-2).toUpperCase()}`}
              required
            />
          ))}
          {['desEn', 'desRu', 'desDe'].map(key => (
            <textarea
              key={key}
              name={key}
              value={form[key]}
              onChange={handleChange}
              className="w-full mb-3 p-2 border rounded"
              placeholder={`Description ${key.slice(-2).toUpperCase()}`}
              required
            />
          ))}

          {/* Numeric fields */}
          <input type="number" name="price" value={form.price} onChange={handleChange} placeholder="Price" className="w-full mb-3 p-2 border rounded" required />
          <input type="number" name="priceNum" value={form.priceNum} onChange={handleChange} placeholder="Minimal sotish soni" className="w-full mb-3 p-2 border rounded" required />

          {/* Category */}
          <select name="categoryId" value={form.categoryId} onChange={handleChange} className="w-full mb-3 p-2 border rounded">
            <option value="">Kategoriya tanlang</option>
            {categoryList.map(cat => (
              <option key={cat.id} value={cat.id}>{cat.name_en}</option>
            ))}
          </select>

          {/* Sizes */}
          <div className="mb-3">
            <p className="font-medium">Sizes:</p>
            {sizesList.map(size => (
              <label key={size.id} className="inline-block mr-4">
                <input
                  type="checkbox"
                  checked={form.sizes.includes(size.id)}
                  onChange={() => handleCheckbox('sizes', size.id)}
                /> {size.size}
              </label>
            ))}
          </div>

          {/* Colors */}
          <div className="mb-3">
            <p className="font-medium">Colors:</p>
            {colorsList.map(color => (
              <label key={color.id} className="inline-block mr-4">
                <input
                  type="checkbox"
                  checked={form.colors.includes(color.id)}
                  onChange={() => handleCheckbox('colors', color.id)}
                /> {color.color_en}
              </label>
            ))}
          </div>

          {/* Discount */}
          <select name="discountId" value={form.discountId} onChange={handleChange} className="w-full mb-3 p-2 border rounded">
            <option value="">Chegirma tanlang</option>
            {discountsList.map(dis => (
              <option key={dis.id} value={dis.id}>{dis.discount}%</option>
            ))}
          </select>

          {/* Materials */}
          <div className="mb-3">
            <p className="font-medium mb-1">Materials:</p>
            {form.materials.map((mat, i) => (
              <div key={i} className="flex gap-2 mb-2">
                <input value={mat.name} onChange={(e) => handleMaterialChange(i, 'name', e.target.value)} placeholder="Nomi" className="flex-1 p-2 border rounded" />
                <input value={mat.value} onChange={(e) => handleMaterialChange(i, 'value', e.target.value)} placeholder="Qiymat" className="w-24 p-2 border rounded" />
                <button type="button" onClick={() => removeMaterial(i)} className="text-red-500">✕</button>
              </div>
            ))}
            <button type="button" onClick={addMaterial} className="text-blue-500 text-sm">+ Add Material</button>
          </div>

          {/* Upload */}
          <div className="mb-4 border-dashed border-2 border-gray-300 rounded-lg p-4 bg-gray-50 hover:bg-gray-100">
            <label className="flex flex-col items-center cursor-pointer">
              <img src={uploud} alt="Upload" className="w-12 h-12 mb-2" />
              <p className="text-sm">Click or drag to upload images</p>
              <input type="file" accept="image/*" multiple onChange={handleFileChange} className="hidden" />
            </label>
          </div>

          <button type="submit" className="w-full bg-green-500 text-white py-2 rounded hover:bg-green-600">
            {editData ? 'Update Product' : 'Create Product'}
          </button>
        </form>
      </div>
    </div>
  );
}

export default ProductsModal;
