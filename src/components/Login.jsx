import React, { useState } from 'react'

function Login() {
  const [login , setLogin]=useState("");
  const [password , setPassword]=useState("");

  const handleSubmit = (e) =>{
    e.preventDefault()    
    fetch("https://back.ifly.com.uz/api/auth/login",{
      method:"POST",
      headers:{"Content-type":"application/json"},
      body:JSON.stringify({
        login:login,
        password:password,
      })
    })
    .then(res=>res.json())
    .then(item=>console.log(item?.data?.message))
    .catch(err=> console.error(err)
    )  
  }


  return (
    <div className='flex items-center justify-center w-full h-[100vh]'>
      <div className='border border-gray-500 p-5 h-[400px] w-[400px]'>
        <form onSubmit={handleSubmit}>
          <input 
          className='border border-gray-400 p-2 outline-none mb-4'
            value={login}
            onChange={(e)=>setLogin(e.target.value)}
            type="text" />
          <input 
          className='border border-gray-400 p-2 outline-none mb-4'
            value={password}
            onChange={(e)=>setPassword(e.target.value)}
            type="text" />
            <button className='border border-gray-400 p-2 outline-none ml-4' type='submit'>submit</button>
        </form>
      </div>
    </div>
  )
}

export default Login