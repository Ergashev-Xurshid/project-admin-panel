import React, { useEffect, useState } from 'react'
import { getToken } from '../../utils/auth';
import { MdClose } from 'react-icons/md';
import { toast } from 'react-toastify';


function FaqEdit({ editID, getFaq, seteditOpen, dataID }) {




  const [questionEn, setQuestionEn] = useState("");
  const [questionRu, setQuestionRu] = useState("");
  const [questionDe, setQuestionDe] = useState("");
  const [answerEn, setAnswerEn] = useState("");
  const [answerRu, setAnswerRu] = useState("");
  const [answerDe, setAnswerDe] = useState("");



  useEffect(() => {
    if (dataID) {
      setQuestionEn(dataID.question_en || "");
      setQuestionRu(dataID.question_ru || "");
      setQuestionDe(dataID.question_de || "");
      setAnswerEn(dataID.answer_en || "");
      setAnswerRu(dataID.answer_ru || "");
      setAnswerDe(dataID.answer_de || "");
    }
  }, [dataID])





  const addFaqItem = async (e) => {
    e.preventDefault()

    const res = await fetch(`https://back.ifly.com.uz/api/faq/${editID}`, {
      method: "PATCH",
      headers: {
        "Content-type": "application/json",
        "Authorization": `Bearer ${getToken()}`
      },
      body: JSON.stringify({
        "question_en": questionEn,
        "question_ru": questionRu,
        "question_de": questionDe,
        "answer_en": answerEn,
        "answer_ru": answerRu,
        "answer_de": answerDe
      })
    })

    const item = await res.json()
    if (item?.success) {
      toast.success("FAQ edited successfully")
      getFaq()
      seteditOpen(false)

      // formni tozalash 
      setQuestionEn("")
      setQuestionRu("")
      setQuestionDe("")
      setAnswerEn("")
      setAnswerRu("")
      setAnswerDe("")
    } else {
      toast.error("FAQ edit failed")
    }
  }





  return (
    <div onClick={() => seteditOpen(false)} className='fixed inset-0 bg-black/60 flex  justify-center items-center z-50 overflow-y-auto' >
      <div className='bg-white overflow-y-auto  rounded-lg relative  shadow-md p-6 max-h-[90vh] w-[45%]'>
        <button
          onClick={() => seteditOpen(false)}
          className='absolute top-2 right-2 text-white bg-red-500 px-2 py-2 cursor-pointer rounded-full'><MdClose /></button>
        <h2 className='font-bold text-xl mb-4'>Edit FAQ</h2>
        <form onSubmit={addFaqItem}>
          <label className='mb-4'>
            <p className='block mb-1 text-sm font-medium'>Question (English)</p>
            <input
              required
              placeholder='Enter question in English'
              value={questionEn}
              onChange={(e) => setQuestionEn(e.target.value)}
              className='outline-none w-full p-2 border border-gray-300 rounded mb-1'
              type="text" />
          </label>
          <label className='mb-4'>
            <p className='block mb-1 text-sm font-medium'>Answer (English)</p>
            <textarea
              required
              value={answerEn}
              onChange={(e) => setAnswerEn(e.target.value)}
              placeholder='Enter answer in English'
              className='w-full p-2 border border-gray-300 rounded'>
            </textarea>
          </label>
          <label className='mb-4'>
            <p className='block mb-1 text-sm font-medium'>Question (Russian)</p>
            <input
              required
              placeholder='Enter question in Russian'
              value={questionRu}
              onChange={(e) => setQuestionRu(e.target.value)}
              className='outline-none w-full p-2 border border-gray-300 rounded mb-1'
              type="text" />
          </label>
          <label className='mb-4'>
            <p className='block mb-1 text-sm font-medium'>Answer (Russian)</p>
            <textarea
              required
              value={answerRu}
              onChange={(e) => setAnswerRu(e.target.value)}
              placeholder='Enter answer in Russian'
              className='w-full p-2 border border-gray-300 rounded'>
            </textarea>
          </label>
          <label className='mb-4'>
            <p className='block mb-1 text-sm font-medium'>Question (German)</p>
            <input
              required
              placeholder='Enter question in German'
              value={questionDe}
              onChange={(e) => setQuestionDe(e.target.value)}
              className='outline-none w-full p-2 border border-gray-300 rounded mb-1'
              type="text" />
          </label>
          <label className='mb-4'>
            <p className='block mb-1 text-sm font-medium'>Answer (German)</p>
            <textarea
              required
              value={answerDe}
              onChange={(e) => setAnswerDe(e.target.value)}
              placeholder='Enter answer in German'
              className='w-full p-2 border border-gray-300 rounded'>
            </textarea>
          </label>
          <button className='w-full mt-4 cursor-pointer p-2 bg-green-500 hover:bg-green-600  text-white rounded-lg'>Updated FAQ</button>
        </form>
      </div>
    </div>
  )
}

export default FaqEdit