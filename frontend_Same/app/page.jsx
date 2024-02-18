"use client"
import '/home/bhavya/Desktop/ElderEase/fullStackElderEaseWebApp/frontend_Same/app/style.css'
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
                strings: ['New Hello', 'New World'],
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
        {/* <h6 className='px-4 blue_gradient head_texto text-sm'><strong>Engaging and Convenient Yoga Classes and tutorials<br />

          <span></span></strong></h6> */}
        <br className="max-md:hidden" />
        <br className="max-md:hidden" />

        <div className="cards justify-center" >
          {/* <div >
            <h1 className='px-4'>Hello</h1>
            <figure className="card">

              <img src="https://media.istockphoto.com/id/1459538271/photo/yoga-exercise-and-meditation-at-the-beach-with-a-woman-in-prayer-position-for-zen-calm-and.webp?b=1&s=170667a&w=0&k=20&c=hUK2mWQqa_YdtEil4qn2JiQ1U4VlH9vL0dyxz5wZNlQ=" />

              <figcaption>Dota 2</figcaption>

            </figure>

          </div>
          <div> <h1 className='px-4'>Hello</h1>
            <figure className="card">

              <img src="https://media.istockphoto.com/id/1473265437/photo/sportswoman-stretching-body-on-quay-in-sunshine.webp?b=1&s=170667a&w=0&k=20&c=NV7ve0k_Hjgf9P4aSKVY3A2iyOJuN-U_FvM23SFQh00=" />

              <figcaption>Stick Fight</figcaption>

            </figure>
          </div>
          <div>
            <h1 className='px-4'>Hello</h1>
            <figure className="card">

              <img src="https://media.istockphoto.com/id/1483989743/photo/an-attractive-female-with-closed-eyes-doing-a-cobra-pose-during-a-yoga-class-in-a-beautiful.webp?b=1&s=170667a&w=0&k=20&c=VSRxr5fL3guW2Pxjnev7MH639VAa259aKPtsWbL4C2s=" />

              <figcaption>Minion Masters</figcaption>

            </figure>
          </div> */}


          <div className='w-[60vw]'>
            <Slider />
          </div>


        </div>




        <h2><strong>What's new?</strong></h2>

        {/* <div class="news" >

          <figure class="article">

            <img src="data:image/jpeg;base64,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" />

            <figcaption className='bg-slate-500'>

              <h3>New Item</h3>

              <p>

                In today’s update, two heads are better than one, and three heads are better than that, as the all-new Flockheart’s Gamble Arcana item for Ogre Magi makes its grand debut.

              </p>

            </figcaption>

          </figure>

          <figure class="article">

            <img src="https://www.linkpicture.com/q/news2.png" />

            <figcaption>

              <h3>Update</h3>

              <p>

                Just in time for Lunar New Year and the Rat’s time in the cyclical place of honor, the Treasure of Unbound Majesty is now available.

              </p>

            </figcaption>

          </figure>

        </div> */}
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
                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 5h12m0 0L9 1m4 4L9 9"/>
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
        Array.from({ length: 20 }, () => <p>test</p>)
      }

    </section>
  )
}

export default Home;