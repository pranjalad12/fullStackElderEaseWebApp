"use client";
import SectionHeader from "../Common/SectionHeader";
import React, { useEffect, useState } from "react";
import { Autoplay, Pagination } from "swiper";
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

} from "firebase/firestore";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import Image from 'next/image';

import { Swiper, SwiperSlide } from "swiper/react";
import { app, auth } from "app/(site)/firebase";
import { motion } from "framer-motion";
import SingleTestimonial from "./SingleTestimonial";
import { testimonialData } from "./testimonialData";
// Include user in the dependency array to re-run the effect when user changes
import { UserAuth } from "app/context/AuthContext.js";


const Testimonial = () => {
  const { user } = UserAuth();

  const [loading, setLoading] = useState(false);
  const [poseData, setPosesData] = useState([]);

  const db = getFirestore(app);
  useEffect(() => {
	// Ensure user object exists before proceeding
	if (!user) {
  	return; // Exit early if user object is null
	}

	const fetchData = async () => {
  	try {
    	const docRef = doc(db, "users", user.uid);
    	const docSnapshot = await getDoc(docRef);
    	const posesCollection = collection(db, "yogaPose");
    	const q = query(
      	posesCollection,
      	or(
        	where(
          	"diseases",
          	"array-contains-any",
          	docSnapshot?.data()?.diseases
        	),
        	where(
          	"painAreas",
          	"array-contains-any",
          	docSnapshot?.data()?.painAreas
        	),
        	where("Aim", "array-contains-any", docSnapshot?.data()?.motive)
      	)
    	);
    	const querySnapshot = await getDocs(q);
    	const matchingPosesData = querySnapshot.docs.map((doc) => doc.data());
    	setPosesData(matchingPosesData);
    	console.log(matchingPosesData)
    	// console.log(poseData.length);
  	} catch (error) {
    	console.error(error);
    	console.log("error caught");
  	}
	};

	// Set loading state to true while fetching data
	setLoading(true);

	fetchData().then(() => {
  	// After data fetching is complete, set loading state to false
  	setLoading(false);
	});
  }, [user]);
  return (
	<>
  	<section >
    	<div className="mx-auto max-w-c-1315 px-4 md:px-8 xl:px-0 mt-5">
      	{/* <!-- Section Title Start --> */}
      	<div className="animate_top mx-auto text-center">
        	<SectionHeader
          	headerInfo={{
            	title: `Recommendations`,
            	subtitle: `Recommended For You!`,
            	description: ``,
          	}}
        	/>
      	</div>
      	{/* <!-- Section Title End --> */}
    	</div>

    	<motion.div
      	variants={{
        	hidden: {
          	opacity: 0,
          	y: -20,
        	},

        	visible: {
          	opacity: 1,
          	y: 0,
        	},
      	}}
      	initial="hidden"
      	whileInView="visible"
      	transition={{ duration: 1, delay: 0.1 }}
      	viewport={{ once: true }}
      	className="animate_top mx-auto mt-15 max-w-c-1235 px-4 md:px-8 xl:mt-10 xl:px-0"
    	>
      	{/* <!-- Slider main container --> */}
      	<div className="swiper testimonial-01 mb-20 pb-22.5">
        	{/* <!-- Additional required wrapper --> */}
        	<Swiper
          	spaceBetween={50}
          	slidesPerView={2}
          	autoplay={{
            	delay: 2500,
            	disableOnInteraction: false,
          	}}
          	pagination={{
            	clickable: true,
          	}}
          	modules={[Autoplay, Pagination]}
          	breakpoints={{
            	// when window width is >= 640px
            	0: {
              	slidesPerView: 1,
            	},
            	// when window width is >= 768px
            	768: {
              	slidesPerView: 2,
            	},
          	}}
        	>
          	{poseData.map((pose, index) => (
            	<SwiperSlide key={index}>
              	{/* <SingleTestimonial review={pose} /> */}
              	<div className="rounded-lg bg-white p-9 pt-7.5 shadow-solid-9 dark:border dark:border-strokedark dark:bg-blacksection dark:shadow-none">
                	<div className="mb-7.5 flex justify-between border-b border-stroke pb-6 dark:border-strokedark items-start text-justify gap-4">
                  	<div>
                    	<h3 className="mb-1.5 text-metatitle3 text-black dark:text-white">
                      	<strong>
                        	{pose.Name}
                      	</strong>
                    	</h3>
                    	<ul>
                      	{pose.benefits.map((benefit, index) => (
                        	<li key={index}>{`${index + 1}. ${benefit}`}</li>
                      	))}
                    	</ul>


                  	</div>
                  	<img style={{ width: '60%', height: '50%' }} className="" src={pose.photoURL} />
                	</div>

                	{/* <p>{content}</p> */}
              	</div>
            	</SwiperSlide>
          	))}

        	</Swiper>
      	</div>
    	</motion.div>
  	</section>
	</>
  );
};

export default Testimonial;


