import React from "react";

import logo from "./logo.png";
import "./App.css";
import VideoPlayer from './components/VideoPlayer'
import Notes from "./components/Notes";


const App = () => {
  return (
    <div className="App">
      <div className="TopRow">
        <div><img src={logo} className="AppLogo" alt="logo" /></div>
      </div>
      <div className="MainRow">
        <VideoPlayer url="https://www.youtube.com/watch?v=f1x9lgX8GaE&t=319s" title="Neil Turok Public Lecture: The Astonishing Simplicity of Everything" />
        <Notes />
      </div>
    </div>
  );
};

export default App;
