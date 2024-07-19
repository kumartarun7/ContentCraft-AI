"use client"
import React, { useState } from 'react';
import Header from './_components/Header';
import { TotalUsageContext } from '../(context)/TotalUsageContext';
import { MenuIcon } from 'lucide-react';
import Image from 'next/image';
import { ClerkProvider, SignInButton, SignedIn, SignedOut, UserButton } from '@clerk/nextjs';
import SideNav from './_components/SideNav';
import Link from 'next/link';

const DesktopNav = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div>
     {!isOpen&&  <button onClick={() => setIsOpen(!isOpen)}> 
              <div className='mx-3'><MenuIcon></MenuIcon></div>
            </button>}
      {isOpen && (
        
        <div
          className='fixed top-0 left-0  bg-white shadow-md p-4 rounded my-2'
          style={{ zIndex: 1000 }}
        > 
          <ul className='flex flex-col'>
          <button onClick={() => setIsOpen(!isOpen)}> 
              <div><MenuIcon></MenuIcon></div>
            </button>
            <li className='hover:bg-primary hover:text-white rounded'> <button onClick={() => setIsOpen(!isOpen)}> <Link href="/dashboard">Home</Link></button></li>
            <li className='hover:bg-primary hover:text-white rounded'><button onClick={() => setIsOpen(!isOpen)}> <Link href="/dashboard/history">History</Link></button></li>
            <li className='hover:bg-primary hover:text-white rounded'> <button onClick={() => setIsOpen(!isOpen)}> <Link href="/dashboard/contactus">Contact Us</Link></button></li>
           
            
           
           
           
           
          </ul>
        </div>
      )}
    </div>
  );
};

const layout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  const [totalUsage, setTotalUsage] = useState<number>(0);

  return (
    <TotalUsageContext.Provider value={{ totalUsage, setTotalUsage }}>
      <div className='bg-slate-100 min-h-screen'>
        <div className='md:hidden'>
          <div className='flex justify-between items-center'>
           
             <DesktopNav />

            <Image src={'/logo.png'} alt='logo' width={80} height={60} className='m-5' />

            <div className='mx-3'>
              <SignedIn>
                <UserButton />
              </SignedIn>
            </div>
          </div>
          
        </div>

        <div className='md:w-64 fixed hidden md:block'>
          <SideNav />
        </div>

        <div className='md:ml-64'>
          <Header />
          {children}
        </div>

       
      </div>
    </TotalUsageContext.Provider>
  );
}

export default layout;