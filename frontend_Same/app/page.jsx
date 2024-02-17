
 "use client"
 
 import Typewriter from 'typewriter-effect';

const Home = () => {
  
  return (
    <section className="w-full flex-center flex-col">
        <h1 className="head_text text-center">Elder Ease Yoga</h1>
        <br className="max-md:hidden"/>
        <div className="head_text text-center">
        <span className="orange_gradient text-center">Experience yoga in a whole
        </span>
        <h1 className="orange_gradient text-center">
        <Typewriter
          options={{
            strings: ['Hello', 'World'],
            autoStart: true,
            loop: true,
          }}
/>
        
        </h1>
        </div>
        <p className="text-center desc">
          Promptopia is an interactive learning platform for AI-powered prompts, for modern
          world to discover, create and share creative prompts.
        </p>
        
    </section>
  )
}

export default Home;