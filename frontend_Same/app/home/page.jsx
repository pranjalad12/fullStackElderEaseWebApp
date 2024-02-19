"use client"
import React, { useEffect, useState } from "react";
import { UserAuth } from "../context/AuthContext.js"

const Homepage = () => {
  const { user } = UserAuth();
  const [videoSrc, setVideoSrc] = useState('');

  const startVideo = (poseName) => {
    setVideoSrc(`http://127.0.0.1:8080/${poseName}`);
  };

  const endSession = () => {
    setVideoSrc("");
  };

  const yogaPoses = ['tPoseVideo', 'warriorPoseVideo', 'treePoseVideo'];

  const handleStartVideo = (poseName) => {
    return () => startVideo(poseName);
  };

  return (
    <div>
      <section className="w-full flex-center flex-col">
        <p class="head_text text-center">Welcome to your session </p>
        <span className="orange_gradient text-4xl text-center">{user?.displayName}</span> <br/>
        <div>
          <div className="flex justify-around">
            {yogaPoses.map((pose, index) => (
              <button key={index} className='black_btn' onClick={handleStartVideo(pose)}>Start your {pose}</button>
            ))}
          </div>
          <br/>
          <img id="video_feed" src={videoSrc} width="800" height="490" style={{ border: '1px solid black' }} />
          <button className='mt-5 w-full black_btn' onClick={endSession}>End your Current Pose</button>
        </div>
      </section>
    </div>
  )
}

export default Homepage;
