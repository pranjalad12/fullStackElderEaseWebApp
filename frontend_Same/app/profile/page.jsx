"use client"
// pages/profile.jsx
import React, { useEffect, useState } from 'react';
import {UserAuth} from "../context/AuthContext.js"
import { redirect } from 'next/navigation.js'
import Link from 'next/link.js'
import Image from 'next/image.js'

const Profile = () => {
  const {user}=UserAuth();
  console.log(user);
  const [first, setfirst] = useState("ans1");

  useEffect(()=>{
    
  },[user])

  const AccordionItem = ({header, text}) => {
    const [active, setActive] = useState(false);

    const handleToggle = (event) => {
        event.preventDefault();
        setActive(!active);

    };
    return (
        <div
            className="mb-8 w-full rounded-lg bg-white p-4 shadow-[0px_20px_95px_0px_rgba(201,203,204,0.30)] sm:p-8 lg:px-6 xl:px-8">
            <button
                className={`faq-btn flex w-full text-left`}
                onClick={(ev) => handleToggle(ev)}
            >
                <div
                    className="mr-5 flex h-10 w-full max-w-[40px] items-center justify-center rounded-lg bg-primary/5 text-primary ">
                    <svg
                        className={`fill-primary stroke-primary duration-200 ease-in-out ${
                            active ? "rotate-180" : ""
                        }`}
                        width="17"
                        height="10"
                        viewBox="0 0 17 10"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            d="M7.28687 8.43257L7.28679 8.43265L7.29496 8.43985C7.62576 8.73124 8.02464 8.86001 8.41472 8.86001C8.83092 8.86001 9.22376 8.69083 9.53447 8.41713L9.53454 8.41721L9.54184 8.41052L15.7631 2.70784L15.7691 2.70231L15.7749 2.69659C16.0981 2.38028 16.1985 1.80579 15.7981 1.41393C15.4803 1.1028 14.9167 1.00854 14.5249 1.38489L8.41472 7.00806L2.29995 1.38063L2.29151 1.37286L2.28271 1.36548C1.93092 1.07036 1.38469 1.06804 1.03129 1.41393L1.01755 1.42738L1.00488 1.44184C0.69687 1.79355 0.695778 2.34549 1.0545 2.69659L1.05999 2.70196L1.06565 2.70717L7.28687 8.43257Z"
                            fill=""
                            stroke=""
                        />
                    </svg>
                </div>

                <div className="w-full">
                    <h4 className="mt-1 text-lg font-semibold text-dark ">
                        {header}
                    </h4>
                </div>
            </button>

            <div
                className={`pl-[62px] duration-200 ease-in-out ${
                    active ? "block" : "hidden"
                }`}
            >
                {/* <p className="py-3 text-base leading-relaxed text-body-color ">
                    {text}
                </p> */}
                <input type="text" id="input-group-1" value={first}  onChange={(e) => setfirst({ first: e.target.value })}
                                           className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5"
                />
              
            </div>
        </div>
    );
};




    return (
        <>
          {user ? (<div>
            <div className='flex-between w-full mb-8 pt-3'>
                <p className='text-2xl font-semibold'>User Profile</p>
                {/* Desktop Navigation */}
                <div className='sm:flex hidden'>
                    {/* {session?.user ? ( */}
                    <div className='flex gap-3 md:gap-5'>

                        <button
                            className="bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow">
                            Cancel
                        </button>
                        <button
                            className="bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow">
                            Save
                        </button>
                    </div>

                    {/* ) : (
          <>
            {providers &&
              Object.values(providers).map((provider) => (
                <button
                  type='button'
                  key={provider.name}
                  onClick={() => {
                    signIn(provider.id);
                  }}
                  className='black_btn'
                >
                  Sign in
                </button>
              ))}
          </>
        ) */}
                    {/* } */}
                </div>

                {/* Mobile Navigation */}
                

            </div>
            <div className=" w-full bg-white-200 mb-24 border-2 border-grey-300">
                <div className="md:flex border-4 border-amber-200">

                    <div className="flex items-center p-8">
                    <Image
                            src={user?.photoURL}
                            width={100}
                            height={100}
                            className='rounded-full'
                            alt='profile'
                            // onClick={() => setToggleDropdown(!toggleDropdown)}
                      />
                    </div>
                    <div className="p-8 w-full md:w-auto">
                        <div className="uppercase tracking-wide text-sm text-indigo-500 font-semibold mb-4"> {user?.displayName}

                          
                        </div>
                        {/*<a href="#" className="block mt-1 text-lg leading-tight font-medium text-black hover:underline">Id :22</a>*/}
                        <div className="flex flex-wrap gap-8">
                            <div>
                                <label htmlFor="input-group-1"
                                       className="block mb-2 text-sm font-medium text-gray-900 ">Your
                                    Email</label>
                                <div className="relative mb-6">
                                    <div
                                        className="absolute inset-y-0 start-0 flex items-center ps-3.5 pointer-events-none">
                                        <svg className="w-4 h-4 text-gray-500" aria-hidden="true"
                                             xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 16">
                                            <path
                                                d="m10.036 8.278 9.258-7.79A1.979 1.979 0 0 0 18 0H2A1.987 1.987 0 0 0 .641.541l9.395 7.737Z"/>
                                            <path
                                                d="M11.241 9.817c-.36.275-.801.425-1.255.427-.428 0-.845-.138-1.187-.395L0 2.6V14a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V2.5l-8.759 7.317Z"/>
                                        </svg>
                                    </div>
                                    <input type="text" id="input-group-1" value={user?.email} disabled={true}
                                           className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5"
                                           />
                                </div>
                            </div>
                            {/* <div>
                                <label htmlFor="input-group-2"
                                       className="block mb-2 text-sm font-medium text-gray-900 ">Password</label>
                                <div className="relative mb-6">
                                    <div
                                        className="absolute inset-y-0 start-0 flex items-center ps-3.5 pointer-events-none">
                                        <svg className="w-4 h-4 text-gray-500" aria-hidden="true"
                                             xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 16">
                                            <path
                                                d="m10.036 8.278 9.258-7.79A1.979 1.979 0 0 0 18 0H2A1.987 1.987 0 0 0 .641.541l9.395 7.737Z"/>
                                            <path
                                                d="M11.241 9.817c-.36.275-.801.425-1.255.427-.428 0-.845-.138-1.187-.395L0 2.6V14a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V2.5l-8.759 7.317Z"/>
                                        </svg>
                                    </div>
                                    <input type="text" id="input-group-2"
                                           className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5"
                                           placeholder="name@flowbite.com"/>
                                </div>
                            </div> */}
                        </div>

                    </div>

                </div>
                <section
                    className="relative z-20 overflow-hidden bg-transparent pb-12 pt-20 dark:bg-dark lg:pb-[90px] lg:pt-[120px]">
                    <div className="container mx-auto">
                        <div className="-mx-4 flex flex-wrap">
                            <div className="w-full px-4">
                                <div className="mx-auto mb-[60px] max-w-[520px] text-center lg:mb-20">
              <span className="mb-2 block text-lg font-semibold text-primary">
                FAQ
              </span>
                                    <h2 className="mb-4 text-xl font-bold text-dark  sm:text-[40px]/[48px]">
                                        Any Questions? Look Here
                                    </h2>
                                    <p className="text-base text-body-color dark:text-dark-6">
                                        There are many variations of passages of Lorem Ipsum available
                                        but the majority have suffered alteration in some form.
                                    </p>
                                </div>
                            </div>
                        </div>

                        <div className="-mx-4 flex flex-wrap">
                            <div className="w-full px-4 lg:w-1/2 ">
                                <AccordionItem
                                    header="How long we deliver your first blog post?"
                                    text="It takes 2-3 weeks to get your first blog post ready. That includes the in-depth research & creation of your monthly content marketing strategy that we do before writing your first blog post, Ipsum available ."
                                />
                                <AccordionItem
                                    header="How long we deliver your first blog post?"
                                    text="It takes 2-3 weeks to get your first blog post ready. That includes the in-depth research & creation of your monthly content marketing strategy that we do before writing your first blog post, Ipsum available ."
                                />
                                <AccordionItem
                                    header="How long we deliver your first blog post?"
                                    text="It takes 2-3 weeks to get your first blog post ready. That includes the in-depth research & creation of your monthly content marketing strategy that we do before writing your first blog post, Ipsum available ."
                                />
                            </div>
                            <div className="w-full px-4 lg:w-1/2">
                                <AccordionItem
                                    header="How long we deliver your first blog post?"
                                    text="It takes 2-3 weeks to get your first blog post ready. That includes the in-depth research & creation of your monthly content marketing strategy that we do before writing your first blog post, Ipsum available ."
                                />
                                <AccordionItem
                                    header="How long we deliver your first blog post?"
                                    text="It takes 2-3 weeks to get your first blog post ready. That includes the in-depth research & creation of your monthly content marketing strategy that we do before writing your first blog post, Ipsum available ."
                                />
                                <AccordionItem
                                    header="How long we deliver your first blog post?"
                                    text="It takes 2-3 weeks to get your first blog post ready. That includes the in-depth research & creation of your monthly content marketing strategy that we do before writing your first blog post, Ipsum available ."
                                />
                            </div>
                        </div>
                    </div>

                    <div className="absolute bottom-0 right-0 z-[-1]">
                        <svg
                            width="1440"
                            height="886"
                            viewBox="0 0 1440 886"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                opacity="0.5"
                                d="M193.307 -273.321L1480.87 1014.24L1121.85 1373.26C1121.85 1373.26 731.745 983.231 478.513 729.927C225.976 477.317 -165.714 85.6993 -165.714 85.6993L193.307 -273.321Z"
                                fill="url(#paint0_linear)"
                            />
                            <defs>
                                <linearGradient
                                    id="paint0_linear"
                                    x1="1308.65"
                                    y1="1142.58"
                                    x2="602.827"
                                    y2="-418.681"
                                    gradientUnits="userSpaceOnUse"
                                >
                                    <stop stop-color="#3056D3" stop-opacity="0.36"/>
                                    <stop offset="1" stop-color="#F5F2FD" stop-opacity="0"/>
                                    <stop offset="1" stop-color="#F5F2FD" stop-opacity="0.096144"/>
                                </linearGradient>
                            </defs>
                        </svg>
                    </div>
                </section>
            </div>
          </div>) :(
             redirect('/')
          )}
           

        </>
    );
};


export default Profile;