import React from 'react';
import { CiCreditCard2 } from "react-icons/ci";
import { GoPeople } from "react-icons/go";
import { Link } from 'react-router-dom';

function Main() {

  const savedItems = JSON.parse(localStorage.getItem('productData4key')) || [];

 
  const items = Array.isArray(savedItems) ? savedItems : [savedItems];

  return (
    <div className="">
      {/* Header */}
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-xl font-semibold">Inventory Summary</h1>
        <Link to='/inventionary'><button className="bg-[#5570F1] w-[205px] h-[36px] rounded text-white">
          + Add a New Product
        </button></Link>
      </div>

      {/* Inventory Summary Cards */}
      <div className="flex flex-col md:flex-row gap-4">
        
       
        <div className="flex-1 p-5 bg-[#5570F1] rounded text-white">
          <CiCreditCard2 className="w-5 h-5 mb-4" />
          <div className="flex justify-between">
            <div className="flex flex-col items-center">
              <h5 className="text-sm">All Products</h5>
              <h5 className="text-lg font-bold">{items.length}</h5>
            </div>
            <div className="flex flex-col items-center">
              <h5 className="text-sm">Active</h5>
              <h5 className="text-lg font-bold">{items.filter(item => item.status === 'active').length}</h5>
            </div>
          </div>
        </div>


        <div className="flex-1 p-5 bg-white rounded shadow">
          <GoPeople className="w-5 h-5 mb-4 text-gray-600" />
          <div className="flex justify-between">
            <div className="flex flex-col items-center">
              <h5 className="text-sm">Low Stock</h5>
              <h5 className="text-lg font-bold">{items.filter(item => item.stock < 10).length}</h5>
            </div>
            <div className="flex flex-col items-center">
              <h5 className="text-sm">Expired</h5>
              <h5 className="text-lg font-bold">{items.filter(item => item.expired).length}</h5>
            </div>
            <div className="flex flex-col items-center">
              <h5 className="text-sm">1-Star Rating</h5>
              <h5 className="text-lg font-bold">{items.filter(item => item.rating === 1).length}</h5>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Main;
