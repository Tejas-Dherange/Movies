import React from 'react'
import { ModeToggle } from '../Toggle/toggle'
import Link from 'next/link'

const Navbar = () => {
  return (
    <div>
       <nav className="flex justify-around items-center z-19 md:gap-60 gap-32  mt-[-1px]  border-y-2 p-4">
        <Link href="/">
          {/* <div>
          <img src="image.png" className='h-12 w-48 bg-transparent' alt="dnfhguhiuhr" />
          </div> */}
        <h1 className="text-4xl font-bold">
          Movies </h1>
        </Link>
        
        <ModeToggle />
      </nav>
    </div>
  )
}

export default Navbar
