import React from 'react';
import { createBrowserRouter , createRoutesFromElements, RouterProvider ,Route } from 'react-router-dom';
//pages
import Login from './components/Login';
import Home from './pages/home/Home';
//admin views
import Products from './views/Products';
import Category from './views/Category';
import Discount from './views/Discount';
import Sizes from './views/Sizes';
import Colors from './views/Colors';
import Faq from './views/Faq';
import Contact from './views/Contact';
import Team from './views/Team';
import News from './views/News';
//layouts
import RootLayout from './layout/RootLayout';
import AdminLayout from './layout/AdminLayout';


function App() {
  const routes = createBrowserRouter (
    createRoutesFromElements(
        <Route path="/"  element={<RootLayout/>}>
          <Route index element={<Home />} />
          <Route path="login" element={<Login />} />
          {/* Admin page  */}
          <Route path="admin" element={<AdminLayout/>}>
            <Route index element={<Products />} />
            <Route path="products" element={<Products />} />
            <Route path="category" element={<Category />} />
            <Route path="discount" element={<Discount />} />
            <Route path="sizes" element={<Sizes />} />
            <Route path="colors" element={<Colors />} />
            <Route path="faq" element={<Faq />} />
            <Route path="contact" element={<Contact />} />
            <Route path="team" element={<Team />} />
            <Route path="news" element={<News />} />
          </Route>
        </Route>
    )
  )
  return (
    <>
      <RouterProvider router={routes} />
    </>
  );
}

export default App;
