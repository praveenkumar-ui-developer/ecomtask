import React, { useState } from 'react';
import { BsCalendar, BsClock } from 'react-icons/bs';
import ToggleSwitch from './Toggle';
import ImageUploadSection from './Imgupload';

function ProductForm({formData,onFormDataChange}) {

  


  
  return (
    <div className="flex flex-col md:flex-row p-6 gap-6">
      <div className="w-full md:w-2/3 bg-white p-6 rounded-lg shadow">
        <h2 className="text-lg font-semibold mb-4">Product Information</h2>
        
        <div className="flex flex-col md:flex-row gap-6">
          <div className="flex flex-col w-full md:w-1/2">
            <input
              type="text"
              value={formData.productName}
              placeholder="Product Name"
              onChange={(e) => onFormDataChange('productName', e.target.value)}
              
              className="border border-gray-300 p-2 rounded mb-4"
            />

            <select
              value={formData.productCategory}
              onChange={(e) => onFormDataChange('productCategory', e.target.value)}
              className="border border-gray-300 p-2 rounded mb-4"
            >
              <option value="">Select Product Category</option>
              <option value="Electronics">Electronics</option>
              <option value="Fashion">Fashion</option>
              <option value="Groceries">Groceries</option>
            </select>

            <div className="md:flex">
              <input
                type="number"
                value={formData.sellingPrice}
                placeholder="Selling Price"
                onChange={(e) => onFormDataChange('sellingPrice', e.target.value)}
                className="border border-gray-300 p-2 rounded mb-4 md:w-1/2 md:mr-2"
              />

              <input
                type="number"
                value={formData.costPrice}
                placeholder="Cost Price"
                onChange={(e) => onFormDataChange('costPrice', e.target.value)}
                className="border border-gray-300 p-2 rounded mb-4 md:w-1/2 md:ml-1"
              />
            </div>

            <input
              type="number"
              value={formData.quantityInStock}
              placeholder="Quantity in Stock"
              onChange={(e) => onFormDataChange('quantityInStock', e.target.value)}
              className="border border-gray-300 p-2 rounded mb-4"
            />

            <input
              type="text"
              value={formData.orderType}
              placeholder="Order Type"
              onChange={(e) => onFormDataChange('ordertType', e.target.value)}
              className="border border-gray-300 p-2 rounded mb-4"
            />
             <div className='flex justify-between'>
            <div>Add Discount</div>
            <ToggleSwitch
              label="Add Discount"
              onToggle={(checked) => onFormDataChange('discountEnabled', checked)}
              initialChecked={formData.discountEnabled}
            />
            </div>
            <div className='flex justify-between'>
            <div>Add expiry Date</div>
            <ToggleSwitch
              label="Add Expiry Date"
              onToggle={(checked) => onFormDataChange('expiryDateEnabled', checked)}
              initialChecked={formData.expiryDateEnabled}
            />
          </div>
          </div>

          <div className="flex flex-col w-full md:w-1/2">
            <textarea
              value={formData.shortDescription}
              placeholder="Short Description"
              onChange={(e) => onFormDataChange('shortDescription', e.target.value)}
              className="border border-gray-300 p-2 rounded mb-4"
            />

            <textarea
              value={formData.longDescription}
              placeholder="Product Long Description"
              onChange={(e) => onFormDataChange('longDescription', e.target.value)}
              className="border border-gray-300 p-2 rounded mb-4"
            />
          <div className='flex justify-between'>
            <div className="flex items-center gap-2 w-full">
              <BsCalendar />
              <input
                type="date"
                value={formData.dateAdded}
                onChange={(e) => onFormDataChange('dateAdded', e.target.value)}
                className="border border-gray-300 rounded p-2"
              />
            </div>

            <div className="flex items-center gap-2">
              <BsClock />
              <input
                type="time"
                value={formData.timeAdded}
                onChange={(e) => onFormDataChange('formData', e.target.value)}
                className="border border-gray-300 rounded p-2"
              />
            </div>
          </div>  
          </div>
        </div>
      </div>

      <div className="w-full md:w-1/3 flex flex-col gap-4">
      <ImageUploadSection formData={formData} handleFormDataChange={onFormDataChange} />
   
      </div>
    </div>
  );
}

export default ProductForm;
