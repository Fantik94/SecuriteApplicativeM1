import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import "bootstrap/dist/css/bootstrap.min.css";

import {  BrowserRouter , Routes , Route } from "react-router-dom"
import Accueil from './composants/front/Accueil';
import NotFound from './composants/front/NotFound';
import AddBlog from './composants/front/AddBlog';
import BlogList from './composants/front/BlogList';
import EditBlog from './composants/front/EditBlog';
import Register from './composants/front/Register';
import Login from './composants/front/Login';
import { AuthProvider } from './composants/context/AuthContext';

ReactDOM.createRoot(document.getElementById('root')).render(
  <BrowserRouter>
  <AuthProvider>
      <Routes>
        <Route path='/' element={<App />}>
          <Route index element={<Accueil />} />
          <Route path='/add-blog'element={<AddBlog />} />
          <Route path='/blog-list'element={<BlogList />} />
          <Route path="/edit/:id" element={<EditBlog />} />
          <Route path="/register" element={<Register/>} />
          <Route path="/login" element={<Login/>} />

          <Route path="*" element={<NotFound/>} />
        </Route>
      </Routes>
      </AuthProvider>
  </BrowserRouter>
)
