import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaSearch, FaFilter, FaShareAlt, FaTrashAlt, FaAngleLeft, FaAngleRight } from 'react-icons/fa';

function InventorySummary() {
  const [items, setItems] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredItems, setFilteredItems] = useState([]);
  const [selectedItems, setSelectedItems] = useState(new Set());
  const [categoryFilter, setCategoryFilter] = useState('');
  const [sortConfig, setSortConfig] = useState({ key: 'productName', direction: 'asc' });
  const [bulkActionStatus, setBulkActionStatus] = useState('publish');
  const navigate = useNavigate();

  const handleRowClick = (id) => {
    navigate(`/product/${id}`);
  };

  useEffect(() => {
    const savedItems = JSON.parse(localStorage.getItem('productData4key')) || [];

    if (Array.isArray(savedItems)) {
      setItems(savedItems);
      setFilteredItems(savedItems);
    } else {
      console.error("Expected savedItems to be an array but got:", savedItems);
    }
  }, []);

  useEffect(() => {
    const searchResults = items.filter(
      (item) =>
        item.productName && item.productName.toLowerCase().includes(searchTerm.toLowerCase()) &&
        (categoryFilter ? item.productCategory === categoryFilter : true)
    );
    setFilteredItems(searchResults);
    setCurrentPage(1);
  }, [searchTerm, categoryFilter, items]);

  const handleSort = (column) => {
    const direction = sortConfig.key === column && sortConfig.direction === 'asc' ? 'desc' : 'asc';
    const sortedItems = [...filteredItems].sort((a, b) => {
      if (a[column] < b[column]) return direction === 'asc' ? -1 : 1;
      if (a[column] > b[column]) return direction === 'asc' ? 1 : -1;
      return 0;
    });
    setSortConfig({ key: column, direction });
    setFilteredItems(sortedItems);
  };

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredItems.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredItems.length / itemsPerPage);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handleItemsPerPageChange = (event) => {
    setItemsPerPage(Number(event.target.value));
    setCurrentPage(1);
  };

  const toggleSelectItem = (itemId) => {
    setSelectedItems((prevSelected) => {
      const updatedSelection = new Set(prevSelected);
      if (updatedSelection.has(itemId)) {
        updatedSelection.delete(itemId);
      } else {
        updatedSelection.add(itemId);
      }
      return updatedSelection;
    });
  };

  const handleSelectAll = () => {
    if (selectedItems.size === currentItems.length) {
      setSelectedItems(new Set());
    } else {
      setSelectedItems(new Set(currentItems.map((item) => item.id)));
    }
  };

  const handleBulkAction = () => {
    const updatedItems = items.map((item) => {
      if (selectedItems.has(item.id)) {
        return { ...item, status: bulkActionStatus === 'publish' ? 'published' : 'unpublished' };
      }
      return item;
    });
    setItems(updatedItems);
    setFilteredItems(updatedItems);
    localStorage.setItem('productData4key', JSON.stringify(updatedItems));
    setSelectedItems(new Set());
  };

  const handleShare = () => {
    const dataToShare = JSON.stringify(
      Array.from(selectedItems).map((id) => items.find((item) => item.id === id))
    );
    navigator.clipboard.writeText(dataToShare);
    alert('Selected items copied to clipboard!');
  };

  const handleStatusChange = (id, status) => {
    const updatedItems = items.map((item) => {
      if (item.id === id) {
        return { ...item, status: status };
      }
      return item;
    });
    setItems(updatedItems);
    setFilteredItems(updatedItems);
    localStorage.setItem('productData4key', JSON.stringify(updatedItems));
  };

  return (
    <div className="p-6 bg-white">
      <div className="flex w-full justify-between">
        <h2 className="text-2xl font-bold mb-4">Inventory Summary</h2>

        {/* Search, Filter, and Share */}
        <div className="flex flex-col md:flex-row gap-2 mb-4 right-0">
          <div className="flex flex-col md:flex-row">
            <div className="flex items-center">
              <FaSearch className="text-gray-500" />
              <input
                type="text"
                placeholder="Search by Product Name"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="border p-2 rounded w-full"
              />
            </div>
            <div className="flex items-center">
              <FaFilter className="text-gray-500" />
              <select
                value={categoryFilter}
                onChange={(e) => setCategoryFilter(e.target.value)}
                className="border rounded w-full p-2"
              >
                <option value="">All Categories</option>
                <option value="Gadgets">Gadgets</option>
                <option value="Fashion">Fashion</option>
              </select>
            </div>
            <button onClick={handleShare} className="flex items-center px-2 border p-2 rounded">
              <FaShareAlt className="" /> Share
            </button>
          </div>

          {/* Bulk Actions */}
          <div className="flex items-center">
            <select
              value={bulkActionStatus}
              onChange={(e) => setBulkActionStatus(e.target.value)}
              className="border rounded p-2"
            >
              <option value="publish">Publish</option>
              <option value="unpublish">Unpublish</option>
            </select>
            <button
              onClick={handleBulkAction}
              className="flex items-center bg-blue-500 text-white p-2 rounded ml-2"
            >
              Apply to Selected
            </button>
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full border-collapse">
          <thead className='border'>
            <tr>
              <th className="px-4 py-2">
                <input
                  type="checkbox"
                  onChange={handleSelectAll}
                  checked={selectedItems.size === currentItems.length && selectedItems.size > 0}
                />
              </th>
              <th className="px-4 py-2" onClick={() => handleSort('productName')}>
                Product Name
              </th>
              <th className="px-4 py-2" onClick={() => handleSort('category')}>
                Category
              </th>
              <th className="px-4 py-2" onClick={() => handleSort('price')}>
                Price
              </th>
              <th className="px-4 py-2" onClick={() => handleSort('stock')}>
                Stock
              </th>
              <th className="px-4 py-2">Status</th>
              <th className="px-4 py-2">Action</th>
            </tr>
          </thead>
          <tbody className="text-center border">
            {currentItems.map((item) => (
              <tr key={item.id}>
                <td className="px-4 py-2">
                  <input
                    type="checkbox"
                    onChange={() => toggleSelectItem(item.id)}
                    checked={selectedItems.has(item.id)}
                  />
                </td>
                <td className="px-4 py-2" onClick={() => handleRowClick(item.id)} style={{ cursor: 'pointer' }}>
                  <img src={item.coverImage} alt={item.productName} className="w-8 h-8 inline-block mr-2" />
                  {item.productName}
                </td>
                <td className="px-4 py-2" onClick={() => handleRowClick(item.id)} style={{ cursor: 'pointer' }}>{item.productCategory}</td>
                <td className="px-4 py-2" onClick={() => handleRowClick(item.id)} style={{ cursor: 'pointer' }}>${item.sellingPrice}</td>
                <td className="px-4 py-2" onClick={() => handleRowClick(item.id)} style={{ cursor: 'pointer' }}>{item.quantityInStock}</td>
                <td className="px-4 py-2">{item.status || 'unpublished'}</td>
                <td className="px-4 py-2">
                  <select
                    value={item.status}
                    onChange={(e) => handleStatusChange(item.id, e.target.value)}
                  >
                    <option value="published">Published</option>
                    <option value="unpublished">Unpublished</option>
                  </select>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="flex items-center justify-between mt-4">
        <div>
          <label>Items per page: </label>
          <select value={itemsPerPage} onChange={handleItemsPerPageChange}>
            <option value={5}>5</option>
            <option value={10}>10</option>
            <option value={20}>20</option>
          </select>
        </div>
        <div>
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
            <button
              key={page}
              onClick={() => handlePageChange(page)}
              className={`mx-1 px-3 py-1 rounded ${page === currentPage ? 'bg-blue-500 text-white' : 'bg-gray-300'}`}
            >
              {page}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

export default InventorySummary;
