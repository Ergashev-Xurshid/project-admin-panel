import React, { useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { isAuthenticated, logout } from '../utils/auth';
import Sidebar from '../components/Sidebar';

const AdminLayout = () => {
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated()) {
      navigate('/login');
    }
  }, [navigate]);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };
  

  return (
    <section>
      <Sidebar/>
      <div className='ml-[256px] bg-gray-100 h-[100vh]'>
        <div className='w-full py-2 flex justify-end items-center'>
          <button className='mr-7 mt-4 py-2 px-4 bg-red-600 hover:bg-red-700 cursor-pointer rounded-lg text-white' onClick={handleLogout}>Log Out</button>
        </div>
        <div className='p-6'>
          <Outlet/>
        </div>
      </div>
    </section>
  );
};

export default AdminLayout;
