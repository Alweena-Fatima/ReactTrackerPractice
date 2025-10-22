
import React, { useState } from 'react';
import ProblemRow from './ProblemRow';
import SheetDropdown from './SheetDropdown';

const ResetModal = ({ isOpen, onConfirm, onCancel }) => {
  //pass if confirm or cancel button is clicked to problem table components to reset the progress
  if (!isOpen) return null;
//backdrop blur will pop up the reset model and blur the home screen
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm">
      <div className="bg-slate-800 border-2 rounded-lg shadow-2xl max-w-md w-full mx-4 font-mono">
        {/* Terminal Header */}
        <div className="bg-slate-700 px-4 py-2 rounded-t-lg flex items-center space-x-2">
          <span className="text-red-400 text-sm">●</span>
          <span className="text-yellow-400 text-sm">●</span>
          <span className="text-gray-500 text-sm">●</span>
          <span className="text-gray-400 text-xs ml-2">warning.log</span>
        </div>

        {/* Modal Content */}
        <div className="p-6">
          <div className="flex items-start space-x-3 mb-4">
            <div className="text-red-400 text-3xl"></div>
            <div>
              <h3 className="text-xl font-bold text-red-400 mb-2">
                <span className="text-yellow-400">$</span> Confirm Reset
              </h3>
              
              <p className="text-gray-400 text-sm mt-2">
                This will permanently erase:
              </p>
              <ul className="text-gray-400 text-sm mt-2 space-y-1 ml-6">
                <li>• All checkmarks</li>
                <li>• Completion dates</li>
                <li>• Revision counts</li>
                <li>• Your username</li>
              </ul>
            </div>
          </div>

          <div className="mt-6 pt-4 border-t border-slate-700">
            <p className="text-yellow-400 text-sm mb-4">
              <span className="font-semibold">Warning:</span> This action cannot be undone!
            </p>
            
            {/* Buttons */}
            <div className="flex space-x-3">
              <button
                onClick={onConfirm}
                className="flex-1 bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-4 rounded transition-colors duration-200"
              >
                Yes, Reset
              </button>
              <button
                onClick={onCancel}
                className="flex-1 bg-slate-700 hover:bg-slate-600 text-cyan-400 font-semibold py-2 px-4 rounded border border-cyan-400 transition-colors duration-200"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default ResetModal;