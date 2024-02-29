"use client"

import { Metadata } from "next";
import Hero from "@/components/Hero";
import Brands from "@/components/Brands";
import Feature from "@/components/Features";
import About from "@/components/About";
import FeaturesTab from "@/components/FeaturesTab";
import FunFact from "@/components/FunFact";
import Integration from "@/components/Integration";
import CTA from "@/components/CTA";
import FAQ from "@/components/FAQ";
import Pricing from "@/components/Pricing";
import Contact from "@/components/Contact";
import Blog from "@/components/Blog";
import Testimonial from "@/components/Testimonial";
import { onAuthStateChanged } from 'firebase/auth';
import { useEffect, useState } from 'react';
import { app, auth } from './firebase';
import { doc, getFirestore, setDoc } from 'firebase/firestore';

export default function Home() {
  const [user, setUser] = useState(null);
  const db = getFirestore(app);
  useEffect(() => {
    const callFast = async () => {
      if(user && user.uid) await setDoc(doc(db, 'users', user.uid),{
        userId: user.uid,
        username: user.displayName,
        email: user.email,
        photo: user.photoURL,
        painAreas: [],
        diseases: [],
        motive:[],
        timeSpentPerDay: 0
      })

    }

    onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    callFast();
  }, [user]);
  
  return (
    <main>
      <Hero />
      {/* <Brands /> */}
      
      <Testimonial />
      <About />
      <FeaturesTab />
      <FunFact />
       {/* <Integration />
      <CTA />  */}
      {/* <FAQ /> */}
      {/* <Feature />
      <Pricing />
       <Contact />
      <Blog />  */}
    </main>
  );
}
