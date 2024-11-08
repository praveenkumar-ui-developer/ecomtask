import React, { useState } from 'react';

const ToggleSwitch = ({ label, onToggle, initialChecked = false }) => {
  const [isChecked, setIsChecked] = useState(initialChecked);

  const handleToggle = () => {
    setIsChecked(!isChecked);
    onToggle(!isChecked);  
  };

  return (
    <div className="flex items-center">
      <span className="mr-2 text-gray-700">{label}</span>
      <div
        onClick={handleToggle}
        className={`relative w-12 h-6 transition duration-200 ease-linear rounded-full ${
          isChecked ? 'bg-blue-500' : 'bg-gray-300'
        } cursor-pointer`}
      >
        <span
          className={`absolute top-1 left-1 w-4 h-4 bg-white rounded-full shadow-md transform transition-transform duration-200 ease-linear ${
            isChecked ? 'translate-x-6' : ''
          }`}
        ></span>
      </div>
    </div>
  );
};

export default ToggleSwitch;
