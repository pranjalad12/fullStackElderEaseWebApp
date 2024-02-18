'use client';
import Link from 'next/link.js';
import Image from 'next/image.js';
import { useState, useEffect } from 'react';
import { UserAuth } from "../app/context/AuthContext.js"


const Nav = () => {
  const { user, googleSignIn, logOut } = UserAuth();
  const [toggleDropdown, setToggleDropdown] = useState(false);
  //  useEffect(() => {
  //   const isUserLoggedIn=false;
  //   const setUpProviders = async()=>{
  //       const response=await getProviders();
  //       setProviders(response);
  //   }
  //   setUpProviders();
  //  },[]);
  console.log(user);
  const handleSignIn = async () => {
    try {
      await googleSignIn();
    }
    catch (error) {
      console.log(error);
    }
  }

  const handleSignOut = async () => {
    try {
      await logOut();
    }
    catch (error) {
      console.log(error);
    }
  }
  return (

    <nav className="flex-between w-full mb-16 pt-3 ">
      <Link href="/" className="flex gap-2 flex-center">
        <Image alt="logo"
          src="/nextjs_13_assets/assets/images/logo.svg"
          width={30}
          height={30}
          className='object-contain'
        />
        <p className="logo_text">Promptopia</p>
      </Link>
      {/* {console.log(providers)} */}
      {/* //Desktop navigation */}
      <div className="sm:flex hidden">
        {user ? (
          <div className="flex gap-3 md:gap-5">
            {/* Mount the UserButton component */}
            <Link href="/" className="black_btn">
              Home Page
            </Link>
            <button type='button' className='outline_btn' onClick={handleSignOut}>
              Sign Out
            </button>
            {/* <Link href="/profile"> */}
            < >
              <Link href='/profile'>
                <Image
                  src={user?.photoURL}
                  width={37}
                  height={37}
                  className='rounded-full'
                  alt='profile'
                />
              </Link>

            </>
          </div>

        ) :
          (<div>

            <div className='flex gap-3 md:gap-5'>
              <button
                type='button'
                // key={provider.name}
                onClick={handleSignIn}
                className='black_btn'
              >
                Login in
              </button>
              <button
                type='button'
                // key={provider.name}
                onClick={handleSignIn}
                className='black_btn'
              >
                Sign Up
              </button>
            </div>

          </div>)}
      </div>

      {/* //mobile view */}
      <div className="sm:hidden flex relative">
        {user ? (
          <div>


            {/* Mount the UserButton component */}
            <Image
              src={user?.photoURL}
              width={37}
              height={37}
              className='rounded-full'
              alt='profile'
              onClick={() => setToggleDropdown(!toggleDropdown)}
            />

            {toggleDropdown && (
              <div className='dropdown'>
                <Link
                  href='/profile'
                  className='dropdown_link'
                  onClick={() => setToggleDropdown(false)}
                >
                  My Profile
                </Link>
                <Link
                  href='/create-prompt'
                  className='dropdown_link'
                  onClick={() => setToggleDropdown(false)}
                >
                  Create Prompt
                </Link>
                <button
                  type='button'
                  onClick={handleSignOut}
                  className='mt-5 w-full black_btn'
                >
                  Sign Out
                </button>
              </div>
            )}



          </div>

        ) :
          (<div>
            <div className='flex gap-3 md:gap-5'>
              <button
                type='button'
                // key={provider.name}
                onClick={handleSignIn}
                className='black_btn'
              >
                Login in
              </button>
              <button
                type='button'
                // key={provider.name}
                onClick={handleSignIn}
                className='black_btn'
              >
                Sign Up
              </button>
            </div>
          </div>)}
      </div>
    </nav>
  )
}

export default Nav;