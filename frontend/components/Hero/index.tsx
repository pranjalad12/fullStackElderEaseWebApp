"use client";
import Image from "next/image";
import { useState } from "react";
import Typewriter from "typewriter-effect";

const Hero = () => {
  const [email, setEmail] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <>
      <section className="overflow-hidden pb-20 pt-35 md:pt-40 xl:pb-25 xl:pt-46 ">
        <div
          className="mx-auto max-w-c-1390 px-4 md:px-8 2xl:px-0 bg-gradient-to-t from-transparent to-[#dee7ff47] dark:bg-gradient-to-t dark:to-[#252A42]
"
        >
          <div className="flex lg:items-center lg:gap-8 xl:gap-32.5 ">
            <div className=" md:w-1/2 ">
              <h1 className="mt-5 text-5xl font-extrabold leading-[1.15] text-black sm:text-6xl text-center">
                Elder Ease Yoga
              </h1>
              {/* <div className="head_text">
              <h1 className="mb-5 pr-16  font-bold text-5xl bg-gradient-to-r from-amber-500 via-orange-600 to-yellow-500 bg-clip-text text-transparent dark:text-white xl:text-hero ">
                Free Next.js Template for {"   "}
                <span className="relative inline-block bg-gradient-to-r from-amber-500 via-orange-600 to-yellow-500 bg-clip-text text-transparent before:absolute before:bottom-2.5 before:left-0 before:-z-1 before:h-3 before:w-full before:bg-red dark:before:bg-titlebgdark ">
                  SaaS and crazy
                </span>
              </h1>
              </div> */}
              <div className="mt-5 text-5xl font-extrabold leading-[1.15] text-black sm:text-6xl text-center">
                <span className="bg-gradient-to-r from-amber-500 via-orange-600 to-yellow-500 bg-clip-text text-transparent text-center">
                  Experience yoga in a whole
                  <h1 className="bg-gradient-to-r from-amber-500 via-orange-600 to-yellow-500 bg-clip-text text-transparent text-center">
                    <Typewriter
                      options={{
                        strings: ["New Way", "New World"],
                        autoStart: true,
                        loop: true,
                      }}
                    />
                  </h1>
                </span>
              </div>
              {/* <p>
                Solid Pro - Packed with all the key integrations you need for
                swift SaaS startup launch, including - Auth, Database, Sanity
                Blog, Essential Components, Pages and More. Built-winth -
                Next.js 13, React 18 and TypeScript.
              </p> */}

              <div className="mt-10">
                {/* <form onSubmit={handleSubmit}>
                  <div className="flex flex-wrap gap-5">
                    <input
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      type="text"
                      placeholder="Enter your email address"
                      className="rounded-full border border-stroke px-6 py-2.5 shadow-solid-2 focus:border-primary focus:outline-none dark:border-strokedark dark:bg-black dark:shadow-none dark:focus:border-primary"
                    />
                    <button
                      aria-label="get started button"
                      className="flex rounded-full bg-black px-7.5 py-2.5 text-white duration-300 ease-in-out hover:bg-blackho dark:bg-btndark dark:hover:bg-blackho"
                    >
                      Get Started
                    </button>
                  </div>
                </form> */}
              </div>
            </div>

            <div className="animate_right hidden md:w-1/2 lg:block">
              <div className="relative 2xl:-mr-7.5">
                <Image
                  src="/images/shape/shape-01.png"
                  alt="shape"
                  width={46}
                  height={246}
                  className="absolute -left-11.5 top-0"
                />
                <Image
                  src="/images/shape/shape-02.svg"
                  alt="shape"
                  width={36.9}
                  height={36.7}
                  className="absolute bottom-0 right-0 z-10"
                />
                <Image
                  src="/images/shape/shape-03.svg"
                  alt="shape"
                  width={21.64}
                  height={21.66}
                  className="absolute -right-6.5 bottom-0 z-1"
                />
                <div className=" relative aspect-[700/444] w-full">
                  <div>
                    <Image
                      className="shadow-solid-l m-2  dark:hidden rounded-lg shadow-xl"
                      src="/images/hero/hero1.jpg"
                      // src="data:image/jpeg;base64,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"
                      alt="Hero"
                      fill
                    />
                  </div>

                  <Image
                    className="hidden shadow-solid-l dark:block"
                    src="/images/hero/hero-dark.svg"
                    alt="Hero"
                    fill
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Hero;
