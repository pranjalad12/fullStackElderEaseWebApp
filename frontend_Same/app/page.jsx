"use client"
import './style.css'
import Typewriter from 'typewriter-effect';
import Slider from "../components/slider";

const Home = () => {


  return (
    <section className="w-full flex-center flex-col">
      <h1 className="head_text text-center">Elder Ease Yoga</h1>

      <div className="head_text text-center">
        <span className="orange_gradient text-center">Experience yoga in a whole

          <h1 className="orange_gradient text-center">
            <Typewriter
              options={{
                strings: ['New Way', 'New World'],
                autoStart: true,
                loop: true,
              }}
            />

          </h1>
        </span>
      </div>
      <br className="max-md:hidden" />
      <br className="max-md:hidden" />
      <p className="text-center desc">
        ElderEase  revolves around leveraging technology to enhance the well-being of senior citizens through personalized yoga guidance.
      </p>



      <div className="wrapper">
        <br className="max-md:hidden" />
        <br className="max-md:hidden" />
        <br className="max-md:hidden" />
        <br className="max-md:hidden" />
        <br className="max-md:hidden" />
        <br className="max-md:hidden" />
        <br className="max-md:hidden" />
        <br className="max-md:hidden" />

      <div className="cards justify-center">


          <div className='w-[60vw]'>
            <Slider />
          </div>

        </div>
        <h2><strong>What's new?</strong></h2> <br />
        
        <div className='flex justify-between'>
              <div className='pr-10 pl-10 '>
                <img className='h-50' src='/assets/assets/images/mobile.png'></img>
              </div>
              <div className='flex head_texto orange_gradient text-center items-center'>
              START YOUR JOURNEY TO WELL-BEING AND <br/>TRANSFORMATION NOW! Sign up with ElderEase <br/>
              Stay motivated by customizing and <br/>tracking your daily yoga routine.
              </div>
        </div>

        <br className="max-md:hidden" />
        <br className="max-md:hidden" />
        <br className="max-md:hidden" />
      </div>


      {/* <button style={{backgroundImage: 'linear-gradient(to right, #f6d365 0%, #fda085 51%, #f6d365 100%)'}} className='w-9'>helloo</button> */}
      <div class="container">
        <ul id="cards">
          <li class="card" id="card1">
            <div class="card-body">


              <div class=" bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
                <a href="#">
                  <img class="rounded-t-lg" src="/docs/images/blog/image-1.jpg" alt="" />
                </a>
                <div class="p-5">
                  <a href="#">
                    <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">Noteworthy technology acquisitions 2021</h5>
                  </a>
                  <p class="mb-3 font-normal text-gray-700 dark:text-gray-400">Here are the biggest enterprise technology acquisitions of 2021 so far, in reverse chronological order.</p>
                  <a href="#" class="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                    Read more
                    <svg class="rtl:rotate-180 w-3.5 h-3.5 ms-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
                      <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 5h12m0 0L9 1m4 4L9 9" />
                    </svg>
                  </a>
                </div>
              </div>


            </div>
          </li>
          <li class="card" id="card2">
            <div class="card-body">
              <h2>Card 2</h2>
            </div>
          </li>
          <li class="card" id="card3">
            <div class="card-body">
              <h2>Card 3</h2>
            </div>
          </li>
          <li class="card" id="card4">
            <div class="card-body">
              <h2>Card 4</h2>
            </div>
          </li>
        </ul>
      </div>
      {
        Array.from({ length: 2 }, () => <p className='head_text'>Footer</p>)
      }

    </section>
  )
}

export default Home;