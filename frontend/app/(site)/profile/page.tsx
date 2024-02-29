"use client"
import { Metadata } from "next";

import Contact from "@/components/Contact";
import Blog from "@/components/Blog";
import Testimonial from "@/components/Testimonial";
import { UserAuth} from "app/context/AuthContext.js"
import ErrorPage from "app/(site)/error/page"



export default function Home() {
  const {user}=UserAuth();
  return (
      <>
      {user ? (    <main>
     
     <Contact />
     {/* <Blog /> */}
   </main>):(
    <ErrorPage />
   )}
      </>
  );
}
