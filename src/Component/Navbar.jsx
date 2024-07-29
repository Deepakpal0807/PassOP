import React from 'react';


const Navbar = () => {
  return (
    <div className='bg-purple-600 font-serif font-semibold border border-black py-2 flex justify-between items-center sticky top-0 z-10 overflow-x-hidden'>
  <div className='font-bold ml-4 hover:text-xl '>
    <span className='text-green-500 font-bold font-serif text-3xl md:text-lg'>&lt; </span>
    <span className='text-3xl md:text-lg'>Pass</span>
    <span className='text-green-500 font-serif text-3xl md:text-lg'> OP/&gt;</span>
  </div>
  <ul className='flex justify-around items-end gap-6 mr-4 text-lg sm:text-lg md:text-xl lg:text-lg'>
    <li>
      <a className='hover:text-xl' href='/'>Home</a>
    </li>
    <li>
      <a className='hover:text-xl' href='#'>About</a>
    </li>
    <li>
      <a className='hover:text-xl' href='#'>Contact</a>
    </li>
  </ul>
</div>

  );
}

export default Navbar;
