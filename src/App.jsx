import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

import NavBar from './components/navbar'
import Problemtable from './components/section2/Problemtable'
import Section1  from './components/sectiontop/section1'
import Section2 from './components/section2/section2'
import { problems } from './data/problems'
function App() {
  return (
    <div className="bg-white min-h-screen">
      <NavBar />
      <Section1  />
      <Section2 problems={problems}></Section2>
    </div>
  )
}

export default App
