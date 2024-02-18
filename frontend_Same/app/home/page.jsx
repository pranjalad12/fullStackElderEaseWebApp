"use client"
import React, { useEffect, useState } from "react";
import {UserAuth} from "../context/AuthContext.js"

const Homepage = () => {
  const {user}=UserAuth();
  const [videoSrcTPose, setVideoSrcTPose] = useState('');
  const startVideoTPose = (params) => {
   
    setVideoSrcTPose(`http://127.0.0.1:8080/${params}`);
  };
  const endSessionTPose = () => {
    setVideoSrcTPose("");
  };

  return (
    <div>
      <section className="w-full flex-center flex-col">
        <h3>Welcome to your session {user?.displayName}</h3>
        <div>
          <button onClick={()=> {startVideoTPose('tPose_video') }}>Start your T Pose   </button>
          <button onClick={()=> {startVideoTPose('treePose_video') }}>Start your treepose</button> 
          <br/>
          <br/>
          <button onClick={endSessionTPose}>End your Current Pose  </button>
          <img id="video_feed" src={videoSrcTPose} width="640" height="480" style={{ border: '1px solid black' }} />
        </div>
      </section>
    </div>

  )
}

export default Homepage;
