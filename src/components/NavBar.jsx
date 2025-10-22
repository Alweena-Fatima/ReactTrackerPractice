import React from 'react';

const Navbar = ({setOption}) => {
    const fixedSnowflakes = [
  { left: '10%', top: '20%', fontSize: '12px' },
  
  { left: '5%', top: '90%', fontSize: '10px' },
  { left: '25%', top: '50%', fontSize: '15px' },
  { left: '65%', top: '5%', fontSize: '11px' },
  { left: '55%', top: '60%', fontSize: '17px' },
  { left: '33%', top: '33%', fontSize: '13px' },
  { left: '72%', top: '85%', fontSize: '16px' },
];
  return (
    <div className="relative bg-slate-800 border-b-2 border-cyan-800 shadow-lg overflow-hidden">
      {/* Animated snow effect */}
      {/* Static snow
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
      

      <div className="flex justify-between items-center px-8 py-4 relative z-10">
        {/* Left Side - Terminal Logo */}
        <div className="flex items-center space-x-2 ml-20">
          <span className="text-cyan-400 text-3xl font-mono animate-pulse">❄️</span>
          <span className="text-cyan-400 text-2xl font-mono font-bold">
            <span className="text-yellow-400">root@</span>tracker
            <span className="animate-pulse">_</span>
          </span>
        </div>

        {/* Right Side - Terminal Nav */}
        <ul className="flex space-x-8 font-mono mr-20 text-xl">
          <li className="text-cyan-400 hover:text-emerald-400 cursor-pointer transition duration-300 hover:scale-110">
            <span className="before:content-['$_'] hover:before:content-['>_']" onClick={()=>{setOption('Home')}}>Home</span>
          </li>
          <li className="text-cyan-400 hover:text-emerald-400 cursor-pointer transition duration-300 hover:scale-110">
            <span className="before:content-['$_'] hover:before:content-['>_']" onClick={()=>{setOption('AboutMe')}}>About</span>
          </li>
          <li className="text-cyan-400 hover:text-emerald-400 transition duration-300 hover:scale-110">
            <a href="#" className="inline-block hover:rotate-12 transition-transform">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 fill-current" viewBox="0 0 496 512">
                <path d="M165.9 397.4c0 2-2.3 3.6-5.2 3.6-3.3 .3-5.6-1.3-5.6-3.6 0-2 2.3-3.6 5.2-3.6 3-.3 5.6 1.3 5.6 3.6zm-31.1-4.5c-.7 2 1.3 4.3 4.3 4.9 2.6 1 5.6 0 6.2-2s-1.3-4.3-4.3-5.2c-2.6-.7-5.5 .3-6.2 2.3zm44.2-1.7c-2.9 .7-4.9 2.6-4.6 4.9 .3 2 2.9 3.3 5.9 2.6 2.9-.7 4.9-2.6 4.6-4.6-.3-1.9-3-3.2-5.9-2.9zM244.8 8C106.1 8 0 113.3 0 252c0 110.9 69.8 205.8 169.5 239.2 12.8 2.3 17.3-5.6 17.3-12.1 0-6.2-.3-40.4-.3-61.4 0 0-70 15-84.7-29.8 0 0-11.4-29.1-27.8-36.6 0 0-22.9-15.7 1.6-15.4 0 0 24.9 2 38.6 25.8 21.9 38.6 58.6 27.5 72.9 20.9 2.3-16 8.8-27.1 16-33.7-55.9-6.2-112.3-14.3-112.3-110.5 0-27.5 7.6-41.3 23.6-58.9-2.6-6.5-11.1-33.3 2.6-67.9 20.9-6.5 69 27 69 27 20-5.6 41.5-8.5 62.8-8.5s42.8 2.9 62.8 8.5c0 0 48.1-33.6 69-27 13.7 34.7 5.2 61.4 2.6 67.9 16 17.7 25.8 31.5 25.8 58.9 0 96.5-58.9 104.2-114.8 110.5 9.2 7.9 17 22.9 17 46.4 0 33.7-.3 75.4-.3 83.6 0 6.5 4.6 14.4 17.3 12.1C428.2 457.8 496 362.9 496 252 496 113.3 383.5 8 244.8 8zM97.2 352.9c-1.3 1-1 3.3 .7 5.2 1.6 1.6 3.9 2.3 5.2 1 1.3-1 1-3.3-.7-5.2-1.6-1.6-3.9-2.3-5.2-1zm-10.8-8.1c-.7 1.3 .3 2.9 2.3 3.9 1.6 1 3.6 .7 4.3-.7 .7-1.3-.3-2.9-2.3-3.9-2-.6-3.6-.3-4.3 .7zm32.4 35.6c-1.6 1.3-1 4.3 1.3 6.2 2.3 2.3 5.2 2.6 6.5 1 1.3-1.3 .7-4.3-1.3-6.2-2.2-2.3-5.2-2.6-6.5-1zm-11.4-14.7c-1.6 1-1.6 3.6 0 5.9 1.6 2.3 4.3 3.3 5.6 2.3 1.6-1.3 1.6-3.9 0-6.2-1.4-2.3-4-3.3-5.6-2z" />
              </svg>
            </a>
          </li>
        </ul>
      </div>

      {/* Terminal scan line effect */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-cyan-400/5 to-transparent animate-pulse pointer-events-none" />
    </div>
  );
};

export default Navbar;