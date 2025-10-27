import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import NavBar from './components/navbar'
import Section1  from './components/sectiontop/section1'
import Section2 from './components/section2/section2'
import { problems } from './data/problems'
import AboutMe from './components/AboutMe'
import { Toaster } from 'react-hot-toast'
function App() {
  const [option,setOption]=useState('Home');
  //option usestate to check if the curr is home or about me 
  return (
    <div className="bg-white min-h-screen">
    <Toaster
        toastOptions={{
          // Global base style
          position:'top-center',
          style: {
            background: '#0d1117',        // GitHub dark background
            color: '#e6edf3',             // GitHub light text
            border: '1px solid #30363d',  // Subtle dark border
            fontFamily: 'monospace',      // Code-like font
            fontSize: '16px',
            borderRadius: '8px',
            padding: '10px 16px',
            boxShadow: '0 4px 12px rgba(0,0,0,0.3)',
          },

          // Success toast (like git success logs)
          success: {
            iconTheme: {
              primary: '#3fb950',   // GitHub green
              secondary: '#0d1117',
            },
            style: {
              border: '1px solid #238636',
              color: '#3fb950',
            },
          },

          // Error toast (like git error logs)
          error: {
            iconTheme: {
              primary: '#f85149',
              secondary: '#0d1117',
            },
            style: {
              border: '1px solid #f85149',
              color: '#ff7b72',
            },
          },

          // Loading or neutral state
          loading: {
            iconTheme: {
              primary: '#facc15',
              secondary: '#0d1117',
            },
            style: {
              border: '1px solid #facc15',
              color: '#facc15',
            },
          },
        }}
      />

      <NavBar setOption={setOption}/>
      {option=='Home' &&(
        <>
        <Section1  />
      <Section2 problems={problems}></Section2>
        </>
      )}
        {option === 'AboutMe' && <AboutMe />}
      
    </div>
  )
}

export default App
