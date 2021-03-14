import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPlay,
  faAngleLeft,
  faAngleRight,
  faPause,
} from "@fortawesome/free-solid-svg-icons";

const Player = ({
  isPlaying,
  SetIsPlaying,
  audioRef,
  songInfo,
  setSongInfo,
  songs,
  setSongs,
  currentSong,
  setCurrentSong,
  changeActiveState,
}) => {
  const playSongHandler = () => {
    if (isPlaying) {
      audioRef.current.pause();
      SetIsPlaying(!isPlaying);
    } else {
      audioRef.current.play();
      SetIsPlaying(!isPlaying);
    }
  };

  const dragHandler = (event) => {
    setSongInfo({ ...songInfo, currentTime: event.target.value });
    audioRef.current.currentTime = event.target.value;
  };

  const getTime = (time) => {
    return (
      Math.floor(time / 60) + ":" + ("0" + Math.floor(time % 60)).slice(-2) //slice(-2) gets two last elements
    );
  };

  const skipTrackHandler = async (direction) => {
    let currentIndex = songs.findIndex((song) => song.id === currentSong.id);

    if (direction === "skip-forward") {
      await setCurrentSong(songs[(currentIndex + 1) % songs.length]);
      changeActiveState(songs[(currentIndex + 1) % songs.length]);
    } else if (direction === "skip-back") {
      if (currentIndex === 0) {
        await setCurrentSong(songs[songs.length - 1]);
        changeActiveState(songs[songs.length - 1]);
      } else {
        await setCurrentSong(songs[currentIndex - 1]);
        changeActiveState(songs[currentIndex - 1]);
      }
    }
    if (isPlaying) audioRef.current.play();
  };

  const trackAnim = {
    transform: `translateX(${songInfo.animationPercentage}%)`,
  };

  return (
    <div className="player">
      <div className="time-control">
        <p>{getTime(songInfo.currentTime)}</p>
        <div
          className="track"
          style={{
            background: `linear-gradient(to right, ${currentSong.color[0]}, ${currentSong.color[1]})`,
          }}
        >
          <input
            type="range"
            min={0}
            max={songInfo.duration || 0}
            value={songInfo.currentTime}
            onChange={dragHandler}
          ></input>

          <div className="animate-track" style={trackAnim}></div>
        </div>
        <p>{songInfo.duration ? getTime(songInfo.duration) : "0:00"}</p>
      </div>

      <div className="play-control">
        <FontAwesomeIcon
          className="skip-back"
          icon={faAngleLeft}
          size="2x"
          onClick={() => skipTrackHandler("skip-back")}
        />
        <FontAwesomeIcon
          className="play"
          onClick={playSongHandler}
          icon={isPlaying ? faPause : faPlay}
          size="2x"
        />
        <FontAwesomeIcon
          className="skip-forward"
          icon={faAngleRight}
          size="2x"
          onClick={() => skipTrackHandler("skip-forward")}
        />
      </div>
    </div>
  );
};

export default Player;
