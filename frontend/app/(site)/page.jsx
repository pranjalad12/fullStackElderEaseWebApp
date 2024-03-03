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
import { doc, getFirestore, setDoc, getDoc } from 'firebase/firestore';

export default function Home() {
  const [user, setUser] = useState(null);
  const db = getFirestore(app);
  // Get the current date and time in Indian Standard Time (IST)
  const currentDateTimeIST = new Date().toLocaleString("en-US", { timeZone: "Asia/Kolkata" });
  const currentDate = currentDateTimeIST.split(',')[0]; // Format: YYYY-MM-DD

  console.log("Current Date and Time in IST:", currentDate);

  useEffect(() => {
    const callFast = async () => {
      if (user && user.uid) {
        // Check if the document already exists
        const userDocRef = doc(db, 'users', user.uid);
        const userDocSnapshot = await getDoc(userDocRef);

        // if (!userDocSnapshot.exists()) {
          // Document doesn't exist, create it
          await setDoc(userDocRef, {
            userId: user.uid,
            username: user.displayName,
            email: user.email,
            photo: user.photoURL,
            painAreas: [],
            diseases: [],
            motive: [],
            noOfPosesInADay:{
              [currentDate]: 0
            },
            noOfClicksAllTime:{
                ["Balasana"]:0,
                ["Vrikshasana"]:0,
                ["Padmasana"]:0,
                ["T Pose"]:0,
                ["Toe Touch"]:0,
                ["Bhujangasana"]:0,
                ["Phalakasana"]:0,
                ["Vajrasana"]:0,
                ["Virabhadrasana II"]:0,
                ["Back Bend"]:0
            },
            timeSpentPerDay: {
              [currentDate]: 0
            }
          });
        // }
      }
    }

    onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });

    callFast();
  }, [user]);

    return (
    <main>
      <Hero />
      <Testimonial />
      <About />
      <FeaturesTab />
      <FunFact />
    </main>
  );
}



