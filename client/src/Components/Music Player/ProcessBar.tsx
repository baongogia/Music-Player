import React, { useContext, useEffect, useState } from "react";
import { SpotifyPlayerContext } from "../Music Player/PlayerContext";
import { SpotifyPlayer } from "react-spotify-web-playback";
interface ExtendedSpotifyPlayer extends SpotifyPlayer {
  getCurrentState: () => Promise<any>;
}
function formatDuration(milliseconds: number) {
  const minutes = Math.floor(milliseconds / 60000);
  const seconds = parseInt(((milliseconds % 60000) / 1000).toFixed(0), 10);
  return minutes + ":" + (seconds < 10 ? "0" : "") + seconds;
}
interface prop {
  css?: string;
  barcss?: string;
}
const ProgressBar: React.FC<prop> = ({ css , barcss}) => {
  const player = React.useContext(
    SpotifyPlayerContext
  ) as ExtendedSpotifyPlayer;
  const [channel] = useState(
    () => new BroadcastChannel("spotify-progress-sync")
  );
  const [progress, setProgress] = useState(0);
  const [currentTime, setCurrentTime] = useState("0:00");
  const [totalTime, setTotalTime] = useState("0:00");
  useEffect(() => {
    const play = () => {
      player
        .getCurrentState()
        .then((state) => {
          if (!state || !state.track_window) {
            console.error("Can not get state @@");
            return;
          }
          const duration = state.duration;
          const position = state.position;
          const remaining = duration - position;
          if (!isNaN(position) && !isNaN(duration) && duration > 0) {
            setProgress((position / duration) * 100);
            setCurrentTime(formatDuration(position));
            setTotalTime(formatDuration(remaining));
          } else {
            console.error("Position or duration is not a valid number");
          }
          // Send to BroadcastChannel
          channel.postMessage({
            progress: progress,
            currentTime: currentTime,
            totalTime: totalTime,
          });
        })
        .catch((error) => {
          console.error("Failed to get player state", error);
        });
    };

    const intervalId = setInterval(play, 1000);
    return () => clearInterval(intervalId);
  }, [player, currentTime, channel, progress, totalTime]);
  // Handle information from BroadcastChannel in another tabs
  useEffect(() => {
    const handleMessage = (event: any) => {
      const { progress, currentTime, totalTime } = event.data;
      setProgress(progress);
      setCurrentTime(currentTime);
      setTotalTime(totalTime);
    };

    channel.onmessage = handleMessage;
    return () => {
      channel.removeEventListener("message", handleMessage);
    };
  }, [channel]);

  // Xử lý khi component bị unmount
  useEffect(() => {
    return () => {
      channel.close();
    };
  }, [channel]);

  return (
    <div className="">
      <div className={`text-[0.3em] font-semibold ${css} flex justify-between`}>
        <div className="">{currentTime}</div>
        <div className="">{totalTime}</div>
      </div>
      <div className={`w-full bg-gray-200 ${barcss} h-[0.33em] dark:bg-gray-700`}>
        <div
          className={`bg-gray-400 h-[0.33em] ${barcss}`}
          style={{ width: `${progress}%` }}
        ></div>
      </div>
    </div>
  );
};

export default ProgressBar;
