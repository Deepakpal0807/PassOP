import React from 'react'

const Footer = () => {
  return (
    <div className=" bg-purple-700 w-full  py-1 overflow-x-hidden">
        <div className='logo text-center font-serif font-bold text-xl'>
          <span className='text-green-500'>&lt;</span>
          <span>Pass</span>
          <span className='text-green-500'> OP/&gt;</span>

        </div>
        <div className='text-center font-bold font-serif text-xl'>
           <span>Made with 	
            <span className='text-red-700 text-2xl'> &#9829; </span>
            
            by <span className='text-green-500'>D</span>eepak <span className='text-green-500'>P</span>al</span>
        </div>
    </div>
  )
}

export default Footer