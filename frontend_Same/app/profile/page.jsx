"use client"
// pages/profile.jsx

import React, { useEffect, useState } from 'react';
import { UserAuth } from "../context/AuthContext";
import { redirect } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import AccordionItem from '../../components/Accordian.jsx'

const Profile = () => {
    const { user } = UserAuth();
    const [first, setfirst] = useState({ first: "" });
    const options2 = ["Arthritis", "Balance issues", "Indigestion","Diabetes","Hypertension"];
    const options1=["Neck", "shoulders", "back", "knee" ,"hips"]
    const options3 =[" Increase Flexibility & Mobility","Improve balance and stability "," Reduce Stress & Relax"]
    
    return (
        <>
            {user ? (<div className='w-full'>
                <div className='flex-between w-full mb-5 pt-3'>
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
                                                    d="m10.036 8.278 9.258-7.79A1.979 1.979 0 0 0 18 0H2A1.987 1.987 0 0 0 .641.541l9.395 7.737Z" />
                                                <path
                                                    d="M11.241 9.817c-.36.275-.801.425-1.255.427-.428 0-.845-.138-1.187-.395L0 2.6V14a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V2.5l-8.759 7.317Z" />
                                            </svg>
                                        </div>
                                        <input type="text" id="input-group-1" value={user?.email} disabled={true}
                                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5"
                                        />
                                    </div>
                                </div>
                                <div>
                               
                            </div>
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

                            <div className="mx-2  flex-wrap flex justify-center w-full">
                                <div className="w-full px-4 flex flex-col justify-center items-center">
                                    <AccordionItem
                                        header="What is the disease you are facing?"
                                        text="It takes 2-3 weeks to get your first blog post ready. That includes the in-depth research & creation of your monthly content marketing strategy that we do before writing your first blog post, Ipsum available ."
                                        options={options2}
                                    />
                                    <AccordionItem
                                        header="Do you have any pain in your body?"
                                        text="It takes 2-3 weeks to get your first blog post ready. That includes the in-depth research & creation of your monthly content marketing strategy that we do before writing your first blog post, Ipsum available ."
                                        options={options1}
                                    />
                                    <AccordionItem
                                        header="What is your primary goal?"
                                        text="It takes 2-3 weeks to get your first blog post ready. That includes the in-depth research & creation of your monthly content marketing strategy that we do before writing your first blog post, Ipsum available ."
                                        options={options3}
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
                                        <stop stop-color="#3056D3" stop-opacity="0.36" />
                                        <stop offset="1" stop-color="#F5F2FD" stop-opacity="0" />
                                        <stop offset="1" stop-color="#F5F2FD" stop-opacity="0.096144" />
                                    </linearGradient>
                                </defs>
                            </svg>
                        </div>
                    </section>
                </div>
            </div>) : (
                redirect('/')
            )}


        </>
    );
};


export default Profile;