import React, { useState } from 'react'; // <-- 1. Import useState

// 2. Component name is capitalized (PascalCase)
// 3. Receive props from the parent
const SheetDropdown = ({ sheets, selectedSheets, handleSheetChange }) => {
  
  // 4. Add state for managing if the dropdown is open
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const toggleDropdown = () => setDropdownOpen(!dropdownOpen);

  return (
    // Note: The `absolute` positioning on the dropdown menu
    // might look better if the parent `div` has `position: relative`.
    // I've kept your structure, but added `relative` to the parent div.
    <div className="relative inline-block ml-2"> 
      <button
        onClick={toggleDropdown} // This function now exists
        className="text-white bg-cyan-700 hover:bg-cyan-800 focus:ring-4 focus:outline-none focus:ring-cyan-300 font-medium rounded-lg text-sm px-5 py-2.5 inline-flex items-center"
      >
        Sheets
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

      {/* This variable (`dropdownOpen`) now exists */}
      {dropdownOpen && (
        // 5. Added 'right-0' to align dropdown better in a table header
        <div className="absolute right-0 z-10 mt-2 w-48 bg-white divide-y divide-gray-100 rounded-lg shadow-sm">
          <ul className="p-3 space-y-3 text-sm text-gray-700">
            {/* 6. These variables are now passed in as props */}
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

export default SheetDropdown; // 7. Export the capitalized name