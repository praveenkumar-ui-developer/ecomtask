import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

function ProductView() {
  const { id } = useParams(); 
  const [product, setProduct] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
 
    const savedProducts = JSON.parse(localStorage.getItem('productData4key')) || [];
   
    const selectedProduct = savedProducts.find((item) => item.id === Number(id));
    if (selectedProduct) {
      setProduct(selectedProduct);
    } else {
      console.error("Product not found");
    }
  }, [id]);

  if (!product) {
    return <p>Loading product details...</p>;
  }

  return (
    <div className="p-3 bg-white max-w-screen-lg mx-auto rounded-lg shadow">
      <div className="flex justify-between items-start mb-6">
        <div>
          <h2 className="text-3xl font-semibold">{product.productName}</h2>
          <p className="text-gray-500">
            <span className="font-semibold">Date Added:</span> {product.dateAdded} - {product.timeAdded}
          </p>
          <p className="text-gray-500">
            <span className="font-semibold">Product URL:</span>{' '}
            <a href="#" className="text-blue-600">{`1nancystores.com/${product.productName.toLowerCase().replace(/ /g, "-")}`}</a>
          </p>
        </div>
        <div className="flex gap-4">
          <button
            onClick={() => navigate(`/edit-product/${id}`)}
            className="bg-gray-300 px-4 py-2 rounded text-sm font-semibold"
          >
            Edit Product
          </button>
          <button className="bg-red-500 text-white px-4 py-2 rounded text-sm font-semibold">
            Unpublish Product
          </button>
        </div>
      </div>

      <div className="flex gap-6 mb-6">
  <img
    src={product.coverImage}
    alt={product.productName}
    className="w-32 h-32 sm:w-48 sm:h-48 object-cover rounded-lg shadow"
  />
  <div className="grid grid-cols-3 gap-6 w-full">
    {/* Left Column: Product Details */}
    <div className="bg-gray-100 p-4 rounded-lg flex flex-col justify-center items-start">
      <p className="font-semibold text-gray-500">Last Order</p>
      <p className="text-gray-700">{product.lastOrderDate}</p>
      <p className="font-semibold text-gray-500">Price</p>
      <p className="text-gray-700">₦{product.price}</p>
      <p className="font-semibold text-gray-500">In-Stock</p>
      <p className="text-gray-700">{product.quantityInStock}</p>
      <span className="bg-green-100 text-green-500 font-semibold rounded-full px-3 py-1 mt-2">Published</span>
    </div>

    {/* Center Column: Total Orders */}
    <div className="bg-gray-100 p-4 rounded-lg flex flex-col items-center justify-center">
      <div className="flex items-center gap-2 mb-1">
        <p className="font-semibold text-gray-500">Total Orders</p>
      </div>
      <p className="text-xl font-bold text-gray-700">₦{product.totalOrders}</p>
    </div>

    {/* Right Column: Views and Favourites */}
    <div className="bg-gray-100 p-4 rounded-lg flex flex-col items-center justify-center">
      <p className="font-semibold text-gray-500">Views</p>
      <p className="text-lg font-bold text-gray-700">{product.views}</p>
      <p className="font-semibold text-gray-500">Favourites</p>
      <p className="text-lg font-bold text-gray-700">{product.favourites}</p>
    </div>
  </div>
</div>


      <div className="mt-8">
      <div className="mt-8">
  <h3 className="text-xl font-semibold mb-4">Orders Summary</h3>
  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
    {/* First Card with three elements */}
    <div className='flex flex-col'>
    <div className="bg-gray-100 p-4 rounded-lg flex justify-between">
      {['All Orders', 'Pending', 'Completed'].map((status, index) => (
        <div key={index} className="mb-4">
          <p className="font-semibold">{status}</p>
          <p>{product[status.toLowerCase().replace(/ /g, '')]}</p>
        </div>
      ))}
    </div>
    <div className="bg-gray-100 p-4 rounded-lg flex justify-between">
      {['0', '0', '0'].map((status, index) => (
        <div key={index} className="mb-4">
          <p className="font-semibold">{status}</p>
          <p>{product[status.toLowerCase().replace(/ /g, '')]}</p>
        </div>
      ))}
      
    </div>
    </div>



    {/* Second Card with three elements */}
    <di className='flex flex-col'>
    <div className="bg-gray-100 p-4 rounded-lg flex justify-between">
      {['Canceled', 'Returned', 'Damaged'].map((status, index) => (
        <div key={index} className="mb-4">
          <p className="font-semibold">{status}</p>
          <p>{product[status.toLowerCase().replace(/ /g, '')]}</p>
        </div>
      ))}
      
    </div>
    <div className="bg-gray-100 p-4 rounded-lg flex justify-between">
      {['0', '0', '0'].map((status, index) => (
        <div key={index} className="mb-4">
          <p className="font-semibold">{status}</p>
          <p>{product[status.toLowerCase().replace(/ /g, '')]}</p>
        </div>
      ))}
      
    </div>
    </di>
  </div>
</div>

      </div>

      <div className="mt-8 overflow-x-auto">
        <h3 className="text-xl font-semibold mb-4">Purchases</h3>
        <table className="min-w-full border text-sm">
          <thead>
            <tr className="bg-gray-200 text-gray-700">
              <th className="border px-4 py-2 text-left">Order Date</th>
              <th className="border px-4 py-2 text-left">Order Type</th>
              <th className="border px-4 py-2 text-left">Unit Price</th>
              <th className="border px-4 py-2 text-left">Qty</th>
              <th className="border px-4 py-2 text-left">Discount</th>
              <th className="border px-4 py-2 text-left">Order Total</th>
              <th className="border px-4 py-2 text-left">Status</th>
            </tr>
          </thead>
          <tbody>
            {product.purchases && product.purchases.length > 0 ? (
              product.purchases.map((purchase, index) => (
                <tr key={index}>
                  <td className="border px-4 py-2">{purchase.date}</td>
                  <td className="border px-4 py-2">{purchase.orderType}</td>
                  <td className="border px-4 py-2">₦{purchase.unitPrice}</td>
                  <td className="border px-4 py-2">{purchase.quantity}</td>
                  <td className="border px-4 py-2">₦{purchase.discount}</td>
                  <td className="border px-4 py-2">₦{purchase.orderTotal}</td>
                  <td className="border px-4 py-2">
                    <span className={purchase.status === 'Completed' ? 'text-green-600' : ''}>
                      {purchase.status}
                    </span>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="7" className="border px-4 py-2 text-center">No purchases available</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default ProductView;
