"use client"
import React, { useEffect, useState } from "react";
import { UserAuth } from "../context/AuthContext.js"

const Homepage = () => {
  const { user } = UserAuth();
  const [videoSrc, setVideoSrc] = useState('');

  const startVideo = (params) => {
    setVideoSrc(`http://127.0.0.1:8080/${params}`);
  };
  const endSession = () => {
    setVideoSrc("");
  };

  return (
    <div>
      <section className="w-full flex-center flex-col">
        <p class="head_text text-center">Welcome to your session </p>
        <span className="orange_gradient head_text text-center">{user?.displayName}</span>
        <div>
          <button className='black_btn' onClick={() => { startVideo('tPose_video') }}>Start your T Pose</button> 
          <button className='black_btn' onClick={() => { startVideo('treePose_video') }}>Start your treepose</button>
          <button className='black_btn' onClick={() => { startVideo('warriorPose_video') }}>Start your warrior</button>
          <img id="video_feed" src={videoSrc} width="800" height="490" style={{ border: '1px solid black' }} />
          <button className='mt-5 w-full black_btn' onClick={endSession}>End your Current Pose</button>
        </div>
      </section>
    </div>
  )
}

export default Homepage;
