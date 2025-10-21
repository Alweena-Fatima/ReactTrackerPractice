import React, { useState, useEffect } from "react";
const STORAGE_KEY="problemprogress";
const ProblemRow = ({ problem, index }) => {
  const [isDone, setDone] = useState(false);
  const [lastDone, setLastDone] = useState("");

  //now load the progress from local storage 
  useEffect(()=>{
    try{
      const raw=localStorage.getItem(STORAGE_KEY);//raw will have object of solved problem like problem id 1 is solved then raw has object isDone is true and lastdate is saved 
      //raw is in string convert in object
      const all=raw?JSON.parse(raw):{};
      const p=all[problem.id];//now all is an object that has id of problem solved by user 
      //p will traverse each problem id of all check if done then setdone setlast else false
      if(p){
        setDone(Boolean(p.isDone));//returen the boolean state of p 
        setLastDone(p.lastDone ||"");

      }else{
        setDone(false);
        setLastDone("");
      }
    }catch (err) {
      console.error("Failed to load progress:", err);
    }
  },[problem.id]);//problem.id makes sure the effect runs only when the rows problem is changed
  //now save state of each problem on local storage 
  const saveProgressForEachproblem=(id,data)=>{
    try{
      const raw=localStorage.getItem(STORAGE_KEY);//raw will have object of solved problem like problem id 1 is solved then raw has object isDone is true and lastdate is saved 
      //raw is in string convert in object
      const all=raw?JSON.parse(raw):{};
      all[id]=data;
      localStorage.setItem(STORAGE_KEY,JSON.stringify(all));
    }catch(err){
      console.error("Failed to saved the progress");
    }
  };
  const handleCheck = () => {
    const today = new Date().toLocaleDateString('en-CA').split("T")[0];

    if (isDone) {
      setDone(false);
      setLastDone("");
      saveProgressForEachproblem(problem.id,{isDone:false,lastDone:""});//save the progress in local by calling saveProgressForEachproblem function
    } else {
      setDone(true);
      setLastDone(today);
      saveProgressForEachproblem(problem.id,{isDone:true,lastDone:today});//save the progress in local by calling saveProgressForEachproblem function
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
        {lastDone || <span className="text-gray-400">----/--/--</span>}
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