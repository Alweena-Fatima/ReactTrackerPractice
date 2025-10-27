import React, { useState, useEffect } from "react";
import { toast } from 'react-hot-toast';
const STORAGE_KEY="problemprogress";
const ProblemRow = ({ problem, index,handleStorageChange }) => {
  //this use state will check if problem is done( checkbox is marked) or not 
  const [isDone, setDone] = useState(false);
  //this usestate check is question is solved or not
  const [isSolved,setSolved]=useState(false);
  //this use sttae will track the last done date of a problem
  const [lastDone, setLastDone] = useState("");

  //this use state will count the revison done (count number of time the checkbox is clicked)
  const [revisionCount,setrevisionCount]=useState(0);

 // Load the saved progress from localStorage (if any).
// Whenever a new problem is rendered (i.e., problem.id changes),
// this useEffect will run and check the stored progress for that specific problem.

  useEffect(()=>{
    try{
      const raw=localStorage.getItem(STORAGE_KEY);//raw will have object of solved problem like problem id 1 is solved then raw has object isDone is true and lastdate is saved 
 
      const all=raw?JSON.parse(raw):{};// convert string → object

      const p=all[problem.id];//retrive teh saved progress for this problem using its id 

      //p will traverse each problem id of all check if done then setdone setlast else false
      if(p){
        setSolved(Boolean(p.isSolved));//boolean state of issolved
        setDone(Boolean(p.isDone));//return the boolean state of p 
        setLastDone(p.lastDone ||"");
        setrevisionCount(p.revisionCount || 0);

      }else{
        setSolved(false);
        setDone(false);
        setLastDone("");
        setrevisionCount(0);
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
  const handleSolvedChange = () => {
    if (isSolved) {
      toast.error("error: branch locked → already committed.", { icon: '🔒' });
      return; 
    }

    const newSolved = true; // Define the new state
    setSolved(newSolved);   // Set the state once
    toast.success(`git commit -m " Solved "`, { icon: '🚀' });
    //save the progress in local storage
    saveProgressForEachproblem(problem.id, {
      isSolved: newSolved, // Use the correct variable
      isDone,
      lastDone,
      revisionCount,
    });
  };

  //this function is for handling checkbox when to disable when to inc count
  const handleCheck = () => {
    //check if problem is Solved or now 
    if (!isSolved) {
      // 2. Call toast.error() instead of alert()
      toast.error(`error: cannot 'git push' before 'git commit'.`, { icon: '😏' });
      return; // Stop the function
    }
    const today = new Date().toLocaleDateString('en-CA');

    if (isDone) {
      //CASE 1: User is UNCHECKING the box 
      //allow only when the lastdone date is not today 
      if(lastDone==today){
        toast.error(`error: cooldown active → try 'git push' tomorrow!`, { icon: '⏳' });
        return;//same day lock
      }
      //here lastdone is not today allow checking
      
      setDone(false);
      setLastDone("");
      // We keep the revision count, as unchecking shouldn't reset progress.
      
      saveProgressForEachproblem(problem.id, {
        isSolved:isSolved,
        isDone: false,
        lastDone: "",
        revisionCount: revisionCount // Keep the existing count
      });

    } else {
      // CASE 2: User is CHECKING the box 
      // The box is currently unchecked.
  
      let newRevisionCount = revisionCount;

      // Only increment the revision count if the last time it was done
      // was NOT today. This prevents multiple increments on the same day.
      if (lastDone !== today) {
        newRevisionCount = Math.min(revisionCount + 1, 3);
      }

      //mark done set the last done date as today and set the revision count and new revision count
      setDone(true);
      setLastDone(today);
      setrevisionCount(newRevisionCount);
      //toast the message (only if the progress is inc)
      if (newRevisionCount > revisionCount) {
        if (newRevisionCount >= 3) {
          toast.success(`git push origin main → ${problem.title} MASTERED!`, { icon: '🎉' });
        } else {
          toast.success(`git commit -m "revise: ${newRevisionCount}/3 pushed"`, { icon: '📦' });
        }
      }
      //save the progress or status of each problem in teh local storage 
      saveProgressForEachproblem(problem.id, {
        //save the isSolved again beacuse if user will mark isDone localstorage will change without save isSolved
        isSolved:isSolved,
        isDone: true,
        lastDone: today,
        revisionCount: newRevisionCount
      });
    }
  };
  const today = new Date().toLocaleDateString('en-CA');
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
      {/** this is solved check box once user clicked it make the check box disalbe as question is solved */}
      <td className=" p-3 text-white text-l">
        {problem.sheets.join(", ")}
      </td>
      <td className="p-3 text-center">
        <input
          type="checkbox"
          checked={isSolved}
          onChange={handleSolvedChange}
          // disabled={isSolved} // Disable once solved
          title={isSolved ? "Already solved " : "Mark as solved"}
          className={`w-5 h-5 accent-blue-400 transition-transform ${
            isSolved ? "cursor-not-allowed opacity-60" : "cursor-pointer hover:scale-110"
          }`} //  added styling for disabled
        />
      </td>
      <td className=" p-3 text-center">
        <input 
          type="checkbox" 
          checked={isDone} 
          onChange={handleCheck}
          /** here when locked variable is true disable the checkbox and show warning */
          // disabled={lock}
          title={lock ? "Completed today! Come back tomorrow to revise." : "Mark as done"}
          className="w-5 h-5 accent-emerald-400 cursor-pointer hover:scale-110 transition-transform"
        />
      </td>
      <td className=" p-3 text-center text-gray-100 text-l font-mono">
        {lastDone || <span className="text-gray-400">----/--/--</span>}
      </td>
      <td className=" p-3 text-center text-amber-200">
          {revisionCount}/3 {revisionCount>=3 && "MASTERED"}
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