import ReactPlayer from "react-player";
import styled from "styled-components";
import logo from "../logo.png";

const VideoPlayer = ({url, title}) => {
    return (
        <StyledVideoPlayer>
            <div className="VideoWrapper">
                <div className="VideoCover" />
                <ReactPlayer
                    className="ReactPlayer"
                    width="100%"
                    height="100%"
                    url={url}
                    playing
                    loop
                    muted
                />
                <img src={logo} className="AppLogoOverlay" alt="logo" />
          </div>
          { title ? <div className="VideoTitle">{ title }</div> : "" }          
        </StyledVideoPlayer>
    );
}


export default VideoPlayer;

const StyledVideoPlayer = styled.div`
    width: 100%;
    min-height: 225px;
  
    .VideoWrapper {
        border-radius: 8px;
        overflow: hidden;
        background-color: black;
        position: relative;
        width: auto; // Reset width
        height: auto; // Reset height        
    }

    .VideoCover {
        position: absolute;
        top: 0px;
        left: 0;
        bottom: 0;
        right: 0;
        z-index: 1;
    }

    .VideoTitle {
        padding: 10px 6px;
        font-size: 1.3rem;
        font-weight: bold;
    }

    .ReactPlayer {
        padding-top: 56.25%; // Percentage ratio for 16:9        
        position: relative;
    }  

    .ReactPlayer > div {
        position: absolute;
        top: 0px;    
    }

    .AppLogoOverlay {
        position: absolute;
        bottom: 2vmin;
        right: 2vmin;
        height: 6vmin;
        pointer-events: none;
        user-select: none;
      
        padding: 1vmin;
        border-radius: 5px;
      }
`;