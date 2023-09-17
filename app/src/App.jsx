import { useState } from 'react'
import Landing from './components/Landing'
import Navbar from './components/Navbar'
import Shop from './components/Shop'
import Explore from './components/Explore'
import Create from './components/Create'
function App() {
  return (
      <div className='min-h-screen' style={{
        backgroundColor: 'rgb(220, 220, 225)',
        backgroundImage: `radial-gradient(at 0% 14%, rgb(52, 211, 153) 0, transparent 20%), 
        radial-gradient(at 4% 0%, rgb(250, 204, 21) 0, transparent 20%), 
        radial-gradient(at 100% 64%, rgb(192, 132, 252) 0, transparent 26%), 
        radial-gradient(at 100% 97%, rgb(244, 114, 182) 0, transparent 22%)`
      }}>
        <Navbar />
        <Shop />
      </div>
  )
}

export default App
