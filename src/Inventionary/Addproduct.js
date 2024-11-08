import React, { useState } from 'react';
import ProductForm from './Form';
import ImageUploadSection from './Imgupload';

function AddProduct() {
  const [formData, setFormData] = useState({
    productName: '',
    productCategory: '',
    sellingPrice: '',
    costPrice: '',
    quantityInStock: '',
    orderType: '',
    shortDescription: '',
    longDescription: '',
    discountEnabled: false,
    expiryDateEnabled: false,
    dateAdded: '',
    timeAdded: '',
    coverImage: null,
    additionalImages: []
  });

  const handleFormDataChange = (field, value) => {
    setFormData((prevData) => ({
      ...prevData,
      [field]: value,
    }));
  };

  const handleSave = () => {

    let savedItems = JSON.parse(localStorage.getItem('productData4key'));
  
   
    if (!Array.isArray(savedItems)) {
      savedItems = [];
    }
    
    
    const newItem = { ...formData, id: Date.now() }; 
    savedItems.push(newItem);
    
   
    localStorage.setItem('productData4key', JSON.stringify(savedItems));
    
    alert('Data saved ');
    

    console.log(savedItems, 'Saved Items in Local Storage');
  };
  

  return (
    <div>
      <div className="flex justify-between items-center mb-4 h-[36px]">
        <h1 className="text-xl font-semibold text-[#45464E]">New Inventory</h1>
        <div className="flex gap-4">
          <select className="bg-[#1C1D22] w-[171px] h-[36px] rounded text-white">
            <option>Save as draft</option>
          </select>
          <button
            onClick={handleSave}
            className="bg-[#5570F1] w-[171px] h-[36px] rounded text-white"
          >
            Save & Publish
          </button>
        </div>
      </div>

      {/* Product Form */}
      <ProductForm formData={formData} onFormDataChange={handleFormDataChange} />

     
    </div>
  );
}

export default AddProduct;
