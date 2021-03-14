import React from "react";

const LibrarySong = ({
  song,
  setCurrentSong,
  audioRef,
  isPlaying,
  setSongs,
  songs,
}) => {
  const selectSongHandler = async () => {
    await setCurrentSong(song);

    const newSongs = songs.map((s) => {
      if (s === song) {
        return {
          ...s,
          active: true,
        };
      } else {
        return {
          ...s,
          active: false,
        };
      }
    });
    setSongs(newSongs);
    if (isPlaying) audioRef.current.play();
  };

  return (
    <div
      className={`library-song ${song.active ? "selected" : ""}`}
      onClick={selectSongHandler}
    >
      <img alt={song.name} src={song.cover} />
      <div className="song-description">
        <h3>{song.name}</h3>
        <h4>{song.artist}</h4>
      </div>
    </div>
  );
};

export default LibrarySong;
