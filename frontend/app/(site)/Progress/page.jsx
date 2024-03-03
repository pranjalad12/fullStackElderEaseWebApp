"use client"
import PageTitle from "@/components/PageTitle";
import Image from "next/image";
import { DollarSign, Users, CreditCard, Activity } from "lucide-react";
import Card, { CardContent, CardProps } from "@/components/Card";
import BarChart from "@/components/BarChart";
import SalesCard, { SalesProps } from "@/components/SalesCard";

import ErrorPage from "app/(site)/error/page"
import {app} from "app/(site)/firebase";
import Testimonial from "@/components/cardsslider";
import React, { useEffect, useState } from "react";
import { UserAuth } from "app/context/AuthContext.js";

import {
  getFirestore,
  collection,
  where,
  query,
  getDocs,
  or,
  doc,
  updateDoc,
  getDoc,
  setDoc
} from "firebase/firestore";
const cardData = [
  {
    label: "Total Revenue",
    amount: "$45,231.89",
    discription: "+20.1% from last month",
    icon: DollarSign
  },
  {
    label: "Subscriptions",
    amount: "+2350",
    discription: "+180.1% from last month",
    icon: Users
  },
  {
    label: "Sales",
    amount: "+12,234",
    discription: "+19% from last month",
    icon: CreditCard
  },
  {
    label: "Active Now",
    amount: "+573",
    discription: "+201 since last hour",
    icon: Activity
  }
];

const uesrSalesData = [
  {
    name: "Olivia Martin",
    email: "olivia.martin@email.com",
    saleAmount: "+$1,999.00"
  },
  {
    name: "Jackson Lee",
    email: "isabella.nguyen@email.com",
    saleAmount: "+$1,999.00"
  },
  {
    name: "Isabella Nguyen",
    email: "isabella.nguyen@email.com",
    saleAmount: "+$39.00"
  },
  {
    name: "William Kim",
    email: "will@email.com",
    saleAmount: "+$299.00"
  },
  {
    name: "Sofia Davis",
    email: "sofia.davis@email.com",
    saleAmount: "+$39.00"
  }
];


export default function Home() {
  const {user}=UserAuth();
  const [array1,setarray1]=useState([]);
  const [array2,setarray2]=useState([]);
  const [array3,setarray3]=useState([]);
    const db= getFirestore(app);

    useEffect(() => {
      const updateArrays = async () => {
        const docRef = doc(db, "users", user?.uid);
        const docSnapshot = await getDoc(docRef);
        const array1 =await docSnapshot?.data()?.noOfClicksAllTime;  
        const array2 =await docSnapshot?.data()?.noOfPosesInADay;
        const array3 =await docSnapshot?.data()?.timeSpentPerDay;
        console.log("please chal ja")
        console.log(docSnapshot?.data()?.noOfPosesInADay);
  
        // Update state variables
        setarray1(array1 || []);
        setarray2(array2 || []);
        setarray3(array3 || []); // If diseasesData is null or undefined, set an empty array
        
      };
  
      updateArrays();
    }, [user, db]);
    
    // const fetchUserTimeSpentPerDay = async () => {
    //   try {
    //     const docRef = doc(db, "users", user.uid);
    //     const docSnapshot = await getDoc(docRef);
       
    //     return docSnapshot?.data()?.timeSpentPerDay; 
      
    //   } catch (error) {
    //     console.log("Error fetching document data:", error);
    //   }
    // }
    
    // const fetchUserNoOfPosesADay= async () => {
    //   try {
    //     const docRef = doc(db, "users", user.uid);
    //     const docSnapshot = await getDoc(docRef);
    //     const data=await docSnapshot?.data()?.timeSpentPerDay;
    //     // console.log("data")
    //     // console.log(data)
        
    //     return docSnapshot?.data()?.noOfPosesInADay; 
      
    //   } catch (error) {
    //     console.log("Error fetching document data:", error);
    //   }
    // }
    // const fetchUserNoOfClicksAllTime= async () => {
    //   try {
    //     const docRef = doc(db, "users", user.uid);
    //     const docSnapshot = await getDoc(docRef);
    //     const data=await docSnapshot?.data()?.noOfClicksAllTime; 
    //     setarray1(data);
    //     console.log("data")
    //     console.log(data)
    //     return docSnapshot?.data()?.noOfClicksAllTime; 
    //   } catch (error) {
    //     console.log("Error fetching document data:", error);
    //   }
    // }
    // fetchUserNoOfClicksAllTime();
    // fetchUserTimeSpentPerDay();
    // fetchUserNoOfPosesADay();
  return (
   <>
   {user ? (
   <div className="my-10 mx-60 pl-10 bg-gradient-to-t from-transparent to-[#dee7ff47] dark:bg-gradient-to-t dark:to-[#252A42]">
   <div></div>
   
   <br/>
   <br/>
   <br/>
   <br/>
   <div className="flex flex-col gap-5  w-full">
        <br/>
        <br/>
        <br/>
        <br/>
        <br/>
        <br/>
        <br/>
        <Testimonial clicks={array1}/>
        
     
      <PageTitle title="Dashboard" />
      
      <section className="grid grid-cols-1  gap-10 transition-all lg:grid-cols-2 mb-10">
        <CardContent>
          <p className="p-4 font-semibold">Overview</p>
            
          <BarChart datas={array3}/>
          
        </CardContent>
        
        <section className="p-25 mt-25">
          <span className="bg-gradient-to-r from-blue-400 via-blue-400 to-blue-500 bg-clip-text text-transparent text-center mt-5 text-5xl font-extrabold leading-[1.15] text-black sm:text-4xl text-center mb-15">Track your yoga journey daily</span>
              <br/>
              
              <span className="bg-gradient-to-r from-blue-400 via-blue-400 to-blue-500 bg-clip-text text-transparent text-center mt-5 text-5xl font-extrabold leading-[1.15] text-black sm:text-4xl text-center px-20">effortlessly with our 
              </span>
              <br/>
              <span className="bg-gradient-to-r from-blue-400 via-blue-400 to-blue-500 bg-clip-text text-transparent text-center mt-5 text-5xl font-extrabold leading-[1.15] text-black sm:text-4xl text-center  px-20">time-tracking graph
              </span>
            
          </section>
          

        {/*  */}
      </section>
      <section className="grid grid-cols-2 gap-4">
        
        
      <section className="p-25 mt-25">
          <span className="bg-gradient-to-r from-blue-400 via-blue-400 to-blue-500 bg-clip-text text-transparent text-center mt-5 text-5xl font-extrabold leading-[1.15] text-black sm:text-4xl text-center mb-15">Stay updated on your daily yoga  
              </span>
              <br/>
              
              <span className="bg-gradient-to-r from-blue-400 via-blue-400 to-blue-500 bg-clip-text text-transparent text-center mt-5 text-5xl font-extrabold leading-[1.15] text-black sm:text-4xl text-center px-20">practice with our time
              </span>
              <br/>
              <span className="bg-gradient-to-r from-blue-400 via-blue-400 to-blue-500 bg-clip-text text-transparent text-center mt-5 text-5xl font-extrabold leading-[1.15] text-black sm:text-4xl text-center  px-30">-tracking graph.
              </span>
            
          </section>
          
         
        <CardContent>
          <p className="p-4 font-semibold">Overview</p>

          <BarChart  datas={array2}/>
        </CardContent>
        {/*  */}
      </section>
    </div>
    </div>):(
        <ErrorPage />
    )}
   </>
  );
  
}
