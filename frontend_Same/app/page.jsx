
 "use client"

 import Typewriter from 'typewriter-effect';
 import { onAuthStateChanged } from 'firebase/auth';
 import { useEffect, useState } from 'react';
 import { app, auth } from './firebase';
 import { doc, getFirestore, setDoc } from 'firebase/firestore';

const Home = () => {
  const [user, setUser] = useState(null);
  const db = getFirestore(app);
  useEffect(() => {
    const callFast = async () => {
      if(user && user.uid) await setDoc(doc(db, 'users', user.uid),{
        userId: user.uid,
        username: user.displayName,
        email: user.email,
        photo: user.photoURL,
        painAreas: [],
        diseases: [],
        motive:[]

      })

    }

    onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    callFast();
  }, [user]);
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