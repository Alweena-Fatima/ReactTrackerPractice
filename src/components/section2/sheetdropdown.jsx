import React, { useState } from 'react';
const SheetDropdown = ({ sheets, selectedSheets, handleSheetChange }) => {
  // this use state check is drop down is  open or close do the opposite 
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const toggleDropdown = () => setDropdownOpen(!dropdownOpen);

  return (
    <div className="relative inline-block ml-2"> 
      <button
        onClick={toggleDropdown} 
        className="text-white bg-cyan-700 hover:bg-cyan-800 focus:ring-4 focus:outline-none focus:ring-cyan-300 font-medium rounded-lg text-sm px-5 py-2.5 inline-flex items-center"
      >
        Sheets
        {/* Dropdown arrow icon (rotates when open) */}
        <svg
          className={`w-2.5 h-2.5 ms-3 transition-transform ${dropdownOpen ? 'rotate-180' : ''}`} // Optional: rotate arrow
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 10 6"
        >
          <path
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="m1 1 4 4 4-4"
          />
        </svg>
      </button>

      {/*if dropdown is open  use map to show all sheets name with check box..  return the selected sheet call handlechange to exceute the logic what to do after selecting the sheet*/}
      {dropdownOpen && (
        <div className="absolute right-0 z-10 mt-2 w-48 bg-white divide-y divide-gray-100 rounded-lg shadow-sm">
          <ul className="p-3 space-y-3 text-sm text-gray-700">
            {sheets.map((sheet, idx) => (
              <li key={idx}>
                <label className="flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={selectedSheets.includes(sheet)}
                    onChange={() => handleSheetChange(sheet)}
                    className="w-4 h-4 text-blue-600 border-gray-300 rounded-sm"
                  />
                  <span className="ms-2 text-sm font-medium text-gray-900">
                    {sheet}
                  </span>
                </label>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default SheetDropdown; 