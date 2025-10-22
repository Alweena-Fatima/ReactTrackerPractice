import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import NavBar from './components/navbar'
import Section1  from './components/sectiontop/section1'
import Section2 from './components/section2/section2'
import { problems } from './data/problems'
import AboutMe from './components/AboutMe'
function App() {
  const [option,setOption]=useState('Home');
  //option usestate to check if the curr is home or about me 
  return (
    <div className="bg-white min-h-screen">
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
