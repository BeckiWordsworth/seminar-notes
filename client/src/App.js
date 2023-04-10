import React from "react";

import ReactPlayer from "react-player";
import logo from "./logo.png";
import "./App.css";
import Notes from "./components/Notes";


const App = () => {
  return (
    <div className="App">
      <div className="MainRow">
        <div className="VideoContainer">
          <div className="VideoCover" />
          <ReactPlayer
            className="ReactPlayer"
            width="100%"
            height="100%"
            url="https://www.youtube.com/watch?v=f1x9lgX8GaE&t=319s"
            playing
            loop
            muted
          />
          <img src={logo} className="AppLogo" alt="logo" />
        </div>
        <Notes />
      </div>
    </div>
  );
};

export default App;
