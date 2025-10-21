import React,{useState} from 'react';
import Problemtable from './Problemtable';


const Section2 = ({ problems }) => {
  const [searchQuery,setsearchQuery]=useState('');
  //search query has the text user want to seach use it to filter the problem array

  const filterProblems=problems.filter((problem)=>
    problem.title.toLowerCase().includes(searchQuery.toLowerCase())
  );
  return (
    <div className="bg-slate-800 font-mono ">
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
          onChange={(e)=>setsearchQuery(e.target.value)}
        />
      </div>

      {/* --- Problem Table --- */}
      {/* Added a margin-top to space it from the search bar */}
      <div className="mx-25">
        <Problemtable problems={filterProblems} />
      </div>

    </div>
  );
};

export default Section2;