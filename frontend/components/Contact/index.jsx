"use client";
import { motion } from "framer-motion";
import Image from "next/image";
import React, { useEffect, useState } from "react";
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
import { app, auth } from "app/(site)/firebase";
import FAQItem from "../FAQ/FAQItem";
import faqData from "../FAQ/faqData";
import AccordionItem from "../../components/Accordian";
import { UserAuth } from "app/context/AuthContext";
const db = getFirestore(app);

const Contact = () => {
  const { user } = UserAuth();
  const [first, setfirst] = useState([]);
  const [second, setsecond] = useState([]);
  const [third, setthird] = useState([]);
  const options2 = [
    "arthritis",
    "sciatica",
    "indigestion",
    "diabetes",
    "hypertension",
    "None"
  ];
  const options1 = ["neck", "shoulders", "back", "knee", "hips", "None"];
  const options3 = [
    "Increase Flexibility & Mobility",
    "Improve Balance & Stability",
    "Reduce Stress & Relax",
  ];
  const [matchingPoses, setMatchingPoses] = useState([]);
  const [diseases, setDisease] = useState(first); // Replace with user input
  const [painAreas, setPainAreas] = useState(second);
  const [aim, setAim] = useState(third);
  const [hasMounted, setHasMounted] = React.useState(false);
  const [showfirst, setShowFirst] = useState([]);
  const [showsecond, setShowSecond] = useState([]);
  const [showthird, setShowThird] = useState([]);

  React.useEffect(() => {
    setHasMounted(true);
  }, []);
  //  console.log(user);

  useEffect(() => {
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

        setMatchingPoses(matchingPosesData);
        console.log("matchingposesdata:")
        console.log(matchingPosesData);
      } catch (error) {
        console.error(error);
        console.log("error caught");
      }
    };
    fetchData();
    // Call fetchOptions here if you want to execute it alongside fetchData
  }, []);
  useEffect(() => {
    const updateArrays = async () => {
      const docRef = doc(db, "users", user.uid);
      const docSnapshot = await getDoc(docRef);
      const diseasesData = docSnapshot?.data()?.diseases;
      const painAreasData = docSnapshot?.data()?.painAreas;
      const motiveData = docSnapshot?.data()?.motive;

      // Update state variables
      setShowFirst(diseasesData || []); // If diseasesData is null or undefined, set an empty array
      setShowSecond(painAreasData || []);
      setShowThird(motiveData || []);
    };

    updateArrays();
  }, [user.uid]);
  useEffect(() => {
    console.log(showfirst);
  }, [showfirst]);

  const [activeFaq, setActiveFaq] = useState(1);
  if (!hasMounted) {
    return null;
  }
  const handleFaqToggle = (number) => {
    activeFaq === id ? setActiveFaq(0) : setActiveFaq(id);
  };

  const saveData = async () => {
    try {
      // console.log(user.uid)
      if (user && user.uid)
        await updateDoc(doc(db, "users", user.uid), {
          painAreas: second,
          diseases: first,
          motive: third,
        });
    } catch (error) {
      console.log(error);
    }
  };

  const fetchDatas = async () => {
    try {
      // console.log({first})
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

      console.log(matchingPosesData);
      setMatchingPoses(matchingPosesData);
      console.log(matchingPosesData);
    } catch (error) {
      console.error(error);
      console.log("error caught");
    }
  };
  const fetchUserOptions = async () => {
    try {
      // const userCollection = collection(db, 'users');
      const docRef = doc(db, "users", user.uid);
      const docSnapshot = await getDoc(docRef);
      console.log(docSnapshot?.data()?.diseases);
      console.log(docSnapshot?.data()?.motive);
      console.log(docSnapshot?.data()?.painAreas);
    } catch (error) {
      console.log("Error fetching document data:", error);
    }
  };
  const bothFxn = () => {
    saveData();
    fetchDatas();
    fetchUserOptions();
  };
  // useEffect(()=>{
  //   if(matchingPoses.length > 0)
  //   console.log(matchingPoses);
  // }, [matchingPoses])

  // Add a useeffect to print first,second,third arrray with names first second and third in object

  return (
    <>
      {/* <!-- ===== Contact Start ===== --> */}
      <section id="support" className="px-4 md:px-8 2xl:px-0 pt-10">
        <br />
        <br />
        <br />
        <br />

        <div className="flex felx-col relative mx-auto max-w-c-1390 px-7.5 pt-10 lg:px-15 lg:pt-15 xl:px-20 xl:pt-20">
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

          <div className="flex flex-col flex-wrap gap-8 md:flex-row md:flex-nowrap md:justify-between xl:gap-20 ">
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
              className="animate_top w-full md:w-2/5 md:p-7.5 lg:w-[26%] xl:pt-15 flex items-center justify-center"
            >
            
              <main class='main  w-full-screen  flex justify-center items-center before:z-[-1] before:absolute before:top-0 before:bottom-0 before:left-0 before:right-0 before:opacity-20'>
                <section class="cursor-pointer   rounded-md min-w-72 min-h-96 bg-white flex flex-col items-center drop-shadow-lg hover:scale-105 active:scale-95 transition">
                  <div class='relative h-32 w-72'>
                    <div class='absolute bg-orange-400 opacity-80 w-full h-full rounded-t-md'></div>
                    <img src="https://images.unsplash.com/photo-1632377082529-611764ce0fef?crop=entropy&cs=srgb&fm=jpg&ixid=M3wzMjM4NDZ8MHwxfHJhbmRvbXx8fHx8fHx8fDE3MDg4MjU5NTF8&ixlib=rb-4.0.3&q=85" alt="card cover" class='w-full h-full object-cover rounded-t-md' />
                  </div>
                  <div class="-m-9 z-10 bg-white rounded-full"><img src={user?.photoURL} alt="profile image" class='w-24 h-24 rounded-full object-cover p-2' /></div>
                  <div class='text-center mt-12'>
                    <h1 class='mb-1 text-xl font-medium dark:text-gray-900'>{user?.displayName}</h1>
                  </div>
                  <input
                    type="text"
                    id="input-group-1"
                    value={user?.email}
                    disabled={true}
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-base rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-3/4 ps-4 p-5 mt-5 mb-8 ml-4 mr-4 font-bold border-2"
                  />

                </section>
              </main>
              <div className="">
                {/* <h3 className="mb-4 text-metatitle3 font-medium text-black dark:text-white">
                  Email
                </h3>
                <p>290 Maryam Springs 260, Courbevoie, Paris, France</p> */}
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
              className="animate_top w-full rounded-lg bg-white p-7.5 shadow-solid-8 dark:border dark:border-strokedark dark:bg-black md:w-3/5 lg:w-3/4 xl:p-15"
            >
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
                transition={{ duration: 1, delay: 0.1 }}
                viewport={{ once: true }}
                className="animate_right md:w-3/5 lg:w-1/2 pl-15"
              >
                {/* <div className="rounded-lg bg-white shadow-solid-8 dark:border dark:border-strokedark dark:bg-blacksection">
                {faqData.map((faq, key) => (
                  <FAQItem
                    key={key}
                    faqData={{ ...faq, activeFaq, handleFaqToggle }}
                  />
                ))}
              </div> */}
              </motion.div>
              {/* <form
                action="https://formbold.com/s/unique_form_id"
                method="POST"
              >
                <div className="mb-7.5 flex flex-col gap-7.5 lg:flex-row lg:justify-between lg:gap-14">
                  <input
                    type="text"
                    placeholder="Full name"
                    className="w-full border-b border-stroke bg-transparent pb-3.5 focus:border-waterloo focus:placeholder:text-black focus-visible:outline-none dark:border-strokedark dark:focus:border-manatee dark:focus:placeholder:text-white lg:w-1/2"
                  />

                  <input
                    type="email"
                    placeholder="Email address"
                    className="w-full border-b border-stroke bg-transparent pb-3.5 focus:border-waterloo focus:placeholder:text-black focus-visible:outline-none dark:border-strokedark dark:focus:border-manatee dark:focus:placeholder:text-white lg:w-1/2"
                  />
                </div>

                <div className="mb-12.5 flex flex-col gap-7.5 lg:flex-row lg:justify-between lg:gap-14">
                  <input
                    type="text"
                    placeholder="Subject"
                    className="w-full border-b border-stroke bg-transparent pb-3.5 focus:border-waterloo focus:placeholder:text-black focus-visible:outline-none dark:border-strokedark dark:focus:border-manatee dark:focus:placeholder:text-white lg:w-1/2"
                  />

                  <input
                    type="text"
                    placeholder="Phone number"
                    className="w-full border-b border-stroke bg-transparent pb-3.5 focus:border-waterloo focus:placeholder:text-black focus-visible:outline-none dark:border-strokedark dark:focus:border-manatee dark:focus:placeholder:text-white lg:w-1/2"
                  />
                </div>

                <div className="mb-11.5 flex">
                  <textarea
                    placeholder="Message"
                    rows={4}
                    className="w-full border-b border-stroke bg-transparent focus:border-waterloo focus:placeholder:text-black focus-visible:outline-none dark:border-strokedark dark:focus:border-manatee dark:focus:placeholder:text-white"
                  ></textarea>
                </div>

                <div className="flex flex-wrap gap-4 xl:justify-between ">
                  <div className="mb-4 flex md:mb-0">
                    <input
                      id="default-checkbox"
                      type="checkbox"
                      className="peer sr-only"
                    />
                    <span className="border-gray-300 bg-gray-100 text-blue-600 dark:border-gray-600 dark:bg-gray-700 group mt-2 flex h-5 min-w-[20px] items-center justify-center rounded peer-checked:bg-primary">
                      <svg
                        className="opacity-0 peer-checked:group-[]:opacity-100"
                        width="10"
                        height="8"
                        viewBox="0 0 10 8"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          fillRule="evenodd"
                          clipRule="evenodd"
                          d="M9.70704 0.792787C9.89451 0.980314 9.99983 1.23462 9.99983 1.49979C9.99983 1.76495 9.89451 2.01926 9.70704 2.20679L4.70704 7.20679C4.51951 7.39426 4.26521 7.49957 4.00004 7.49957C3.73488 7.49957 3.48057 7.39426 3.29304 7.20679L0.293041 4.20679C0.110883 4.01818 0.0100885 3.76558 0.0123669 3.50339C0.0146453 3.24119 0.119814 2.99038 0.305222 2.80497C0.490631 2.61956 0.741443 2.51439 1.00364 2.51211C1.26584 2.50983 1.51844 2.61063 1.70704 2.79279L4.00004 5.08579L8.29304 0.792787C8.48057 0.605316 8.73488 0.5 9.00004 0.5C9.26521 0.5 9.51951 0.605316 9.70704 0.792787Z"
                          fill="white"
                        />
                      </svg>
                    </span>
                    <label
                      htmlFor="default-checkbox"
                      className="flex max-w-[425px] cursor-pointer select-none pl-5"
                    >
                      By clicking Checkbox, you agree to use our “Form” terms
                      And consent cookie usage in browser.
                    </label>
                  </div>

                  <button
                    aria-label="send message"
                    className="inline-flex items-center gap-2.5 rounded-full bg-black px-6 py-3 font-medium text-white duration-300 ease-in-out hover:bg-blackho dark:bg-btndark"
                  >
                    Send Message
                    <svg
                      className="fill-white"
                      width="14"
                      height="14"
                      viewBox="0 0 14 14"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M10.4767 6.16664L6.00668 1.69664L7.18501 0.518311L13.6667 6.99998L7.18501 13.4816L6.00668 12.3033L10.4767 7.83331H0.333344V6.16664H10.4767Z"
                        fill=""
                      />
                    </svg>
                  </button>
                </div>
              </form> */}
              <div className="mx-2  flex-wrap flex justify-center w-full">
                <h2 className="text-3xl font-semibold text-black dark:text-white xl:text-sectiontitle2 pb-5">
                  Personalize your preferences!
                </h2>

                <div className="w-full px-4 flex flex-col justify-center items-center">
                  <AccordionItem
                    header="What is the disease you are facing?"
                    text="It takes 2-3 weeks to get your first blog post ready. That includes the in-depth research & creation of your monthly content marketing strategy that we do before writing your first blog post, Ipsum available ."
                    options={options2}
                    array={first}
                    setarray={setfirst}
                    displayarray={showfirst}
                  />
                  <AccordionItem
                    header="Do you have any pain in your body?"
                    text="It takes 2-3 weeks to get your first blog post ready. That includes the in-depth research & creation of your monthly content marketing strategy that we do before writing your first blog post, Ipsum available ."
                    options={options1}
                    array={second}
                    setarray={setsecond}
                    displayarray={showsecond}
                  />
                  <AccordionItem
                    header="What is your primary goal?"
                    text="It takes 2-3 weeks to get your first blog post ready. That includes the in-depth research & creation of your monthly content marketing strategy that we do before writing your first blog post, Ipsum available ."
                    options={options3}
                    array={third}
                    setarray={setthird}
                    displayarray={showthird}
                  />
                </div>
              </div>
              <div className="relative">
                <button
                  onClick={() => bothFxn()}
                  aria-label="send message"
                  className="inline-flex items-center gap-2.5 rounded-full bg-black px-6 py-3 font-medium text-white duration-300 ease-in-out hover:bg-blackho dark:bg-btndark absolute top-0 right-0 mb-20"
                >
                  Save Preferences

                </button>
              </div>
            </motion.div>
          </div>
        </div>
        <br />
        <br />
        <br />
      </section>
      {/* <!-- ===== Contact End ===== --> */}
    </>
  );
};

export default Contact;
