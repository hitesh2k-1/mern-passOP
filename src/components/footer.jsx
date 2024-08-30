import React from 'react'

const footer = () => {
  return (
    <div className='flex justify-center flex-col items-center bg-black py-2 sticky bottom-0 w-full'>
    <div className='text-white text-sm' >
      Created by Hitesh
      </div>
      <div className="logo font-bold cursor-pointer ">
        <span className='font-bold text-md text-green-400' >&lt;</span>
        <span className='font-bold text-md text-white' >Pass</span>
        <span className='font-bold text-md text-green-400' >OP/&gt;</span>
    </div>
    </div>
  )
}

export default footer
