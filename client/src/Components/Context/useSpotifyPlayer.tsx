import axios from "axios";
import React from "react";
import { SpotifyPlayer } from "react-spotify-web-playback";
import { SpotifyPlayerContext } from "../Music Player/PlayerContext";
interface ExtendedSpotifyPlayer extends SpotifyPlayer {
  getCurrentState: () => Promise<any>;
}
interface DeviceType {
  id: string;
  is_active: boolean;
}
export const useSpotifyPlayer = (accessToken: string) => {
  const player = React.useContext(
    SpotifyPlayerContext
  ) as ExtendedSpotifyPlayer;

  const playMusic = React.useCallback(
    (spotify_uri: string) => {
      const token = accessToken;
      const device_id = localStorage.getItem("device_id");
      if (!token) {
        console.error("Access token is not available");
        return;
      }
      axios
        .get("https://api.spotify.com/v1/me/player/devices", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((response) => {
          const devices: DeviceType[] = response.data.devices;
          const sdkDevice = devices.find((device) => device.id === device_id);
          if (!sdkDevice) {
            console.error("SDK Player not found or is not active");
            return;
          }
          return axios.put(
            `https://api.spotify.com/v1/me/player/play`,
            { uris: [spotify_uri] },
            {
              headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
              },
              params: {
                device_id: sdkDevice.id,
              },
            }
          );
        })
        .then(() => {
          console.log("Playback started on device", device_id);
        })
        .catch((error: any) =>
          console.error("Failed to start playback", error)
        );
    },
    [accessToken]
  );

  const play = React.useCallback(
    (spotify_uri: string) => {
      if (!player) {
        console.error("Spotify player is not initialized");
        return;
      }
      localStorage.setItem("isPlaying", true.toString());
      player
        .getCurrentState()
        .then(() => {
          console.log("Playing music.... <3");
          playMusic(spotify_uri);
        })
        .catch((error: any) => {
          console.error("Failed to get player state", error);
        });
    },
    [player, playMusic]
  );
  return {
    play,
    playMusic,
  };
};
