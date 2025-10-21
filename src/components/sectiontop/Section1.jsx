import React, { useState, useEffect } from 'react';

// 1. Define the snowflake positions in a static array.
// These are now hard-coded and will NEVER change on any refresh.
// You can add/edit/remove these as much as you want.
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
  // --- Clock State (This part is fine) ---
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

  // Function runs when user leaves the input box
  const handleBlur = (e) => {
    const enteredName = e.target.value.trim();
    if (enteredName !== "") {
      setName(enteredName);
      setIsEditing(false); // replace input with text
    }
  };

  return (
    <div className="relative h-[40vh] bg-slate-800 shadow-lg flex flex-row items-center justify-between  text-center overflow-hidden">

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
        <div className="bg-slate-800/80 border-2 border-cyan-400 p-6 rounded-lg shadow-xl backdrop-blur-sm">
          <div className="flex items-center space-x-2 mb-4">
            <span className="text-emerald-400 text-sm">●</span>
            <span className="text-yellow-400 text-sm">●</span>
            <span className="text-red-400 text-sm">●</span>
            <span className="text-gray-500 text-xs ml-2">session.log</span>
          </div>
          <h1 className="text-3xl font-bold mb-2 text-cyan-400">
            <span className="text-emerald-400">$</span>{" "}
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
        <div className="bg-slate-800/80 border-2 border-emerald-400 p-6 rounded-lg shadow-xl backdrop-blur-sm">
          <div className="space-y-2">
            <p className="text-gray-300">
              <span className="text-cyan-400">total_questions:</span>{' '}
              <span className="font-semibold text-emerald-400">500</span>
            </p>
            <p className="text-gray-300">
              <span className="text-cyan-400">solved:</span>{' '}
              <span className="font-semibold text-emerald-400">120</span>
            </p>
            <p className="text-gray-300">
              <span className="text-cyan-400">progress:</span>{' '}
              <span className="font-semibold text-emerald-400">24%</span>
            </p>
            <div className="mt-3 h-2 bg-slate-700 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-cyan-400 to-emerald-400 animate-pulse"
                style={{ width: '24%' }}
              />
            </div>
          </div>
        </div>
      </div>


    </div>
  );
};

export default Section1;