import React, { useEffect, useRef, useState } from "react";
import { useSong } from "../Music Player/SongContext";
import ProgressBar from "../Music Player/ProcessBar";
import Control from "../Music Player/Control";
export default function MiniPlayer() {
  const [songLyrics, setSongLyrics] = useState([]);
  const [haveLyrics, setHaveLyrics] = useState(false);
  const lyricsContainerRef = useRef<HTMLDivElement | null>(null);

  // Get current song
  const { songPlaying } = useSong();
  // Get lyrics from Song
  useEffect(() => {
    if (songPlaying) {
      const fetchLyrics = async () => {
        try {
          const lyricsResponse = await fetch(
            `https://api.lyrics.ovh/v1/${songPlaying.artists[0].name}/${songPlaying.name}`
          );
          const lyricsData = await lyricsResponse.json();
          if (lyricsData && lyricsData.lyrics) {
            setSongLyrics(
              lyricsData.lyrics.split("\n").slice(1, lyricsData.lyrics.length)
            );
            setHaveLyrics(true);
          } else {
            setSongLyrics([]);
            setHaveLyrics(false);
          }
        } catch (error) {
          console.error("Error fetching lyrics", error);
          setSongLyrics([]);
        }
      };
      fetchLyrics();
    }
  }, [songPlaying]);
  // Scroll lyrics
  useEffect(() => {
    const intervalId = setInterval(() => {
      if (lyricsContainerRef.current) {
        lyricsContainerRef.current.scrollTop += 50;
      }
    }, 1000);

    return () => clearInterval(intervalId);
  }, [songPlaying]);
  return (
    <div
      style={{ backgroundImage: `url(${songPlaying?.album.images[0].url})` }}
      className="fixed top-0 left-0 w-[100vw] h-[100vh] bg-cover bg-center bg-no-repeat"
    >
      <div
        style={{ backdropFilter: "blur(2em)" }}
        className="bg-black fixed top-0 left-0 w-[100vw] h-[100vh] bg-opacity-[5%]"
      ></div>
      <div
        className={`relative ${
          haveLyrics ? "left-[10%]" : "left-[35%]"
        } top-[20%] w-[30%] h-[70%]`}
      >
        {/* Song cover */}
        <div
          style={{
            backgroundImage: `url(${songPlaying?.album.images[0].url})`,
          }}
          className="absolute w-full h-[80%] rounded-2xl top-0 bg-cover bg-center bg-no-repeat"
        ></div>
        {/* Process */}
        <div className="absolute w-full h-[20%] bottom-0">
          <div className="mt-8">
            <ProgressBar barcss="rounded-full"/>
          </div>
          <div className={``}>
            <Control
              css="flex w-full justify-between text-[1.5em] mt-2"
              playcss="flex w-[20%] justify-between items-center"
            />
          </div>

          <div className="">
            <div className="font-bold">{songPlaying?.name}</div>
            <div className="font-semibold text-gray-400">
              {songPlaying?.artists.map((artist) => artist.name).join(",")}
            </div>
          </div>
        </div>
      </div>
      {/* Lyrics */}
      <div
        ref={lyricsContainerRef}
        className="w-[35%] h-full absolute right-[15%] top-[20%] font-bold text-[2em] text-start
                     scroll-smooth overflow-auto overflow-y-hidden max-h-[calc(100vh-100px)]"
      >
        {songLyrics.map((line, index) => (
          <div className="mt-3" key={index}>
            {line}
          </div>
        ))}
      </div>
    </div>
  );
}
