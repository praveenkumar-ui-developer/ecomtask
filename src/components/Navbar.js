import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FaBell } from 'react-icons/fa';

function Navbar() {
  const location = useLocation();

  const paths = location.pathname.split('/').filter((path) => path);

  return (
    <div className=" w-full h-[84px] flex items-center justify-between bg-white px-8 shadow">
      
      <div className='mx-[88px]'>
        <h1 className="text-lg font-semibold text-gray-700">Inventory</h1>
        <div className="flex items-center text-sm text-gray-500 mt-1">
          <Link to="/" className="text-blue-500">Home</Link>
          {paths.map((path, index) => {
            const to = `/${paths.slice(0, index + 1).join('/')}`;
            return (
              <React.Fragment key={to}>
                <span className="mx-2">/</span>
                <Link to={to} className="text-blue-500">
                  {path.charAt(0).toUpperCase() + path.slice(1)}
                </Link>
              </React.Fragment>
            );
          })}
        </div>
      </div>

      
      <div className="flex items-center gap-4">
        <div className="bg-orange-100 text-orange-600 px-3 py-1 rounded-full text-sm font-medium">
          Nanny's Shop
        </div>
        <FaBell className="text-blue-500 text-lg" />
        <img
          src="https://media.licdn.com/dms/image/v2/D5603AQE0qZg7kcpbWA/profile-displayphoto-shrink_800_800/profile-displayphoto-shrink_800_800/0/1722931938237?e=1736380800&v=beta&t=_v7-40dXfmSD-bWjNZUTWSm-UECuZR5e7Q-7F_hjqU4" 
          alt="User Profile"
          className="w-8 h-8 rounded-full object-cover"
        />
      </div>
    </div>
  );
}

export default Navbar;
