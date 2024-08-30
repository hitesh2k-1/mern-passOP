import { useState } from 'react'
import './App.css'
import Navbar from './components/navbar'
import Manager from './components/manager'
import Footer from './components/footer'

function App() {

  return (
    <>
      <Navbar />
    <div className="[background:radial-gradient(125%_125%_at_50%_10%,#000_40%,#63e_100%)]">"
        <Manager />
      </div>
      <Footer />
    </>
  )
}

export default App
