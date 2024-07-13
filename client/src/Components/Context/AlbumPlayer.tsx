import axios from "axios";
import React from "react";
import { DeviceType } from "../SpotifyInterfaces";
import { SpotifyPlayer } from "react-spotify-web-playback";
import { SpotifyPlayerContext } from "../Music Player/PlayerContext";
interface ExtendedSpotifyPlayer extends SpotifyPlayer {
  getCurrentState: () => Promise<any>;
}
export const AlbumPlayer = (accessToken: string) => {
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
        .catch((error) => console.error("Failed to start playback", error));
    },
    [accessToken]
  );

  const play = React.useCallback(
    (albumId: string) => {
      if (!accessToken) {
        console.error("Access token is not available");
        return;
      }
      localStorage.setItem("isPlaying", true.toString());
      axios
        .get(`https://api.spotify.com/v1/albums/${albumId}/tracks`, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken}`,
          },
        })
        .then((response) => {
          const tracks = response.data.items;
          if (tracks.length > 0) {
            const spotify_uri = tracks[0].uri;
            playMusic(spotify_uri);
          } else {
            console.log("No tracks found for this album.");
          }
        })
        .catch((error: any) =>
          console.error("Error fetching album tracks: ", error)
        );
    },
    [accessToken, playMusic]
  );
  return { playMusic, play };
};
