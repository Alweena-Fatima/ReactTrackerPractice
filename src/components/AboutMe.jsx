import React from 'react';

const fixedSnowflakes = [
  { left: '15%', top: '15%', fontSize: '10px' },
  { left: '85%', top: '25%', fontSize: '14px' },
  { left: '50%', top: '70%', fontSize: '12px' },
  { left: '92%', top: '8%', fontSize: '16px' },
  { left: '8%', top: '85%', fontSize: '11px' },
  { left: '30%', top: '45%', fontSize: '13px' },
  { left: '70%', top: '10%', fontSize: '10px' },
  { left: '60%', top: '55%', fontSize: '15px' },
];

const AboutMe = () => {
  return (
    <div className="relative min-h-screen bg-slate-900 py-12 px-4 overflow-hidden">
      {/* Static snow background */}
      <div className="absolute inset-0 pointer-events-none">
        {fixedSnowflakes.map((style, i) => (
          <div
            key={i}
            className="absolute text-white opacity-40"
            style={style}
          >
            ❄
          </div>
        ))}
      </div>
        
      <div className="max-w-4xl mx-auto relative z-10">
      {/* Dashboard Features Terminal */}
        <div className="bg-slate-800/90 border-2 border-cyan-900 rounded-lg shadow-2xl backdrop-blur-sm mb-8 font-mono">
          {/* Terminal Header */}
          <div className="bg-slate-700 px-4 py-2 rounded-t-lg flex items-center space-x-2">
            <span className="text-emerald-400 text-sm">●</span>
            <span className="text-yellow-400 text-sm">●</span>
            <span className="text-red-400 text-sm">●</span>
            <span className="text-gray-400 text-xs ml-2">~/dashboard_info.json</span>
          </div>

          {/* Terminal Content */}
          <div className="p-8">
            <h2 className="text-2xl font-bold mb-6 text-emerald-400">
              <span className="text-cyan-400">$</span> dashboard_features
            </h2>
            
            <div className="space-y-4">
              <p className="text-gray-300 leading-relaxed mb-4">
                <span className="text-purple-400">&gt;&gt;</span> This dashboard tracks problems from <span className="text-cyan-400 font-semibold">4 curated question sheets</span> to help master Data Structures & Algorithms:
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* NeetCode */}
                <div className="bg-slate-700/50 border border-cyan-400/30 rounded p-4">
                  <div className="flex items-center space-x-2 mb-2">
                    <span className="text-cyan-400"></span>
                    <h3 className="text-lg font-semibold text-cyan-400">NeetCode</h3>
                  </div>
                 <p className="text-sm text-gray-400 pl-2"><a href='https://neetcode.io/practice?tab=neetcode150'> Link </a></p>
                </div>

                {/* Sean Prashad */}
                <div className="bg-slate-700/50 border border-emerald-400/30 rounded p-4">
                  <div className="flex items-center space-x-2 mb-2">
                    <span className="text-emerald-400"></span>
                    <h3 className="text-lg font-semibold text-emerald-400"> Sean Prashad </h3>
                  </div>
                  <p className="text-sm text-gray-400 pl-2"> <a href='https://seanprashad.com/leetcode-patterns/'>Link </a></p>
                </div>

                {/* Blind 75 */}
                <div className="bg-slate-700/50 border border-yellow-400/30 rounded p-4">
                  <div className="flex items-center space-x-2 mb-2">
                    <span className="text-yellow-400"></span>
                    <h3 className="text-lg font-semibold text-yellow-400">Blind 75</h3>
                  </div>
                  <p className="text-sm text-gray-400 pl-2"><a href='https://neetcode.io/practice?tab=blind75'> Link</a></p>
                </div>

                {/* Amazon 6 Months */}
                <div className="bg-slate-700/50 border border-purple-400/30 rounded p-4">
                  <div className="flex items-center space-x-2 mb-2">
                    <span className="text-purple-400"></span>
                    <h3 className="text-lg font-semibold text-purple-400">Amazon 6M Important</h3>
                  </div>
                  <p className="text-sm text-gray-400 pl-2"><a href='https://medium.com/@prashant558908/amazon-most-frequent-ds-algo-questions-in-2025-arranged-by-data-structures-5b876b1d9d05'>Blog Link</a></p>
                </div>
              </div>

              <div className="mt-6 p-4 bg-slate-700/30 border-l-4 border-cyan-400 rounded">
                <p className="text-gray-300 text-sm">
                  <span className="text-cyan-400 font-semibold">Note:</span> All sheets combined provide a comprehensive roadmap for technical interview preparation and algorithm mastery.
                </p>
              </div>
            </div>
          </div>
        </div>
        {/* Main About Terminal */}
        <div className="bg-slate-800/90 border-2 border-cyan-900 rounded-lg shadow-2xl backdrop-blur-sm  font-mono">
          {/* Terminal Header */}
          <div className="bg-slate-700 px-4 py-2 rounded-t-lg flex items-center space-x-2">
            <span className="text-emerald-400 text-sm">●</span>
            <span className="text-yellow-400 text-sm">●</span>
            <span className="text-red-400 text-sm">●</span>
            <span className="text-gray-400 text-xs ml-2">~/about.sh</span>
          </div>

          {/* Terminal Content */}
          <div className="p-8">
            <h1 className="text-3xl font-bold mb-6 text-cyan-400">
              <span className="text-emerald-400">$</span> whoami
            </h1>
            
            <div className="space-y-4 text-gray-300">
              <p className="leading-relaxed">
                <span className="text-purple-400">&gt;&gt;</span> Hi, I'm <span className="text-emerald-400 font-semibold">Alweena Fatima</span>, a passionate <span className="text-cyan-400">Computer Science and Engineering</span> student who loves solving problems and building things that make learning more fun and efficient.
              </p>
              
              <p className="leading-relaxed">
                <span className="text-purple-400">&gt;&gt;</span> I enjoy working with technologies like <span className="text-yellow-400">React</span>, <span className="text-yellow-400">Java</span>, and <span className="text-yellow-400">Spring Boot</span>, and I'm constantly learning and improving through hands-on projects. This website — my <span className="text-emerald-400 font-semibold">DSA Progress Dashboard</span> — is something I built to track my own problem-solving journey and growth over time.
              </p>
              
              <p className="leading-relaxed">
                <span className="text-purple-400">&gt;&gt;</span> Apart from coding, I'm also interested in <span className="text-cyan-400">game development using Unity</span>, and I love experimenting with new ideas that combine creativity and logic.
              </p>
            </div>
          </div>
        </div>

        

        {/* Footer command prompt */}
        <div className="mt-8 text-center">
          <p className="text-gray-500 font-mono text-sm">
            <span className="text-emerald-400">$</span> Happy Coding! <span className="animate-pulse">|</span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default AboutMe;