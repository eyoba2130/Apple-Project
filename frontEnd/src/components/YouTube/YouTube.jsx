

import { useState, useEffect } from "react";
import '../YouTube/YouTube.css';

export default function YouTube() {
  const [youtubeVideos, setVideo] = useState([]);

  useEffect(() => {
    fetch("https://youtube.googleapis.com/youtube/v3/search?part=snippet&channelId=UCE_M8A5yxnLfW0KghEeajjw&maxResults=6&order=date&key=AIzaSyBZgVaRkSDDj1yISunZkS2wV87M5_25kSE ")
      .then((res) => res.json())
      .then((data) => {
              console.log(data);
        if (data.items) {
          setVideo(data.items);
        }
      })
  }, []);

  return (<>
    <div className="allVideosWrapper">
      <h1>Latest Videos</h1>
             <br />
              <br />
              <br />

      <div className="container">
        <div className="row h-100 align-items-center justify-content-center text-center">
          <div className="col-12">
            <div className="title-wrapper bold video-title-wrapper">
             
            </div>
          </div>

          {youtubeVideos.map((singleVideo, i) => {
            const vidId = singleVideo.id.videoId;
            const vidLink = `https://www.youtube.com/watch?v=${vidId}`;
            console.log(youtubeVideos);

            
            return (
              <div key={i} className="col-sm-12 col-md-4">
                <div className="singleVideoWrapper">
                  <div className="videoThumbnail">
                    <a href={vidLink} target="_blank" rel="noreferrer">
                      <img
                        src={singleVideo.snippet.thumbnails.high.url}
                        alt={singleVideo.snippet.title}
                      />
                    </a>
                  </div>

                  <div className="videoInfoWrapper">
                    <div className="videoTitle">
                      <a href={vidLink} target="_blank" rel="noreferrer">
                        {singleVideo.snippet.title}
                      </a>
                    </div>
                    <div className="videoDesc">
                      {singleVideo.snippet.description.substring(0, 100)}

                    </div>
                  </div>
                </div>
              </div>
          );
          })}
        </div>
      </div>
    </div>
     </> 
);
}

// import { useEffect } from "react";
// import { useState } from "react"

// export default function YouTube() {

//     const [youTubeVideos, setVideo] = useState([]);
//   useEffect(() => {
//     fetch("https://youtube.googleapis.com/youtube/v3/search?part=snippet&channelId=UCxA7AzkI2Sndf8S1G5rSkwQ&maxResults=10&order=date&key=AIzaSyBZgVaRkSDDj1yISunZkS2wV87M5_25kSE")
//       .then((res) => res.json()).then((data) => {
//         console.log(data);
//         if (data.items) {
//           setVideo(data.items);
//         }
//       });
//   }, []);
    
//     return (
//         <></>
//     )
// }



