import MusicAlbumCard from "./MusicAlbumCard";
import Slider from "react-slick";
import React from "react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Fragment, useEffect, useState } from "react";
import { BsChevronCompactLeft, BsChevronCompactRight } from "react-icons/bs";
import useAuth from "../Context/Key";
import { SpotifyPlayerContext } from "../Music Player/PlayerContext";
import { SpotifyPlayer } from "react-spotify-web-playback";
import axios from "axios";

import {
  ArrowProps,
  ArtistType,
  DeviceType,
  ImageType,
} from "../SpotifyInterfaces";
import { ScaleLoader } from "react-spinners";

// Interface
interface ExtendedSpotifyPlayer extends SpotifyPlayer {
  getCurrentState: () => Promise<any>;
}
interface albumType {
  id: "number";
  name: string;
  title: string;
  artists: ArtistType[];
  images: ImageType[];
  release_date: string;
  uri: string;
  href: string;
}

// AlbumList
function AlbumList() {
  useAuth();
  const [newRealiseList, setNewRealiseList] = useState([]);
  const [accessToken, setAccessToken] = useState("");
  const [showArrow, setShowArrow] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);
  function SampleNextArrow(props: ArrowProps) {
    const { onClick } = props;
    return (
      <div
        className={`absolute top-[40%] ${
          showArrow ? "opacity-100" : "opacity-0"
        } right-[-1.5%] cursor-pointer transition-opacity duration-500`}
        onClick={onClick}
      >
        <div className="hover:bg-green-900 w-[1em] rounded-sm p-1">
          <div className="flex justify-center items-center">
            <div className="text-[3em]">
              <BsChevronCompactRight />
            </div>
          </div>
        </div>
      </div>
    );
  }
  function SamplePrevArrow(props: ArrowProps) {
    const { onClick } = props;
    return (
      <div
        className={`absolute top-[40%] left-[-2.3%] ${
          currentSlide === 0 ? "opacity-0" : "opacity-100"
        } cursor-pointer z-[1]`}
        onClick={onClick}
      >
        <div className="hover:bg-green-900 w-[1em] rounded-sm p-1">
          <div className="flex justify-center items-center">
            <div className="text-[3em]">
              <BsChevronCompactLeft />
            </div>
          </div>
        </div>
      </div>
    );
  }
  // Get access token
  useEffect(() => {
    // Lấy accessToken từ localStorage khi component được mount
    const storedAccessToken = localStorage.getItem("access_token");
    if (storedAccessToken) {
      setAccessToken(storedAccessToken);
    }
  }, []);
  // Play music on album
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
      // Fetch tracks of the album by albumId
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
            // Assuming you want to play the first track
            const spotify_uri = tracks[0].uri;

            // Here you call playMusic function directly with the URI
            playMusic(spotify_uri);
          } else {
            console.log("No tracks found for this album.");
          }
        })
        .catch((error) =>
          console.error("Error fetching album tracks: ", error)
        );
    },
    [accessToken, playMusic]
  );
  // Get album data
  useEffect(() => {
    if (accessToken) {
      const fetchParam = {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + accessToken,
        },
      };

      fetch("https://api.spotify.com/v1/browse/new-releases", fetchParam)
        .then((response) => {
          if (!response.ok) {
            // Tốt hơn nên throw new Error với thông tin phản hồi để biết được mã lỗi cụ thể và thông điệp trả về
            return response.json().then((json) => {
              throw new Error(
                "Response not ok. Status: " +
                  response.status +
                  ". " +
                  json.error.message
              );
            });
          }
          return response.json();
        })
        .then((data) => {
          setNewRealiseList(data.albums.items);
        })
        .catch(() => {});
    }
  }, [accessToken]);
  // Settings slider
  const settings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 4,
    nextArrow: <SampleNextArrow onClick={() => console.log("")} />,
    prevArrow: <SamplePrevArrow onClick={() => console.log("")} />,
    afterChange: (current: number) => setCurrentSlide(current),
    responsive: [
      {
        breakpoint: 2560,
        settings: {
          slidesToShow: 5,
          slidesToScroll: 5,
          infinite: false,
          dots: false,
        },
      },
      {
        breakpoint: 1440,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 4,
          initialSlide: 2,
        },
      },
    ],
  };

  return (
    <div className="ml-[2.5em] pt-[3em] pb-[1.5em] w-[94%] flex flex-col">
      <div className="float-left w-[2em] text-[1.3em] font-bold mb-2 text-green-700 whitespace-nowrap">
        New realise
      </div>
      <div
        onMouseEnter={() => setShowArrow(true)}
        onMouseLeave={() => setShowArrow(false)}
        className=""
      >
        <Slider {...settings}>
          {newRealiseList.length > 0 && newRealiseList ? (
            newRealiseList.map((realise: albumType) => (
              <MusicAlbumCard
                key={realise.id}
                background={realise.images[2].url}
                songname={realise.name}
                singer={realise.artists.map((artist) => artist.name).join(", ")}
                year={realise.release_date.slice(0, 4)}
                play={() => play(realise.id)}
                albumID={realise.id}
              />
            ))
          ) : (
            <Fragment>
              <ScaleLoader color="#0c8625" />
            </Fragment>
          )}
        </Slider>
      </div>
    </div>
  );
}

export default AlbumList;
