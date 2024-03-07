"use client";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { UserAuth } from "../../app/context/AuthContext"

import ThemeToggler from "./ThemeToggler";
import menuData from "./menuData";
import { log } from "console";

const Header = () => {
  const { user, googleSignIn, logOut } = UserAuth();
  const [isToggle, setToggle] = useState(false);
  const [navigationOpen, setNavigationOpen] = useState(false);
  const [dropdownToggler, setDropdownToggler] = useState(false);
  const [stickyMenu, setStickyMenu] = useState(false);
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
  const pathUrl = usePathname();

  // Sticky menu
  const handleStickyMenu = () => {
    if (window.scrollY >= 80) {
      setStickyMenu(true);
    } else {
      setStickyMenu(false);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleStickyMenu);
  });

  return (
    <>
      {user ? (

        <header
          className={`fixed left-0 top-0 z-99999 w-full py-7 ${stickyMenu
            ? "bg-white !py-4 shadow transition duration-100 dark:bg-black"
            : ""
            }`}
        >
          <div className="relative md:flex  hidden mx-auto max-w-c-1390 items-center justify-between px-4 md:px-8 2xl:px-0 ">
            <div className="flex items-center justify-between">
              <a href="/">
                <Image
                  src="/images/brand/logo1.png"
                  alt="logo"
                  width={19.03}
                  height={10}
                  className="hidden  dark:block"
                />
                <Image
                  src="/images/brand/logo1.png"
                  alt="logo"
                  width={50.03}
                  height={30}
                  className=" dark:hidden"
                />

              </a>
              <p className="text-pala px-2 font-bold text-3xl">ElderEase</p>
            </div>
            <div className="mt-7 md:flex hidden items-center gap-6 xl:mt-0">
              {/* <ThemeToggler /> */}

              <Link
                href="/Session"
                className="text-xl font-medium text-black hover:text-primary font-extrabold "
              >
                Start Session 🌟
              </Link>
              <Link
                href="/Progress"
                className="text-xl font-medium text-black hover:text-primary font-extrabold "
              >
                Progress 🌟
              </Link>

              <button
                onClick={handleSignOut}
                className="rounded-full border border-black bg-black py-1.5 px-5 text-white transition-all hover:bg-white hover:text-black text-center text-sm font-inter flex items-center justify-center            h-11"
              >
                Sign Out
              </button>

              <Link href='/profile'>
                <Image
                  src={user?.photoURL}
                  width={37}
                  height={37}
                  className='rounded-full mx-2'
                  alt='profile'
                />
              </Link>
            </div>
          </div>
          <div className="flex justify-between md:hidden">

          <div className="flex items-center justify-between">
              <a href="/">
                <Image
                  src="/images/brand/logo1.png"
                  alt="logo"
                  width={19.03}
                  height={10}
                  className="hidden  dark:block"
                />
                <Image
                  src="/images/brand/logo1.png"
                  alt="logo"
                  width={50.03}
                  height={30}
                  className=" dark:hidden"
                />

              </a>
              <p className="text-pala px-2 font-bold text-3xl">ElderEase</p>
            </div>
{/* Mount the UserButton component */}
<div>
<Image src={user.photoURL}
  width={37}
  height={37}
  className='rounded-full mx-2'
  alt="profile"
  onClick={() => {
    setToggle(!isToggle);
    
  } }
/>
{isToggle && (
  <div className='z-50 absolute right-0 top-full mt-3 w-[150px] p-5 rounded-lg bg-sky-50 flex flex-col gap-2 justify-end items-end'>
    <Link
      href='/Session'
      className='dropdown_link text-xl font-medium text-black hover:text-primary font-extrabold self-center pl-5
      '
      onClick={() => setToggle(false)}
    >
      Start Session 🌟
    </Link>
    <Link
      href='/Progress'
      className='dropdown_link text-xl font-medium text-black hover:text-primary font-extrabold
      '
      onClick={() => setToggle(false)}
    >
      Progress 🌟
    </Link>
    <Link
      href='/profile'
      className='dropdown_link text-xl font-medium text-black hover:text-primary font-extrabold
      '
      onClick={() => setToggle(false)}
    >
      My Profile 
    </Link>
    <button
                onClick={handleSignOut}
                className="rounded-full border border-black bg-black py-1.5 px-5 text-white transition-all hover:bg-white hover:text-black text-center text-sm font-inter flex items-center justify-center            h-11"
              >
                Sign Out
              </button>
    
  </div>
)}



</div>
</div>

        </header>) :
        
        
        
        (<header
          className={`fixed left-0 top-0 z-99999 w-full py-7 ${stickyMenu
            ? "bg-white !py-4 shadow transition duration-100 dark:bg-black"
            : ""
            }`}
        >
          <div className="relative flex mx-auto max-w-c-1390 items-center justify-between px-4 md:px-8 2xl:px-0">
            <div className="flex items-center justify-between">
              <a href="/">
                <Image
                  src="/images/brand/logo1.png"
                  alt="logo"
                  width={19.03}
                  height={10}
                  className="hidden  dark:block"
                />
                <Image
                  src="/images/brand/logo1.png"
                  alt="logo"
                  width={50.03}
                  height={30}
                  className=" dark:hidden"
                />

              </a>
              <p className="text-orange-500 px-2 font-bold text-3xl">ElderEase</p>
            </div>
            <div className="mt-7 flex items-center gap-6 xl:mt-0">


              <button
                onClick={handleSignIn}
                className="rounded-full border border-black bg-black py-1.5 px-5 text-white transition-all hover:bg-white hover:text-black text-center text-sm font-inter flex items-center justify-center            h-11"
              >
                Sign In
              </button>
            </div>
          </div>
        </header>)}



     
    </>
  );
};

export default Header;
