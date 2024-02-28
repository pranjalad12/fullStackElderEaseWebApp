"use client";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

import ThemeToggler from "./ThemeToggler";
import menuData from "./menuData";

const Header = () => {
  const [navigationOpen, setNavigationOpen] = useState(false);
  const [dropdownToggler, setDropdownToggler] = useState(false);
  const [stickyMenu, setStickyMenu] = useState(false);

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

    <header
      className={`fixed left-0 top-0 z-99999 w-full py-7 ${stickyMenu
        ? "bg-white !py-4 shadow transition duration-100 dark:bg-black"
        : ""
        }`}
    >
      <div className="relative flex mx-auto max-w-c-1390 items-center justify-between px-4 md:px-8 2xl:px-0">
        <div className="flex items-center justify-between">
          <a href="/">
            <Image
              src="/images/brand/logo.svg"
              alt="logo"
              width={19.03}
              height={10}
              className="hidden  dark:block"
            />
            <Image
              src="/images/brand/logo.svg"
              alt="logo"
              width={50.03}
              height={30}
              className=" dark:hidden"
            />
           
          </a>
          <p className="text-orange-500 px-2 font-bold text-3xl">ElderEase</p>
        </div>
        <div className="mt-7 flex items-center gap-6 xl:mt-0">
          {/* <ThemeToggler /> */}

          <Link
            href="/home"
            className="text-regular font-medium text-waterloo hover:text-primary"
          >
            Home Page 🌟
          </Link>

          <Link
            href="https://nextjstemplates.com/templates/solid"
            className="black_btn h-11"
          >
            Sign In
          </Link>
          <Link
            href="/profile"
            className="black_btn h-11" >
            Profile
          </Link>
        </div>
      </div>
    </header>

  );
};

export default Header;
