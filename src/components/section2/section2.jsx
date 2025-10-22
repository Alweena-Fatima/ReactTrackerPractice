import React, { useState } from 'react';
import Problemtable from './Problemtable';
const Section2 = ({ problems }) => {
  // Whenever the user types in the search box, we store that value in searchQuery
  const [searchQuery, setsearchQuery] = useState('');
  
  //Filter the problems array based on the user's search input
  const filterProblems = problems.filter((problem) =>
    problem.title.toLowerCase().includes(searchQuery.toLowerCase())
  );
  return (
    <div className="bg-slate-900 font-mono ">
      <div className="mx-25">

        <input
          type="text"
          placeholder="Search problems (e.g., 'Two Pointers')..."
          className="
            w-full 
            p-3 pl-12 
            font-mono 
            bg-slate-800/80 
            border-2 border-cyan-700 
            rounded-lg 
            text-gray-300 
            placeholder-gray-500 
            backdrop-blur-sm
            focus:outline-none 
            focus:ring-1 focus:ring-emerald-500
          "
          value={searchQuery} //getting the query from the text box then sending to setsearch
          onChange={(e) => setsearchQuery(e.target.value)}
        />
      </div>
      {/* --- Problem Table --- */}
      {/* 
        - The filtered problems are passed to the Problemtable component.
        - only problems that match the usersearch query are displayed.
      */}
      <div className="mx-25">
        <Problemtable problems={filterProblems} />
      </div>
      
      
      <div className="mt-8 text-center">
        <p className="text-gray-500 font-mono text-sm">
          <span className="text-emerald-400">$</span> Happy Coding! <span className="animate-pulse">|</span>
        </p>
      </div>
    </div>

  );
};

export default Section2;