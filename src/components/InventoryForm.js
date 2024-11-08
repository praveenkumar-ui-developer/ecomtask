import React, { useState } from 'react';

function InventoryForm({ onAddItem }) {
  const [productName, setProductName] = useState('');
  const [category, setCategory] = useState('');
  const [price, setPrice] = useState('');
  const [stock, setStock] = useState('');
  const [image, setImage] = useState(''); // New field for product image URL
  const [status, setStatus] = useState('unpublished'); // New field for status (default is unpublished)

  const handleSubmit = (e) => {
    e.preventDefault();

    const newItem = {
      id: Date.now(),
      productName, // Changed to match the name of the field in the object
      category,
      price,
      stock,
      image, 
      status, 
    };

    // Get existing items from local storage or initialize with an empty array
    const existingItems = JSON.parse(localStorage.getItem('inventoryItems4key')) || [];
    existingItems.push(newItem);
    
    // Save updated items to local storage
    localStorage.setItem('inventoryItems4key', JSON.stringify(existingItems));
    
    // Log the saved items correctly
    const savedItems = JSON.parse(localStorage.getItem('inventoryItems4key')) || [];
    console.log(savedItems, 'from localStorage');
    
    // Call onAddItem to update state in parent component (if needed)
    onAddItem(newItem);

    // Reset form fields
    setProductName('');
    setCategory('');
    setPrice('');
    setStock('');
    setImage('');
    setStatus('unpublished');
  };

  return (
    <div className="p-6 bg-white">
      <h2 className="text-2xl font-bold mb-4">New Inventory Item</h2>
      <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <input
          type="text"
          placeholder="Product Name"
          value={productName}
          onChange={(e) => setProductName(e.target.value)}
          className="border p-2 rounded"
        />
        <input
          type="text"
          placeholder="Category"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="border p-2 rounded"
        />
        <input
          type="number"
          placeholder="Price"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          className="border p-2 rounded"
        />
        <input
          type="number"
          placeholder="Stock Quantity"
          value={stock}
          onChange={(e) => setStock(e.target.value)}
          className="border p-2 rounded"
        />
        <input
          type="text"
          placeholder="Image URL"
          value={image}
          onChange={(e) => setImage(e.target.value)}
          className="border p-2 rounded"
        />
        <select
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          className="border p-2 rounded"
        >
          <option value="unpublished">Unpublished</option>
          <option value="published">Published</option>
        </select>
        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded col-span-full">Add Item</button>
      </form>
    </div>
  );
}

export default InventoryForm;
