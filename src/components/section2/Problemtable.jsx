import React, { useState } from 'react';
import ProblemRow from './ProblemRow';
import SheetDropdown from './SheetDropdown';
const Problemtable = ({ problems }) => {
  // const fixedSnowflakes = [
  //   { left: '10%', top: '20%', fontSize: '12px' },
  //   { left: '80%', top: '40%', fontSize: '18px' },
  //   { left: '45%', top: '75%', fontSize: '14px' },
  //   { left: '90%', top: '10%', fontSize: '16px' },
  //   { left: '5%', top: '90%', fontSize: '10px' },
  //   { left: '25%', top: '50%', fontSize: '15px' },
  //   { left: '65%', top: '5%', fontSize: '11px' },
  //   { left: '55%', top: '60%', fontSize: '17px' },
  //   { left: '33%', top: '33%', fontSize: '13px' },
  //   { left: '72%', top: '85%', fontSize: '16px' },
  // ];
  //this usestae for chnaging and selecting the sheets 
  const [selectedSheets, setSelectedSheets] = useState([]);
  const sheets = ["Sean Prashad", "Neetcode", "Blind", "Amazon 6M"];

  const handleSheetChange = (sheet) => {
    if (selectedSheets.includes(sheet)) {
      setSelectedSheets(selectedSheets.filter((s) => s !== sheet));
    } else {
      setSelectedSheets([...selectedSheets, sheet]);
    }
  };
  const filteredProblems = problems.filter(problem => {
    // 1. If no sheets are selected, show all problems
    if (selectedSheets.length === 0) {
      return true;
    }
    
    // 2. Check if the problem's 'sheets' array has *at least one*
    //    sheet that is also in the 'selectedSheets' array.
    //    We use .some() for this.
    return problem.sheets && problem.sheets.some(sheet => 
      selectedSheets.includes(sheet)
    );
  });


  return (
    <div className="bg-slate-900 min-h-screen relative overflow-hidden ">
      {/* Subtle snow effect
        <div className="absolute inset-0 pointer-events-none">
        {fixedSnowflakes.map((style, i) => (
          <div
            key={i}
            className="absolute text-white opacity-70"
            style={style}
          >
            ❄
          </div>
        ))}

      </div>
        
        */}
      

      <div className="overflow-x-auto  pt-10 pb-20 relative z-10">
        <div className="bg-slate-800/90 border-2 border-cyan-700 rounded-lg p-6 backdrop-blur-sm shadow-2xl">
          {/* Terminal Header */}
          <div className="flex items-center space-x-2 mb-4 font-mono">
            <span className="text-emerald-400 text-sm">●</span>
            <span className="text-yellow-400 text-sm">●</span>
            <span className="text-red-400 text-sm">●</span>
            <span className="text-gray-400 text-sm ml-2">problems.db</span>
            
          </div>

          <table className="w-full border-collapse font-mono ">
            <thead>
              <tr className="bg-slate-700 text-cyan-400  border-cyan-400 text-xl">
                <th className="p-3 text-left">#</th>
                <th className="p-3 text-left">Title</th>
                <th className="p-3 text-left">
                  
                  {/* 4. Render the component and pass the required props */}
                  <SheetDropdown
                    sheets={sheets}
                    selectedSheets={selectedSheets}
                    handleSheetChange={handleSheetChange}
                  />
                </th>
                <th className="p-3 text-center">Done</th>
                <th className="p-3 text-center">Last Done</th>
                <th className="p-3 text-center">Revison Count</th>
              </tr>
            </thead>
            <tbody>
              {filteredProblems.map((p, index) => (
                <ProblemRow key={p.id} problem={p} index={index} />
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <style jsx>{`
        @keyframes fall {
          to {
            transform: translateY(100vh) rotate(360deg);
          }
        }
      `}</style>
    </div>
  );
};

export default Problemtable;