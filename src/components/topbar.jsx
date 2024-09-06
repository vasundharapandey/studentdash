import React from 'react'
import { FaRegUserCircle } from "react-icons/fa";

function Topbar() {
  return (
    <div className='w-full p-8 h-[12vh] flex justify-between items-center text-white bg-[#222222]'>
        <div className=' text-3xl'><a href='/'>Alemeno</a></div>
     
        <div className='flex gap-3 items-center text-xl'>
            <div className='text-3xl'><FaRegUserCircle /></div>
            <div className='pb-1'>
                <a href='/dash'>Vasundhara Pandey</a>
            </div>
        </div>
    </div>
  )
}

export default Topbar