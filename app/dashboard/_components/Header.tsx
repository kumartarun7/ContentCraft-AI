import { ClerkProvider, SignInButton, SignedIn, SignedOut, UserButton } from '@clerk/nextjs'
import { Search } from 'lucide-react'
import React from 'react'

const Header = () => {
  return (
    <div className=' md:p-3 md:shadow-sm md:border-b-2 md:flex md:justify-between md:items-center md:bg-white hidden '>
       <p>⭐⭐⭐⭐⭐</p>
       <h1 className=' text-5xl font-bold relative right-[35px]'>Welcome <span className='text-primary'>Users!</span></h1>
       <SignedIn>
              <UserButton />
            </SignedIn>
        {/* <div className='flex gap-3 p-2 items-center border rounded-md max-w-lg bg-white'>
            <Search/>
            <input type="text" placeholder='Search...'
            className=' outline-none'/>

        </div> */}
        {/* <div>
          <h2 className=' bg-primary p-1 rounded-full text-white px-2 text-[5px] sm:text-xs'>🔥Join Membership just for $9.99/Monnth</h2>
        </div> */}
      
    </div>
  )
}

export default Header
