import React, { ReactNode } from "react";
import { useEffect, useState } from "react";
export const SpotifyPlayerContext =
  React.createContext<Spotify.SpotifyPlayer | null>(null);
  
interface MyComponentProps {
  children?: ReactNode;
}

export const SpotifyPlayerProvider: React.FC<MyComponentProps> = ({
  children,
}) => {
  const [player, setPlayer] = useState<Spotify.SpotifyPlayer | null>(null);
  useEffect(() => {
    window.onSpotifyWebPlaybackSDKReady = () => {
      // Kiểm tra lại nếu player đã được khởi tạo
      if (!player) {
        const token = localStorage.getItem("access_token") || "";
        localStorage.removeItem('device_id');
        const spotifyPlayer = new Spotify.Player({
          name: "Web Playback SDK Quick Start Player",
          getOAuthToken: (cb) => {
            cb(token);
          },
        });

        // Setup player events...
        spotifyPlayer.addListener("ready", ({ device_id }) => {
          console.log("Ready with Device ID", device_id);
          localStorage.setItem('device_id', device_id)
          setPlayer(spotifyPlayer);
        });

        spotifyPlayer.addListener("not_ready", ({ device_id }) => {
          console.log("Device ID has gone offline", device_id);
        });

        // Connect to the player!
        spotifyPlayer.connect().then((success) => {
          if (success) {
            console.log(
              "The Web Playback SDK successfully connected to Spotify!"
            );
          }
        });

        // Set player to state
        setPlayer(spotifyPlayer);
      }
    };

    // Load the Spotify Playback SDK asynchronously
    const scriptTag = document.createElement("script");
    scriptTag.src = "https://sdk.scdn.co/spotify-player.js";
    document.head.appendChild(scriptTag);

    return () => {
      // Cleanup
      player?.disconnect();
    };
  }, [player]);

  return (
    <SpotifyPlayerContext.Provider value={player}>
      {children}
    </SpotifyPlayerContext.Provider>
  );
};
