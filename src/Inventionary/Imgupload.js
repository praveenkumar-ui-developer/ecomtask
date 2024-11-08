import React, { useEffect } from 'react';

function ImageUploadSection({ formData, handleFormDataChange }) {
  const { coverImage, additionalImages = [] } = formData;


  useEffect(() => {
    if (additionalImages.length === 0) {
      handleFormDataChange('additionalImages', [null]);
    }
  }, [additionalImages, handleFormDataChange]);

  const handleCoverImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      handleFormDataChange('coverImage', imageUrl); 
    }
  };

  const handleAdditionalImageUpload = (index, event) => {
    const file = event.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      const updatedImages = [...additionalImages];
      updatedImages[index] = imageUrl;
      handleFormDataChange('additionalImages', updatedImages);


      if (index === updatedImages.length - 1) {
        handleFormDataChange('additionalImages', [...updatedImages, null]);
      }
    }
  };

  const handleRemoveCoverImage = () => {
    handleFormDataChange('coverImage', null);
  };

  const handleRemoveAdditionalImage = (index) => {
    const updatedImages = additionalImages.map((img, imgIndex) => (imgIndex === index ? null : img));
    handleFormDataChange('additionalImages', updatedImages);
  };

  return (
    <div className="flex flex-col items-center p-4 bg-white rounded">
      <div className="w-full max-w-sm">
        {/* Cover Image Upload */}
        <div className="bg-gray-50 border-dashed border-2 border-gray-300 rounded-lg p-4 flex flex-col items-center text-center">
          {coverImage ? (
            <>
              <img src={coverImage} alt="Cover" className="w-full h-48 object-cover rounded-md" />
              <button
                onClick={handleRemoveCoverImage}
                className="mt-2 text-red-500 text-sm"
              >
                Remove Cover Image
              </button>
            </>
          ) : (
            <label className="cursor-pointer flex flex-col items-center">
              <span className="text-blue-500 text-lg mb-2">Upload Cover Image</span>
              <input
                type="file"
                className="hidden"
                accept="image/*"
                onChange={handleCoverImageUpload}
              />
            </label>
          )}
        </div>

        {/* Additional Images Upload */}
        <h3 className="mt-6 text-gray-700">Additional Images</h3>
        <div className="grid grid-cols-2 gap-4 mt-2">
          {additionalImages.map((image, index) => (
            <div
              key={index}
              className="bg-gray-50 border-dashed border-2 border-gray-300 rounded-lg p-4 flex items-center justify-center relative"
            >
              {image ? (
                <>
                  <img src={image} alt={`Additional ${index}`} className="w-full h-24 object-cover rounded-md" />
                  <button
                    onClick={() => handleRemoveAdditionalImage(index)}
                    className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1 text-xs"
                  >
                    ✕
                  </button>
                </>
              ) : (
                <label className="cursor-pointer flex flex-col items-center">
                  <span className="text-blue-500 text-sm">Upload Image</span>
                  <input
                    type="file"
                    className="hidden"
                    accept="image/*"
                    onChange={(e) => handleAdditionalImageUpload(index, e)}
                  />
                </label>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default ImageUploadSection;
