"use client";
import Contact from "components/window";
import { motion } from "framer-motion";
import Image from "next/image";
import Testimonial from "@/components/testimonialsHome";
import React, { useEffect, useState } from "react";
import About from "components/About";
import { UserAuth } from "app/context/AuthContext.js";
import ErrorPage from "app/(site)/error/page";
import { getFirestore, collection, where, query, getDocs, or, doc, updateDoc, getDoc } from 'firebase/firestore';
import { app, auth } from "app/(site)/firebase"
// import { UserAuth } from "../context/AuthContext.js"
//1.user ne koi bhi button dabaya tbtak k us din ka time
//2.start tumer
//3.session end hote hi new duration uspe add hojaye firebase k existing jo liya tha first step me

const Homepage = () => {
  const { user } = UserAuth();
  const [hasMounted, setHasMounted] = React.useState(false);
  const [poseData, setPosesData] = useState([]);
  const [timer, setTimer] = useState(0);
  const [startTime, setStartTime] = useState(null);
  const [totalDurationToday, setTotalDurationToday] = useState(0);

  React.useEffect(() => {
    setHasMounted(true);
  }, []);
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
        const posesCollection = collection(db, 'yogaPose');
        const q = query(posesCollection, or(
          where('diseases', 'array-contains-any', docSnapshot?.data()?.diseases),
          where('painAreas', 'array-contains-any', docSnapshot?.data()?.painAreas),
          where('Aim', 'array-contains-any', docSnapshot?.data()?.motive),
        ));
        const querySnapshot = await getDocs(q);
        const matchingPosesData = querySnapshot.docs.map(doc => doc.data());
        setPosesData(matchingPosesData);
        console.log(poseData);
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

  }, [user]); // Include user in the dependency array to re-run the effect when user changes

  const [loading, setLoading] = useState(false);
  const [videoSrc, setVideoSrc] = useState(
    "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?q=80&w=2120&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
  );


  const startVideo = (poseName) => {
    setVideoSrc(`http://127.0.0.1:8080/${poseName}`);
  };

  //2.
  const handleStartVideo = (poseName) => {
    // setStartTime(Date.now());
    return () => startVideo(poseName);
  };

  //3.
  const endSession = () => {
    // const duration = Date.now() - startTime;
    // const updatedTotalDuration = totalDurationToday + duration;
    // setTotalDurationToday(updatedTotalDuration);
    // setStartTime(null);
    // setTimer(0);
    setVideoSrc(
      "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?q=80&w=2120&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
    );
  };
  // const db = getFirestore(app);
  // const fetchData = async () => {
  //   try {
  //     console.log({first})
  //               const posesCollection = collection(db, 'yogaPose');
  //               const q = query(posesCollection,  or(where('diseases', 'array-contains-any', first),
  //               where('painAreas', 'array-contains-any',second),
  //               where('Aim','array-contains-any',third)
  //               ));
  //               const querySnapshot = await getDocs(q);
  //               const matchingPosesData = querySnapshot.docs.map(doc => doc.data());

  //               // console.log(matchingPosesData)
  //               setMatchingPoses(matchingPosesData);
  //             } catch (error) {
  //               console.error(error);
  //               console.log("error caught");
  //             }

  // };
  //fetch the data of personalised poses from db
  const WarmUpPoses = [
    "toeTouchPoseVideo",
    "backBendPoseVideo",


  ];
  const EndPoses = [
    "corpsePoseVideo",
    "lotusPoseVideo",
  ]

  if (!hasMounted) {
    return null;
  }

  return (
    <>
      {user ? (
        <>
          <div>
            <br />
            <br />
            <br />
            <br />
            <section className="w-full flex-center flex-col">
              {/* <p class="head_text text-center">Welcome to your session </p> */}
              {/* <span className="orange_gradient text-4xl text-center">{user?.displayName}</span> <br/> */}
              {/* <div>
       <div className="">
         {yogaPoses.map((pose, index) => (
           <button key={index} className='black_btn' onClick={handleStartVideo(pose)}>Start your {pose}</button>
         ))}
       </div>
       <br/>
       <img id="video_feed" src={videoSrc} width="800" height="490" style={{ border: '1px solid black' }} />
       <button className='mt-5 w-1/3 black_btn' onClick={endSession}>End your Current Pose</button>
     </div> */}
            </section>
          </div>
          <section id="support" className="px-4 md:px-8 2xl:px-0 w-90/100">
            <div className="relative mx-auto w-full px-7.5 pt-10 lg:px-15 lg:pt-15 xl:px-20 xl:pt-20">
              <div className="absolute left-0 top-0 -z-1 h-2/3 w-full rounded-lg bg-gradient-to-t from-transparent to-[#dee7ff47] dark:bg-gradient-to-t dark:to-[#252A42]"></div>
              <div className="absolute bottom-[-255px] left-0 -z-1 h-full w-full">
                <Image
                  src="./images/shape/shape-dotted-light.svg"
                  alt="Dotted"
                  className="dark:hidden"
                  fill
                />
                <Image
                  src="./images/shape/shape-dotted-dark.svg"
                  alt="Dotted"
                  className="hidden dark:block"
                  fill
                />
              </div>

              <div
                className="flex flex-col-reverse flex-wrap gap-8 md:flex-row md:flex-nowrap md:justify-between xl:gap-20"
                style={{ height: "900px" }}
              >
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
                  transition={{ duration: 2, delay: 0.1 }}
                  viewport={{ once: true }}
                  className="animate_top w-full md:w-2/5 md:p-7.5 lg:w-[26%] xl:pt-15"
                >
                  <h2 className="mb-12.5 text-3xl font-semibold text-black dark:text-white xl:text-sectiontitle2">
                    Choose your Pose
                  </h2>

                  <div className="5 mb-7 overflow-y-auto">
                    <h3 className="overflow-y-auto mb-4 text-metatitle3 font-medium text-black dark:text-white">
                      <div className="overflow-y-auto">
                        {/* {yogaPoses.map((pose, index) => (
                          <button
                            key={index}
                            className="text-white bg-red-400 focus:ring-pink-200 dark:focus:ring-pink-800 font-medium rounded-lg text-sm px-5 py-5 text-center me-2 mb-2 mb-4 text-metatitle3 font-medium text-black dark:text-white w-4/5 h-15"
                            onClick={handleStartVideo(pose)}
                          >
                            Start your {pose}
                          </button>
                        ))} */}
                        <div className="overflow-y-auto mb-4 text-metatitle3 font-medium text-black dark:text-white">
                          {WarmUpPoses.map((pose, index) => (
                            <button
                              key={index}
                              className="text-white bg-red-400 focus:ring-pink-200 dark:focus:ring-pink-800 font-medium rounded-lg text-sm px-5 py-5 text-center me-2 mb-2 mb-4 text-metatitle3 font-medium text-black dark:text-white w-4/5 h-15"
                              onClick={() => handleStartVideo(pose)}
                            >
                              Start your {pose}
                            </button>
                          ))}
                          {poseData.map((pose, index) => (
                            <button
                              key={index}
                              className="text-white bg-red-400 focus:ring-pink-200 dark:focus:ring-pink-800 font-medium rounded-lg text-sm px-5 py-5 text-center me-2 mb-2 mb-4 text-metatitle3 font-medium text-black dark:text-white w-4/5 h-15"
                              onClick={() => handleStartVideo(pose.Name)}
                            >
                              Start your {pose.Name}
                            </button>
                          ))}
                            {EndPoses.map((pose, index) => (
                            <button
                              key={index}
                              className="text-white bg-red-400 focus:ring-pink-200 dark:focus:ring-pink-800 font-medium rounded-lg text-sm px-5 py-5 text-center me-2 mb-2 mb-4 text-metatitle3 font-medium text-black dark:text-white w-4/5 h-15"
                              onClick={() => handleStartVideo(pose)}
                            >
                              Start your {pose}
                            </button>
                          ))}
                        </div>

                      </div>
                    </h3>
                    <p>290 Maryam Springs 260, Courbevoie, Paris, France</p>

                    {/* <button type="button" class="text-white bg-gradient-to-br from-pink-500 to-orange-400 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-pink-200 dark:focus:ring-pink-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2">Pink to Orange</button> */}
                  </div>
                  {/* <div className="5 mb-7">
             <h3 className="mb-4 text-metatitle3 font-medium text-black dark:text-white">
               Email Address
             </h3>
             <p>
               <a href="#">yourmail@domainname.com</a>
             </p>
           </div>
           <div>
             <h4 className="mb-4 text-metatitle3 font-medium text-black dark:text-white">
               Phone Number
             </h4>
             <p>
               <a href="#">+009 42334 6343 843</a>
             </p>
           </div> */}
                </motion.div>
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
                  className="animate_top w-full  rounded-lg p-7.5 shadow-solid-8 dark:border dark:border-strokedark dark:bg-black md:w-3/5 lg:w-3/4 xl:p-15"
                >
                  <img
                    id="video_feed"
                    src={videoSrc}
                    width="100%"
                    height="100%"
                    style={{ border: "1px solid black", height: "100%" }}
                  />
                  <button
                    className="mt-5 w-full rounded-full border border-black bg-black py-1.5 px-5 text-white transition-all hover:bg-white hover:text-black text-center text-sm font-inter flex items-center justify-center"
                    onClick={endSession}
                  >
                    End your Current Pose
                  </button>
                </motion.div>
              </div>
            </div>
          </section>

          {/* pose description */}
          <>
            <section className="overflow-hidden pb-0 lg:pb- xl:pb-30 w-full pt-30">
              <div className="mx-auto  px-4 md:px-8 xl:px-0">
                <div className="flex items-center gap-8 lg:gap-32.5 ">
                  <motion.div
                    variants={{
                      hidden: {
                        opacity: 0,
                        x: -20,
                      },

                      visible: {
                        opacity: 1,
                        x: 0,
                      },
                    }}
                    initial="hidden"
                    whileInView="visible"
                    transition={{ duration: 0.5, delay: 0.1 }}
                    viewport={{ once: true }}
                    className="animate_left relative mx-auto hidden aspect-[588/526.5] md:block md:w-1/3 h-1/2 "
                  >
                    <Image
                      src="/images/about/defaultimg.webp"
                      alt="About"
                      className="dark:hidden m-3 p-15"
                      fill
                    />
                    <Image
                      src="/images/about/about-dark-01.png"
                      alt="About"
                      className="hidden dark:block"
                      fill
                    />
                  </motion.div>
                  <motion.div
                    variants={{
                      hidden: {
                        opacity: 0,
                        x: 20,
                      },

                      visible: {
                        opacity: 1,
                        x: 0,
                      },
                    }}
                    initial="hidden"
                    whileInView="visible"
                    transition={{ duration: 0.5, delay: 0.1 }}
                    viewport={{ once: true }}
                    className="animate_right md:w-1/2"
                  >
                    <span className="font-medium uppercase text-black dark:text-white">
                      <span className="mb-4 mr-4 inline-flex rounded-full bg-meta px-4.5 py-1 text-metatitle uppercase text-white ">
                        New
                      </span>{" "}
                      SaaS Boilerplate for Next.js
                    </span>
                    <h2 className="relative mb-6 text-3xl font-bold text-black dark:text-white xl:text-hero">
                      A Complete Solution for
                      <span className="relative inline-block before:absolute before:bottom-2.5 before:left-0 before:-z-1 before:h-3 before:w-full before:bg-titlebg dark:before:bg-titlebgdark">
                        SaaS Startup
                      </span>
                    </h2>
                    <p>
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                      Ut ultricies lacus non fermentum ultrices. Fusce
                      consectetur le.
                    </p>

                    <div className="mt-7.5 flex items-center gap-5">
                      <div className="flex h-15 w-15 items-center justify-center rounded-[50%] border border-stroke dark:border-strokedark dark:bg-blacksection">
                        <p className="text-metatitle2 font-semibold text-black dark:text-white">
                          01
                        </p>
                      </div>
                      <div className="w-3/4">
                        <h3 className="mb-0.5 text-metatitle2 text-black dark:text-white">
                          React 18, Next.js 13 and TypeScript
                        </h3>
                        <p>Ut ultricies lacus non fermentum ultrices.</p>
                      </div>
                    </div>
                    <div className="mt-7.5 flex items-center gap-5">
                      <div className="flex h-15 w-15 items-center justify-center rounded-[50%] border border-stroke dark:border-strokedark dark:bg-blacksection">
                        <p className="text-metatitle2 font-semibold text-black dark:text-white">
                          02
                        </p>
                      </div>
                      <div className="w-3/4">
                        <h3 className="mb-0.5 text-metatitle2 text-black dark:text-white">
                          Fully Customizable
                        </h3>
                        <p>consectetur adipiscing elit fermentum ultricies.</p>
                      </div>
                    </div>
                  </motion.div>
                </div>
              </div>
            </section>
            <Testimonial />
          </>
        </>
      ) : (
        <ErrorPage />
      )}
    </>
  );
};

export default Homepage;
