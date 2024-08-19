import Link from 'next/link'
import React from 'react'

const Footer = () => {
  return (
    <div className='flex md:gap-96 gap-14 justify-center items-center w-full  text-sm p-3 border  border-b-0 border-x-0'>
        <p className='' >
            &copy; All Rights Reserved 
        </p>
        <Link href="/" className=''>
           Clich here to search
        </Link>
    </div>
  )
}

export default Footer
