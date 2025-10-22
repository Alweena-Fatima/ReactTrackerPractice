import React, { useState, useEffect } from "react";
const STORAGE_KEY="problemprogress";
const ProblemRow = ({ problem, index,handleStorageChange }) => {
  //this use state will check if problem is done( checkbox is marked) or not 
  const [isDone, setDone] = useState(false);

  //this use sttae will track the last done date of a problem
  const [lastDone, setLastDone] = useState("");

  //this use state will count the revison done (count number of time the checkbox is clicked)
  const [revisonCount,setRevisonCount]=useState(0);

  //now load the progress from local storage (if any)
  useEffect(()=>{
    try{
      const raw=localStorage.getItem(STORAGE_KEY);//raw will have object of solved problem like problem id 1 is solved then raw has object isDone is true and lastdate is saved 
 
      const all=raw?JSON.parse(raw):{};// convert string → object

      const p=all[problem.id];//retrive teh saved progress for this problem using its id 

      //p will traverse each problem id of all check if done then setdone setlast else false
      if(p){
        setDone(Boolean(p.isDone));//return the boolean state of p 
        setLastDone(p.lastDone ||"");
        setRevisonCount(p.revisonCount || 0);

      }else{
        setDone(false);
        setLastDone("");
        setRevisonCount(0);
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

      // Dispatch a custom event that Section1 can listen for
      //when box is clicked then function saveP update localstorage and then shout the custom progressUpdate event to whole window
      //section 1 will listen it it 
      window.dispatchEvent(new Event("progressUpdated"));
    }catch(err){
      console.error("Failed to saved the progress");
    }
  };

  //this function is for handling checkbox when to disable when to inc count
  const handleCheck = () => {
    const today = new Date().toLocaleDateString('en-CA').split("T")[0];

    if (isDone) {
      //CASE 1: User is UNCHECKING the box 
      //allow only when the lastdone date is not today 
      if(lastDone==today){
        
        return;
      }
      //here lastdone is not today allow checking
      
      setDone(false);
      setLastDone("");
      // We keep the revision count, as unchecking shouldn't reset progress.
      
      saveProgressForEachproblem(problem.id, {
        isDone: false,
        lastDone: "",
        revisonCount: revisonCount // Keep the existing count
      });

    } else {
      // CASE 2: User is CHECKING the box 
      // The box is currently unchecked.
  
      let newRevisionCount = revisonCount;

      // Only increment the revision count if the last time it was done
      // was NOT today. This prevents multiple increments on the same day.
      if (lastDone !== today) {
        newRevisionCount = Math.min(revisonCount + 1, 3);
      }

      //mark done set the last done date as today and set the revision count and new revision count
      setDone(true);
      setLastDone(today);
      setRevisonCount(newRevisionCount);

      //save the progress or status of each problem in teh local storage 
      saveProgressForEachproblem(problem.id, {
        isDone: true,
        lastDone: today,
        revisonCount: newRevisionCount
      });
    }
  };
  const today = new Date().toLocaleDateString('en-CA').split("T")[0];
  //if the checkbox is clicked today or problem is done today mark lock true to disable the checkbopx for today
  let lock=isDone && lastDone === today;

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
          /** here when locked variable is true disable the checkbox and show warning */
          disabled={lock}
          title={lock ? "Completed today! Come back tomorrow to revise." : "Mark as done"}
          className="w-5 h-5 accent-emerald-400 cursor-pointer hover:scale-110 transition-transform"
        />
      </td>
      <td className=" p-3 text-center text-gray-100 text-l font-mono">
        {lastDone || <span className="text-gray-400">----/--/--</span>}
      </td>
      <td className=" p-3 text-center text-amber-200">
          {revisonCount}/3 {revisonCount>=3 && "MASTERED"}
      </td>
      {/* Fade-in animation for smooth row entry */}
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