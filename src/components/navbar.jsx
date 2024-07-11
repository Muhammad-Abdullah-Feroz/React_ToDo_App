import React from 'react'

const navbar = () => {
  return (
    <nav className='flex text-xl justify-between bg-violet-900 text-white py-3'>
        <div className="logo">
            <span className='font-bold text-2xl mx-8 cursor-pointer'>Task Planner</span>
        </div>
        <ul className="flex gap-8 mx-8">
            {/* <li className='cursor-pointer hover:font-bold'>About</li>
            <li className='cursor-pointer hover:font-bold'>Your Tasks</li> */}
        </ul>
    </nav>
  )
}

export default navbar
