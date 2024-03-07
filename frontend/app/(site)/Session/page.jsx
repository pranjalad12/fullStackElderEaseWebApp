"use client";
import Contact from "components/window";
import { motion } from "framer-motion";
import Typewriter from "typewriter-effect";
import Image from "next/image";
import Testimonial from "components/Testimonial";
import React, { useEffect, useState } from "react";
import About from "components/About";
import { UserAuth } from "app/context/AuthContext.js";
import ErrorPage from "app/(site)/error/page";
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
  setDoc,
} from "firebase/firestore";
import { app, auth } from "app/(site)/firebase";
// import { UserAuth } from "../context/AuthContext.js"

const Homepage = () => {
  const { user } = UserAuth();
  const [hasMounted, setHasMounted] = React.useState(false);
  const [poseData, setPosesData] = useState([]);
  const [timer, setTimer] = useState(0);
  const [startTime, setStartTime] = useState(0);
  const [array1, setarray1] = useState([]);
  const [array2, setarray2] = useState([]);
  // const [totalDurationToday, setTotalDurationToday] = useState(0);
  const [currentPose, setCurrentPose] = useState("Yoga, ElderEase");

  React.useEffect(() => {
    setHasMounted(true);
  }, []);
  const db = getFirestore(app);
  useEffect(() => {
    if (!user) {
      return;
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
        console.log("posedata:");
        console.log(matchingPosesData);
      } catch (error) {
        console.error(error);
        console.log("error caught");
      }
    };

    setLoading(true);
    fetchData().then(() => {
      setLoading(false);
    });
  }, [user]);

  useEffect(() => {
    const updateArrays = async () => {
      const docRef = doc(db, "users", user?.uid);
      const docSnapshot = await getDoc(docRef);
      const array1 = await docSnapshot?.data()?.noOfClicksAllTime;
      const array2 = await docSnapshot?.data()?.noOfPosesInADay;
      console.log(docSnapshot?.data()?.noOfPosesInADay);

      setarray1(array1 || []);
      setarray2(array2 || []);
    };

    updateArrays();
  }, [user, db]);
  console.log("a1", array1);
  console.log("a2", array2);

  const urlToPose = {
    tPoseVideo: "T Pose",
    treePoseVideo: "Vrikshasana",
    vajrasanaPoseVideo: "Vajrasana",
    plankPoseVideo: "Phalakasana",
    lotusPoseVideo: "Padmasana",
    cobraPoseVideo: "Bhujangasana",
    toeTouchPoseVideo: "Toe Touch",
    backBendPoseVideo: "Back Bend",
    balasanaposevideo: "Balasana",
    corpsePoseVideo: "Savasana",
    warriorPoseVideo: "Virabhadrasana II",
  };

  const fetchUserTime = async () => {
    try {
      const docRef = doc(db, "users", user.uid);
      const docSnapshot = await getDoc(docRef);
      return docSnapshot?.data()?.timeSpentPerDay || {};
    } catch (error) {
      console.log("Error fetching document data:", error);
      return {};
    }
  };
  const [loading, setLoading] = useState(false);
  const [videoSrc, setVideoSrc] = useState(
    "https://www.athulyaliving.com/blogs/wp-content/uploads/2017/07/yoga-for-seniors.jpg"
  );
  const startVideo = async (poseName) => {
    console.log("startvideo call hua for", poseName);
    setVideoSrc(`http://127.0.0.1:8080/${poseName}`);

    setStartTime(Date.now());
    console.log("ye start time set hua h wen i called startsesion", startTime);
  };

  const handleStartVideo = async (poseName) => {
    setCurrentPose(urlToPose[poseName]);
    startVideo(poseName);

    //poseName=tPoseVideo
    //urlToPose[poseName]="T Pose"
    const userRef = doc(db, "users", user.uid);
    const userDoc = await getDoc(userRef);

    array1[urlToPose[poseName]]++;

    const currentDate = new Date().toLocaleDateString();
    // currentDate=currentDateTimeIST.split(",")[0]
    array2[currentDate]++;

    await updateDoc(userRef, {
      noOfClicksAllTime: array1,
    });
    await updateDoc(userRef, {
      noOfPosesInADay: array2,
    });
  };

  const endSession = async () => {
    setCurrentPose("Yoga, ElderEase");
    console.log("endsession u laxi");
    setVideoSrc(
      "https://www.athulyaliving.com/blogs/wp-content/uploads/2017/07/yoga-for-seniors.jpg"
    );

    const endTime = Date.now();
    let elapsedTime = endTime - startTime;

    // console.log("Elapsed time:", elapsedTime);
    // console.log("endTime", endTime);
    // console.log("start time:", startTime);

    const existingTimeObj = await fetchUserTime(); // Fetch existing time
    const currentDateTimeIST = new Date().toLocaleString("en-US", {
      timeZone: "Asia/Kolkata",
    });
    const formattedDate = currentDateTimeIST.split(",")[0]; // Format: YYYY-MM-DD
    const timeSpentToday = existingTimeObj[formattedDate];
    // console.log("timeSpentToday, ", timeSpentToday)

    const userRef = doc(db, "users", user.uid);
    const userDoc = await getDoc(userRef);
    elapsedTime = Math.floor(elapsedTime / 1000);
    const currentTimeSpentPerDay = userDoc.data()?.timeSpentPerDay || {};
    // console.log("elapsedTime", elapsedTime)
    // console.log("timeSpentToday, ", timeSpentToday)
    const toBeUpdatedtime = elapsedTime + timeSpentToday;

    console.log("fordate", formattedDate);
    // console.log("tobeupdatetime", toBeUpdatedtime)
    if (!currentTimeSpentPerDay.hasOwnProperty(formattedDate)) {
      await updateDoc(userRef, {
        timeSpentPerDay: { [`${formattedDate}`]: elapsedTime },
      });
    } else {
      const existingTimeSpent = userDoc.data().timeSpentPerDay;
      await updateDoc(userRef, {
        timeSpentPerDay: {
          ...existingTimeSpent,
          [`${formattedDate}`]: toBeUpdatedtime,
        },
      });
    }
  };
  const poseUrls = {
    "T Pose": "tPoseVideo",
    Vrikshasana: "treePoseVideo",
    Vajrasana: "vajrasanaPoseVideo",
    Phalakasana: "plankPoseVideo",
    Padmasana: "lotusPoseVideo",
    Bhujangasana: "cobraPoseVideo",
    "Toe Touch": "toeTouchPoseVideo",
    "Back Bend": "backBendPoseVideo",
    Balasana: "balasanaposevideo",
    Savasana: "corpsePoseVideo",
    "Virabhadrasana II": "warriorPoseVideo",
  };

  const posesData = [
    {
      Name: "T Pose",
      photoURL:
        "https://preview.free3d.com/img/2020/07/2399392636998780345/ni8pdb84.jpg",
      description:
        "In this pose, the arms are stretched out horizontally to the sides, forming a straight line with the torso, while the feet are placed firmly on the ground. The T-pose is known for its ability to promote balance, alignment, and stability throughout the body. It can help strengthen the core, improve posture, and increase flexibility in the shoulders and chest.",
      benefits:
        "Holding the T-pose and focusing on deep breathing can help calm the mind and reduce stress and anxiety. The expansive nature of the T-pose encourages better circulation throughout the body. By extending the arms out to the sides and keeping the spine straight, the T-pose helps align the shoulders, spine, and hips, promoting better posture.",
    },
    {
      Name: "Back Bend",
      photoURL: "https://pocketyoga.com/assets/images/full/MountainArmsUp.png",
      description:
        "Stand with feet hip-width apart, lift arms overhead, and arch your upper back while exhaling. Open your chest, gaze upwards, and maintain active legs. Hold for a few breaths, reaching hands towards the floor if comfortable. To exit, engage your core and slowly return to an upright position",
      benefits:
        "It slowly helps in stimulating the internal organs leading to an improved digestion. It improves the flexibility of the hips and lower back. This stretching improves the functioning of the lungs reducing any respiratory disorders.",
    },
    {
      Name: "Toe Touch",
      photoURL:
        "https://t3.ftcdn.net/jpg/02/53/35/80/360_F_253358090_cQPRo5XDpYZ2qqxk0kQPQYdyjLtcVqAx.jpg",
      description:
        "Start by standing with your feet hip-width apart. Take a deep breath in and as you exhale, hinge at your hips and bend forward from your waist. Keep your back straight as you reach your hands toward your toes. If you can, allow your fingertips or palms to touch the floor. If not, go as far as your flexibility allows. Hold the stretch for a few breaths, continuing to deepen the stretch with each exhale. To come out of the pose, engage your core muscles, bend your knees slightly, and slowly roll up to a standing position, stacking each vertebra.",
      benefits:
        "Stretching the back of the legs and spine enhances blood flow, contributing to better circulation throughout the body. The forward bend promotes relaxation, calms the mind, and helps reduce stress and anxiety. The compression of the abdomen in this pose may aid digestion by stimulating the digestive organs.",
    },
  ];

  const WarmUpPoses = ["Back Bend", "Toe Touch"];
  const EndPoses = ["T Pose"];

  if (!hasMounted) {
    return null;
  }

  return (
    <>
      {user ? (
        <>
        <br/>
        <br/>
        <br/>
        <br/>
          <div>
            <div>
              <div className="flex justify-center lg:gap-8 xl:gap-32.5 ">
                <div className=" md:w-1/2 ">
                  <h1 className="mt-5 text-5xl font-extrabold leading-[1.15] text-black sm:text-4xl text-center">
                    Welcome to your session!
                  </h1>
                </div>
              </div>
              <div className="mt-5 text-5xl font-extrabold leading-[1.15] text-black sm:text-3xl text-center">
                <h1 className="bg-gradient-to-r from-amber-500 via-orange-600 to-yellow-500 bg-clip-text text-transparent text-center">
                  <Typewriter
                    options={{
                      strings: [user.displayName],
                      autoStart: true,
                      loop: true,
                    }}
                  />
                </h1>
              </div>
            </div>
          </div>
          <section
            id="support"
            className="md:px-44  px:4 pt-0 md:px-8 2xl:px-0 w-90/100"
          >
            <div className="relative mx-auto w-full px-2 md:px-7.5 pt-0 lg:px-15 lg:pt-5 xl:px-20 xl:pt-20">
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
                  className="animate_top w-full md:w-2/5 md:p-7.5 lg:w-[26%] xl:pt-15 grid grid-template-rows-[auto_1fr] "
                >
                  <h2 className="mb-12.5 text-3xl font-semibold text-black dark:text-white xl:text-sectiontitle2">
                    Choose your Pose
                  </h2>

                  <div className="5 mb-7 overflow-y-auto w-full">
                    <h3 className="overflow-y-auto mb-4 text-metatitle3 font-medium text-black dark:text-white">
                      <div className="overflow-y-auto">
                        <div className="overflow-y-auto mb-4 text-metatitle3 font-medium text-black dark:text-white">
                          {WarmUpPoses.map((pose, index) => (
                            <button
                              key={index}
                              className="text-white bg-red-400 focus:ring-pink-200 dark:focus:ring-pink-800 font-medium rounded-lg text-sm px-5 py-5 text-center me-2 mb-2 mb-4 text-metatitle3 font-medium text-black dark:text-white w-4/5 h-15"
                              onClick={() => handleStartVideo(poseUrls[pose])} //pose ka url
                            >
                              Start your {pose}
                            </button>
                          ))}
                          {poseData.map((pose, index) => (
                            <button
                              key={index}
                              className="text-white bg-red-400 focus:ring-pink-200 dark:focus:ring-pink-800 font-medium rounded-lg text-sm px-5 py-5 text-center me-2 mb-2 mb-4 text-metatitle3 font-medium text-black dark:text-white w-4/5 h-15"
                              onClick={() =>
                                handleStartVideo(poseUrls[pose.Name])
                              }
                            >
                              Start your {pose.Name}
                            </button>
                          ))}
                          {EndPoses.map((pose, index) => (
                            <button
                              key={index}
                              className="text-white bg-red-400 focus:ring-pink-200 dark:focus:ring-pink-800 font-medium rounded-lg text-sm px-5 py-5 text-center me-2 mb-2 mb-4 text-metatitle3 font-medium text-black dark:text-white w-4/5 h-15"
                              onClick={() => handleStartVideo(poseUrls[pose])}
                            >
                              Start your {pose}
                            </button>
                          ))}
                        </div>
                      </div>
                    </h3>
                  </div>
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
                      src={
                        (
                          poseData.find((pose) => pose.Name === currentPose) ||
                          posesData.find((pose) => pose.Name === currentPose)
                        )?.photoURL ||
                        "/images/about/defaultimg.webp" }
                      alt="About"
                      className="dark:hidden m-3 p-15 w-100 h-100"
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
                    <h2 className="relative mb-6 text-3xl font-bold text-black dark:text-white xl:text-hero">
                      Your Complete Guide to{" "}
                      <span className="relative inline-block before:absolute before:bottom-2.5 before:left-0 before:-z-1 before:h-3 before:w-full before:bg-titlebg dark:before:bg-titlebgdark">
                        {currentPose}
                      </span>
                    </h2>
                    {(() => {
                      const matchingPose =
                        poseData.find((pose) => pose.Name === currentPose) ||
                        posesData.find((pose) => pose.Name === currentPose);
                      if (matchingPose) {
                        let des = matchingPose.description;
                        return (
                          <div>
                            <ul className="mt-7.5">
                              {des.split(". ").map((line, index) => (
                                <li
                                  key={index}
                                  className="flex items-center gap-5"
                                >
                                  <div className="flex h-15 w-15 items-center justify-center rounded-[50%] border border-stroke dark:border-strokedark dark:bg-blacksection">
                                    <p className="text-metatitle2 font-semibold text-black dark:text-white">
                                      {index + 1 < 10
                                        ? `0${index + 1}`
                                        : index + 1}
                                    </p>
                                  </div>
                                  <div className="w-3/4">
                                    <p className="mb-0.5 text-metatitle2 text-black dark:text-white">
                                      {line}
                                    </p>
                                  </div>
                                </li>
                              ))}
                            </ul>
                          </div>
                        );
                      } else if (currentPose === "Yoga, ElderEase") {
                        let desc =
                          "The word 'yoga' means to unite mind, body, and spirit. Step into ElderEase, where yoga meets personalized guidance. Receive tailored feedback in real-time, safeguarding against injuries and enhancing your practice. Embrace safety and mindfulness as our foremost principles, guiding you towards progress with confidence. Track Progress: Celebrate your milestones with our progress tracking feature, motivating you along your journey. Join us today for a transformative yoga experience, Namaste.";
                        return (
                          <div>
                            <ul className="mt-7.5">
                              {desc.split(". ").map((line, lineIndex) => (
                                <li
                                  key={lineIndex}
                                  className="flex items-center gap-5"
                                >
                                  <div className="flex h-15 w-15 items-center justify-center rounded-[50%] border border-stroke dark:border-strokedark dark:bg-blacksection">
                                    <p className="text-metatitle2 font-semibold text-black dark:text-white">
                                      {lineIndex + 1 < 10
                                        ? `0${lineIndex + 1}`
                                        : lineIndex + 1}
                                    </p>
                                  </div>
                                  <div className="w-3/4">
                                    <p className="mb-0.5 text-metatitle2 text-black dark:text-white">
                                      {line}
                                    </p>
                                  </div>
                                </li>
                              ))}
                            </ul>
                          </div>
                        );
                      }
                      return null;
                    })()}
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
