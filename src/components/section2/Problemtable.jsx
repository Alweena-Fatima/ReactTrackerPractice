import React, { useState } from 'react';
import ProblemRow from './ProblemRow';
import SheetDropdown from './SheetDropdown';
//import ResetModal from './ResetModal';
import { toast } from 'react-hot-toast';
import { confirmResetToast } from './confirmResetToast';
// --- IMPORT THE HELPER ---
import { getProblemHint } from '../../utils/aiHelper'; 

const Problemtable = ({ problems }) => {
  //this use state will save the selected sheetname from the drop down
  const [selectedSheets, setSelectedSheets] = useState([]);

  //this use state will check if user want to reset then blur curr page and popup the reset component
  //const [showResetModal, setShowResetModal] = useState(false);

  const sheets = ["Sean Prashad", "Neetcode", "Blind", "Amazon 6M"];

  // When user selects or deselects a sheet:
  // - If already selected, remove it from selectedSheets
  // - Otherwise, add it to selectedSheets
  const handleSheetChange = (sheet) => {
    if (selectedSheets.includes(sheet)) {
      setSelectedSheets(selectedSheets.filter((s) => s !== sheet));
    } else {
      setSelectedSheets([...selectedSheets, sheet]);
    }
  };

  //filter the problem based on selected sheet
  const filteredProblems = problems.filter(problem => {
    //If no sheets are selected, show all problems
    if (selectedSheets.length === 0) {
      return true;
    }
    //if selectedSheets has at least one selected sheet filter the problem on the sheet name and include the question which are in the selected sheet
    return problem.sheets && problem.sheets.some(sheet =>
      selectedSheets.includes(sheet)
    );
  });

  // set the resetmodel true when user will click the reset button
  const handleReset = () => {
    confirmResetToast(confirmReset);
  };

  // now reset logic remove the item from the local storage
  const confirmReset = () => {
    try {
      localStorage.removeItem("problemprogress");
      localStorage.removeItem("Username");
      //after remove from the local strorage force reload the website 
      window.location.reload();

    } catch (err) {
      console.error("Failed to reset progress:", err);
      alert("An error occurred while trying to reset your progress.");
    }
  };
  // //handle cancel reset option
  // const cancelReset = () => {
  //   setShowResetModal(false);
  // };

  // --- ADDED AI STATE & HANDLER ---
  const [showPopup, setShowPopup] = useState(false);
  const [hintData, setHintData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
 const [currentProblem, setCurrentProblem] = useState(null);
  const handleShowHint = async (problem) => {
    setShowPopup(true);
    setHintData(null); // Clear old data
    setIsLoading(true); // Start loading
    setCurrentProblem(problem);

    // Call the helper function
    const data = await getProblemHint(problem.title);
    
    if (data) {
      setHintData(data);
    } else {
      toast.error("AI connection failed");
      setShowPopup(false);
    }
    setIsLoading(false);
  };
  // --------------------------------
 

  return (
    <div className="bg-slate-900 min-h-screen relative overflow-hidden ">
      {/** call the reset model component 
        <ResetModal
        isOpen={showResetModal}
        onConfirm={confirmReset}
        onCancel={cancelReset}
      />
        */}
      
      <div className="overflow-x-auto  pt-10 pb-20 relative z-10">
        <div className="bg-slate-800/90 border-2 border-cyan-700 rounded-lg p-6 backdrop-blur-sm shadow-2xl">
          {/* Terminal Header */}
          <div className="flex items-center space-x-2 mb-4 font-mono">
            <span className="text-emerald-400 text-sm">●</span>
            <span className="text-yellow-400 text-sm">●</span>
            <span className="text-red-400 text-sm">●</span>
            <span className="text-gray-400 text-sm ml-2">problems.db</span>
            <button
              onClick={handleReset}
              className="ml-auto flex items-center space-x-1 text-red-400 hover:text-red-300 transition-colors duration-200 cursor-pointer"
              title="Reset all progress"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
              </svg>
              <span className="text-sm">Reset</span>
            </button>

          </div>

          <table className="w-full border-collapse font-mono ">
            <thead>
              <tr className="bg-slate-700 text-cyan-400  border-cyan-400 text-xl">
                <th className="p-3 text-left">#</th>
                <th className="p-3 text-left">Title</th>
                {/* ADDED HEADER FOR AI */}
                <th className="p-3 text-center">AI Hint</th>
                
                <th className="p-3 text-left">

                  {/* call the sheetdrop down component pass the req parameters*/}
                  <SheetDropdown
                    sheets={sheets}
                    selectedSheets={selectedSheets}
                    handleSheetChange={handleSheetChange}
                  />
                </th>
                <th className="p-3 text-center">Solved</th>
                <th className="p-3 text-center">Revise</th>

                <th className="p-3 text-center">Last Done</th>
                <th className="p-3 text-center">Revison Count</th>
              </tr>
            </thead>
            <tbody>
              {/** if the search query has no matching problem the filterproblem length will be 0 
              - return no problem 
              - else map each problem id to  problem row component 
                
              */}
              {filteredProblems.length === 0 ? (
                <p className="text-center text-emerald-500 mt-4">No problems found 😅</p>
              ) : (
                filteredProblems.map((p, index) => (
                  <ProblemRow key={p.id} problem={p} index={index} onShowHint={handleShowHint}/>
                ))
              )}

            </tbody>
          </table>
        </div>
      </div>

      {/* --- UPDATED POPUP MODAL --- */}
      {showPopup && (
        <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          
          <div className="bg-slate-900 p-6 rounded-lg w-full max-w-4xl max-h-[85vh] overflow-y-auto border border-cyan-500 shadow-[0_0_50px_rgba(8,145,178,0.25)] relative font-mono custom-scrollbar">
            
            {isLoading ? (
               <div className="flex flex-col items-center justify-center py-20 space-y-4">
                  <div className="w-12 h-12 border-4 border-cyan-500 border-t-transparent rounded-full animate-spin"></div>
                  <p className="text-cyan-400 animate-pulse tracking-widest">INITIALIZING NEURAL LINK...</p>
               </div>
            ) : (
              <>
                <div className="flex justify-between items-start border-b border-gray-700 pb-4 mb-6 sticky top-0 bg-slate-900 z-10">
                    <h2 className="text-cyan-400 text-xl font-bold flex items-center">
                       <span className="text-emerald-400 mr-2">➜</span> 
                       {hintData?.hint ? `Hint: ${currentProblem?.title}` : "No Data"}
                    </h2>
                    <button
                      onClick={() => setShowPopup(false)}
                      className="text-gray-500 hover:text-red-400 transition-colors text-2xl leading-none cursor-pointer"
                    >
                      &times;
                    </button>
                </div>
                
                {/* --- SPLIT LAYOUT (Grid) --- */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    
                    {/* LEFT COLUMN: Hint & Complexity */}
                    <div className="space-y-6">
                        <div>
                             <div className="flex items-center space-x-2 mb-2">
                                <span className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse"></span>
                                <span className="text-emerald-400 text-sm font-bold tracking-wider">STRATEGY_PROTOCOL</span>
                             </div>
                             <div className="bg-slate-950/50 p-4 rounded border-l-2 border-emerald-500/50">
                                <p className="text-gray-300 text-sm leading-relaxed">{hintData?.hint}</p>
                             </div>
                        </div>

                        <div>
                            <div className="flex items-center space-x-2 mb-2">
                                <span className="w-2 h-2 bg-pink-500 rounded-full"></span>
                                <span className="text-pink-400 text-sm font-bold tracking-wider">COMPLEXITY_ANALYSIS</span>
                            </div>
                            <div className="bg-slate-950/50 p-3 rounded border border-pink-500/20 text-pink-300 text-sm">
                                {hintData?.complexity}
                            </div>
                        </div>
                    </div>

                    {/* RIGHT COLUMN: Pseudo Code */}
                    <div className="flex flex-col h-full">
                        <div className="flex items-center space-x-2 mb-2">
                            <span className="w-2 h-2 bg-yellow-400 rounded-full"></span>
                            <span className="text-yellow-400 text-sm font-bold tracking-wider">ALGORITHM_BLUEPRINT</span>
                        </div>
                        <div className="flex-1 bg-slate-950 p-4 rounded border border-gray-800 relative group">
                           {/* Code Header Decoration */}
                           <div className="absolute top-2 right-2 flex space-x-1">
                                <div className="w-2 h-2 rounded-full bg-red-500/20"></div>
                                <div className="w-2 h-2 rounded-full bg-yellow-500/20"></div>
                                <div className="w-2 h-2 rounded-full bg-green-500/20"></div>
                           </div>
                           
                           <pre className="text-gray-300 text-xs sm:text-sm font-mono leading-relaxed overflow-x-auto custom-scrollbar h-full">
                             {hintData?.pseudoCode}
                           </pre>
                        </div>
                    </div>

                </div>
              </>
            )}
          </div>

          {/* Custom Scrollbar Styles for this popup */}
          <style jsx>{`
            .custom-scrollbar::-webkit-scrollbar {
              width: 8px;
              height: 8px;
            }
            .custom-scrollbar::-webkit-scrollbar-track {
              background: #0f172a; 
            }
            .custom-scrollbar::-webkit-scrollbar-thumb {
              background: #334155; 
              border-radius: 4px;
            }
            .custom-scrollbar::-webkit-scrollbar-thumb:hover {
              background: #06b6d4; 
            }
          `}</style>
        </div>
      )}
      {/* ------------------------- */}

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