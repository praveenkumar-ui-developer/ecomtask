// src/App.js
import React, { useState } from 'react';
import InventoryForm from './components/InventoryForm';
import InventorySummary from './components/InventorySummary';
import Navbar from './components/Navbar';
import Sidenav from './components/Sidenav'
import Main from './components/Main';
import { Route, Routes } from 'react-router-dom';
import Home from './Navigation/Home';
import Addproduct from './Inventionary/Addproduct';
import ProductView from './View/ProductView';
function App() {
  

  return (
    <div className="bg-slate-50">
      <div className=''><Sidenav/></div>
      <Navbar/>
      <div className='ml-16 pl-6'>
        <Routes>
          <Route path='/' element={<Home/>  }/>
          <Route path='/inventionary' element={<Addproduct/>  }/>
          <Route path="/product/:id" element={<ProductView />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
