import React, { useEffect, useState } from "react";
import { IonIcon } from "@ionic/react";
import {
  shuffle,
  playBack,
  pause,
  playForward,
  repeat,
  play as playIcon,
} from "ionicons/icons";
import { SpotifyPlayerContext } from "../Music Player/PlayerContext";
import { SpotifyPlayer } from "react-spotify-web-playback";

interface ExtendedSpotifyPlayer extends SpotifyPlayer {
  getCurrentState: () => Promise<any>;
}
interface CssProps {
  css?: string;
  playcss?: string;
}
const Control: React.FC<CssProps> = ({ css, playcss }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isRepeat, setIsRepeat] = useState(false);
  const [isShuffle, setIsShuffle] = useState(false);
  const token = localStorage.getItem("access_token");
  const handleRepeatClick = () => {
    setIsRepeat(!isRepeat);
  };
  const handleShuffleClick = () => {
    setIsShuffle(!isShuffle);
  };
  const player = React.useContext(
    SpotifyPlayerContext
  ) as ExtendedSpotifyPlayer;
  // Get access token
  useEffect(() => {
    const playing = localStorage.getItem("isPlaying") === "true";
    setIsPlaying(playing);
  }, []);
  // Updata player
  useEffect(() => {
    const intervalId = setInterval(() => {
      const playing = localStorage.getItem("isPlaying") === "true";
      setIsPlaying(playing);
    }, 1000);

    return () => clearInterval(intervalId);
  }, []);

  // Control playback

  const playSong = async () => {
    if (isPlaying) {
      return;
    }
    try {
      await player.resume();
      setIsPlaying(true);
      localStorage.setItem("isPlaying", "true");
    } catch (error) {
      console.error("Error starting or resuming playback", error);
      setIsPlaying(!isPlaying);
    }
  };

  const pauseSong = () => {
    player.pause().then(() => {
      setIsPlaying(false);
      localStorage.setItem("isPlaying", "false");
      console.log("Paused!");
    });
  };

  const nextTrack = async () => {
    await player.nextTrack().then(() => {
      console.log("Skipped to next track!");
    });
  };

  const previousTrack = async () => {
    await player.previousTrack().then(() => {
      console.log("Skipped to previous track!");
    });
  };

  const setShuffle = (state: boolean) => {
    fetch(`https://api.spotify.com/v1/me/player/shuffle?state=${state}`, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => {
        if (response.ok) {
          setIsShuffle(!state);
        }
      })
      .catch((error) => console.log(error));
  };

  const setRepeat = (state: boolean) => {
    let nextState = "off";
    if (!state) {
      nextState = "context";
    }

    fetch(`https://api.spotify.com/v1/me/player/repeat?state=${nextState}`, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => {
        if (response.ok) {
          setIsRepeat(!state);
        }
      })
      .catch((error) => console.log(error));
  };

  return (
    <div className={`${css}`}>
      <div
        onClick={() => {
          handleShuffleClick();
          setShuffle(isShuffle);
        }}
        className={`${isShuffle ? "text-green-700" : ""} cursor-pointer`}
      >
        <IonIcon icon={shuffle} />
      </div>
      <div className={`${playcss} cursor-pointer`}>
        <div onClick={previousTrack} className="hover:text-green-700">
          <IonIcon icon={playBack} />
        </div>
        <div onClick={() => pauseSong()} className={isPlaying ? "" : "hidden"}>
          <IonIcon icon={pause} />
        </div>
        <div onClick={playSong} className={isPlaying ? "hidden" : ""}>
          <IonIcon icon={playIcon} />
        </div>
        <div onClick={nextTrack} className="hover:text-green-700">
          <IonIcon icon={playForward} />
        </div>
      </div>

      <div
        onClick={() => {
          handleRepeatClick();
          setRepeat(isRepeat);
        }}
        className={`${isRepeat ? "text-green-700" : ""} cursor-pointer`}
      >
        <IonIcon icon={repeat} />
      </div>
    </div>
  );
};

export default Control;
