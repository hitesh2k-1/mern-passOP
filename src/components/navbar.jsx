import React from 'react'

const navbar = () => {
  const github =()=>{
    window.open('https://www.example.com', '_blank');
  }
  return (
    <nav className=' flex items-center justify-between text-white border rounded-lg bg-black px-4 p-2' >
      <div className="logo font-bold cursor-pointer ">
        <span className='font-bold text-2xl text-green-400' >&lt;</span>
        <span className='font-bold text-2xl' >Pass</span>
        <span className='font-bold text-2xl text-green-400' >OP/&gt;</span>
      </div>
    
            <button onClick={github} >
                <img className='invert w-24' src="icons/github.png" alt="" />
            </button>
    </nav>
  )
}

export default navbar
