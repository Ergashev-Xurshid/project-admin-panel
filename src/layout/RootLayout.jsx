import React from 'react'
import { Outlet } from 'react-router-dom'
import { ToastContainer } from 'react-toastify';

function RootLayout() {
  return (
    <>
      <header></header>
      <main>
        {<Outlet />}
        <ToastContainer/>
      </main>
      <footer></footer>
    </>
  )
}

export default RootLayout