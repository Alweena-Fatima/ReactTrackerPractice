import React, { useState, useEffect } from "react";

const ProblemRow = ({ problem, index }) => {
  const [isDone, setDone] = useState(false);
  const [lastDone, setLastDone] = useState("");

  // Using in-memory storage instead of localStorage
  useEffect(() => {
    // You can implement your own state management here
    // For now, keeping it simple with component state
  }, [problem.id]);

  const handleCheck = () => {
    const today = new Date().toISOString().split("T")[0];

    if (isDone) {
      setDone(false);
      setLastDone("");
    } else {
      setDone(true);
      setLastDone(today);
    }
  };

  return (
    <tr 
      className="text-left border-b border-slate-600 hover:bg-slate-700/50 transition-colors duration-300 group"
      style={{
        animation: `fadeIn 0.5s ease-in ${index * 0.05}s backwards`
      }}
    >
      <td className=" p-3 text-gray-400 font-mono text-l">
        {String(problem.number).padStart(3, '0')}
      </td>
      <td className=" p-3">
        <a
          href={problem.link}
          target="_blank"
          rel="noopener noreferrer"
          className="text-cyan-400 hover:text-emerald-400 transition-colors duration-300 hover:underline group-hover:translate-x-1 inline-block"
        >
          <span className="text-gray-500 text-xl mr-2">&gt;</span>
          {problem.title}
        </a>
      </td>
      <td className=" p-3 text-white text-l">
        {problem.sheets.join(", ")}
      </td>
      <td className=" p-3 text-center">
        <input 
          type="checkbox" 
          checked={isDone} 
          onChange={handleCheck}
          className="w-5 h-5 accent-emerald-400 cursor-pointer hover:scale-110 transition-transform"
        />
      </td>
      <td className=" p-3 text-center text-gray-100 text-l font-mono">
        {lastDone || <span className="text-gray-400">--/--/----</span>}
      </td>

      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateX(-20px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
      `}</style>
    </tr>
  );
};

export default ProblemRow;