import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { isAuthenticated, logout } from '../utils/auth';

const AdminPanel = () => {
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated()) {
      navigate('/');
    }
  }, [navigate]);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <div>
      <h2>Admin Panel</h2>
      <p>Bu yerda faqat tokeni bor foydalanuvchi bo‘lishi mumkin.</p>
      <button onClick={handleLogout}>Chiqish</button>
    </div>
  );
};

export default AdminPanel;
