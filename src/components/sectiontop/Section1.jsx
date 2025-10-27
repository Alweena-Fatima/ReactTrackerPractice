import React, { useState, useEffect } from 'react';
const fixedSnowflakes = [
  { left: '10%', top: '20%', fontSize: '12px' },
  { left: '80%', top: '40%', fontSize: '18px' },
  { left: '45%', top: '75%', fontSize: '14px' },
  { left: '90%', top: '10%', fontSize: '16px' },
  { left: '5%', top: '90%', fontSize: '10px' },
  { left: '25%', top: '50%', fontSize: '15px' },
  { left: '65%', top: '5%', fontSize: '11px' },
  { left: '55%', top: '60%', fontSize: '17px' },
  { left: '33%', top: '33%', fontSize: '13px' },
  { left: '72%', top: '85%', fontSize: '16px' },
];

const Section1 = () => {
  //time current
  const [currentDate, setCurrentDate] = useState(new Date());

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentDate(new Date());
    }, 1000);
    return () => clearInterval(intervalId);
  }, []);
  // State to store the name and input visibility
  const [name, setName] = useState("");
  const [isEditing, setIsEditing] = useState(true);
  //use useeffect to get the user name from the local storage 
  useEffect(()=>{
    const savedname=localStorage.getItem('Username');
    if(savedname){
      setName(savedname);
      setIsEditing(false)
    }
  },[]);
  // Function runs when user leaves the input box
  const handleBlur = (e) => {
    const enteredName = e.target.value.trim();
    if (enteredName !== "") {
      setName(enteredName);
      localStorage.setItem("Username", enteredName);
      setIsEditing(false); // replace input with text
    }
  };
  //now getting the total solved problem from the local storage 
  const [totalSolved,setTotalSolved]=useState(0);
  const TOTAL_QUESTION=287;
  useEffect(()=>{
    const handleStorageChange=()=>{
      const raw=localStorage.getItem("problemprogress");
      if(raw){
        try{
          const all=JSON.parse(raw);
          const solvedcount=Object.values(all).filter(p=>p.isSolved).length;//filter the all object on the isDOne true condition the get the object length
          setTotalSolved(solvedcount);
        }catch(err){
          console.error("Failed to parse progress:", err);
        }
      }else{
        setTotalSolved(0);
      }
    };
    //progressUpdated shouted by problemrow file listen by this handleStoroage changed in called and function reread the local storage and update the total solved
    //now yahan tak will only update the bar when you will refresh so add event listener for storage changes
    window.addEventListener("progressUpdated", handleStorageChange);

  // Initial call
  handleStorageChange();

  return () => window.removeEventListener("progressUpdated", handleStorageChange);
  },[]);

  return (
    <div className="relative h-[40vh] bg-slate-900  flex flex-row items-center justify-between  text-center overflow-hidden">

      {/* Static snow */}
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

      {/* Left Section - Terminal Style */}
      <div className="text-left ml-25 relative z-10 font-mono">
        <div className="bg-slate-800/80 border-2 border-cyan-700 p-6 rounded-lg shadow-xl backdrop-blur-sm">
          <div className="flex items-center space-x-2 mb-4">
            <span className="text-emerald-400 text-sm">●</span>
            <span className="text-yellow-400 text-sm">●</span>
            <span className="text-red-400 text-sm">●</span>
            <span className="text-gray-500 text-xs ml-2">session.log</span>
          </div>
          <h1 className="text-3xl font-bold mb-2 text-cyan-400">
            <span className="text-emerald-400"></span>{" "}
            Welcome,{" "}
            {isEditing ? (
              <input
                type="text"
                placeholder="Enter your name"
                onBlur={handleBlur} // triggered when user moves out
                className="bg-transparent  outline-none text-cyan-200 placeholder-gray-500"
                autoFocus
              />
            ) : (
              <span className= "text-cyan-400">{name}!</span>
              
            )}
          </h1>
          <p className="text-gray-300 text-lg">
            <span className="text-purple-400">&gt;&gt;</span> DSA Progress Dashboard
          </p>
          <div className="mt-3 text-white text-sm animate-pulse">
            <span className="text-cyan-400">|</span> {currentDate.toLocaleString()}
          </div>
        </div>
      </div>

      {/* Right Section - Stats Terminal */}
      <div className="text-left mr-25 relative z-10 font-mono">
        <div className="bg-slate-800/80 border-2 border-emerald-700 p-6 rounded-lg shadow-xl backdrop-blur-sm">
          <div className="flex items-center gap-6">
            {/* Circular Progress Ring */}
            <div className="relative flex items-center justify-center">
              <svg className="transform -rotate-90 w-32 h-32">
                {/* Background circle */}
                <circle
                  cx="64"
                  cy="64"
                  r="56"
                  stroke="currentColor"
                  strokeWidth="8"
                  fill="none"
                  className="text-slate-700"
                />
                {/* Progress circle */}
                <circle
                  cx="64"
                  cy="64"
                  r="56"
                  stroke="url(#gradient)"
                  strokeWidth="8"
                  fill="none"
                  strokeDasharray={`${2 * Math.PI * 56}`}
                  strokeDashoffset={`${2 * Math.PI * 56 * (1 - totalSolved / TOTAL_QUESTION)}`}
                  className="transition-all duration-1000 ease-out"
                  strokeLinecap="round"
                />
                {/* Gradient definition */}
                <defs>
                  <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#22d3ee" />
                    <stop offset="100%" stopColor="#34d399" />
                  </linearGradient>
                </defs>
              </svg>
              {/* Center text */}
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="text-3xl font-bold text-emerald-400">
                  {((totalSolved/TOTAL_QUESTION)*100).toFixed(0)}%
                </span>
                <span className="text-xs text-gray-400">complete</span>
              </div>
            </div>

            {/* Stats */}
            <div className="space-y-2">
              <p className="text-gray-300">
                <span className="text-cyan-400">total_questions:</span>{' '}
                <span className="font-semibold text-emerald-400">{TOTAL_QUESTION}</span>
              </p>
              <p className="text-gray-300">
                <span className="text-cyan-400">solved:</span>{' '}
                <span className="font-semibold text-emerald-400">{totalSolved}</span>
              </p>
              <p className="text-gray-300">
                <span className="text-cyan-400">remaining:</span>{' '}
                <span className="font-semibold text-yellow-400">{TOTAL_QUESTION - totalSolved}</span>
              </p>
              
            </div>
            
          </div>
          
        </div>
        
      </div>


    </div>
  );
};

export default Section1;