import React, { useState } from 'react'
import { saveTokin } from '../utils/auth';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { FiEye ,FiEyeOff } from "react-icons/fi";




function Login() {

  const [login , setLogin]=useState("");
  const [password , setPassword]=useState("");
  const [loginChek,setLoginChek]=useState(false)
  const [passwordChek,setPasswordChek]=useState(false)

  
  const navigate = useNavigate();

  const [eye,setEye]=useState(false)

  const handleSubmit = (e) =>{
    e.preventDefault()    


    if(login === ""){
      setLoginChek(true)
    }
    if(password === ""){
      setPasswordChek(true)
    }

    if(login !== "" && password !== ""){

      fetch("https://back.ifly.com.uz/api/auth/login",{
        method:"POST",
        headers:{"Content-type":"application/json"},
        body:JSON.stringify({
          login:login,
          password:password,
        })
      })
      .then(res=>res.json())
      .then(item => {
        if(item?.success){
          saveTokin(item?.data?.access_token),
          navigate('/admin')
          toast.success(item?.data?.message)
        }else{
          toast.error(item?.message?.message),
          setLogin(""),
          setPassword("")
        }
      })

    }

      
  }


  return (
    <div className='flex items-center justify-center w-full h-[100vh] bg-gray-100'>
      <div className='bg-white rounded-xl shadow-md p-8 h-[400px] w-[400px]'>
        <h1 className='font-bold text-2xl text-center mb-6'>Login</h1>
        <form onSubmit={handleSubmit}>
          <label className='mb-4  inline-block w-full'>
            <p className='text-gray-700 font-bold text-sm mb-2 block'>Login</p>
          <input 
            autoComplete='off'
            className='border border-gray-300 p-2 outline-none mb-1 rounded-lg w-full' 
            value={login}
            onChange={(e)=>{
              setLogin(e.target.value)
              if (e.target.value !== "") setLoginChek(false)
            }}
            type="text" />
            {loginChek && <p className='text-red-500 text-sm'>Login kiritish majburiy</p>}
          </label>
          <label className='mb-4  relative inline-block w-full'>
            <p className='text-gray-700 font-bold text-sm mb-2 block'>Password</p>
          <input 
            autoComplete='off'
            className='border border-gray-300 p-2 pr-10 outline-none mb-1 rounded-lg w-full' 
            value={password}
            onChange={(e)=>{
              setPassword(e.target.value)
              if (e.target.value !== "") setPasswordChek(false)
            }}
            type= {eye ? "text": "password"}/>
            <div
              onClick={()=>setEye(!eye)} 
              className='absolute right-[12px] top-[42px] cursor-pointer'>
              {eye ? <FiEyeOff /> :<FiEye />}
            </div>
            {passwordChek && <p className='text-red-500 text-sm'>Parol kiritish majburiy</p>}
          </label>
            <button className='cursor-pointer text-white p-2 bg-green-500 rounded-lg w-full hover:bg-green-600 outline-none' type='submit'>Login</button>
        </form>
      </div>
    </div>
  )
}

export default Login