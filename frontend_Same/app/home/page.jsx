"use client"
import React, { useEffect, useState } from "react";


const Homepage = () => {
  const [videoSrc, setVideoSrc] = useState('');

  const startVideo = () => {
    setVideoSrc("http://127.0.0.1:8080/video_feed");
  };

  const endSession = () => {
    setVideoSrc("");
    fetch('/end_session', { method: 'GET' });
  };


  const [mes, setMes] = useState("Loading...");
  useEffect(() => {
    fetch("http://127.0.0.1:8080/api/home")
      .then((response) => response.json())
      .then((data) => {
        console.log(data.body);
        setMes(data.body);
      })
    // .catch((error) => {
    //   console.error('Error fetching data:', error);
    // });
  }, []);
  return (
    <div>
      <section className="w-full flex-center flex-col">
        Hello bhavya
        <br></br>
        <div>
          <button onClick={startVideo}>Start Video</button>
          <button onClick={endSession}>End Session</button>
          <br />
          <img id="video_feed" src={videoSrc} width="640" height="480" style={{ border: '1px solid black' }} />
        </div>
        {mes}
        <div>
          {mes}
        </div>
      </section>
    </div>

  )
}

export default Homepage;
