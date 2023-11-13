import React from 'react';

const SuccessPopup = ({ onClose }) => {
  console.log(onClose)
  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div className="bg-white p-12 rounded shadow-lg">
        <p className="text-xl font-bold mb-4">Patient registration successfull!</p>
        <button
          onClick={onClose}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded text-center"
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default SuccessPopup;