import React, { useEffect, useState } from "react";
import { IonIcon } from "@ionic/react";
import {
  addOutline,
  chevronBackOutline,
  chevronForward,
  chevronForwardOutline,
  ellipsisHorizontalCircle,
  playCircle,
} from "ionicons/icons";
import { useNavigate, useParams } from "react-router-dom";
import ArtistListSong from "./ArtistListSong";
import { useSpotifyPlayer } from "../Context/useSpotifyPlayer";
import {
  ArtistInforType,
  RelatedArtistProps,
  SongType,
  TopSongType,
} from "../SpotifyInterfaces";
import RelatedArtist from "./RelatedArtist";
import ArtistAlbum from "../Music/ArtistAlbum";

export default function ArtistPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const accessToken = localStorage.getItem("access_token");
  const [artistInfo, setArtistInfo] = useState<ArtistInforType>();
  const [topSong, setTopSong] = useState<TopSongType[]>([]);
  const [newRealise, setNewRealise] = useState<SongType>();
  const [relatedArtist, setRelatedArtist] = useState<RelatedArtistProps[]>([]);
  type SpotifyTrack = {
    album: {
      release_date: string;
    };
  };
  // Get artist information
  useEffect(() => {
    const authParam = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + accessToken,
      },
    };
    fetch(`https://api.spotify.com/v1/artists/${id}`, authParam)
      .then((response) => response.json())
      .then((data) => {
        setArtistInfo(data);
      })
      .catch((error) => console.log("nono"));
  }, [accessToken, id]);
  // Get new-realise track
  useEffect(() => {
    const authParam = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + accessToken,
      },
    };

    fetch(
      `https://api.spotify.com/v1/artists/${id}/top-tracks?country=US`,
      authParam
    )
      .then((response) => response.json())
      .then((data) => {
        if (data.tracks && data.tracks.length) {
          const sortedTracks = data.tracks.sort(
            (a: SpotifyTrack, b: SpotifyTrack) => {
              const dateA = new Date(a.album.release_date);
              const dateB = new Date(b.album.release_date);
              return dateB.getTime() - dateA.getTime(); // Sử dụng getTime() để so sánh số milliseconds
            }
          );
          const newestTrack = sortedTracks[0];
          setNewRealise(newestTrack); // Lưu bài hát mới nhất vào state
        }
      })
      .catch((error) => console.error("Error fetching top tracks:", error));
  }, [accessToken, id]);
  // Get top song
  useEffect(() => {
    const authParam = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + accessToken,
      },
    };
    fetch(
      `https://api.spotify.com/v1/artists/${id}/top-tracks?country=US`,
      authParam
    )
      .then((response) => response.json())
      .then((data) => {
        setTopSong(data.tracks);
      })
      .catch((error) => console.log("nono"));
  }, [accessToken, id]);
  // Play
  const { play } = useSpotifyPlayer(accessToken ? accessToken : "");
  // Realted Artist
  useEffect(() => {
    const authParam = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + accessToken,
      },
    };
    fetch(`https://api.spotify.com/v1/artists/${id}/related-artists`, authParam)
      .then((response) => response.json())
      .then((data) => {
        setRelatedArtist(data.artists);
      })
      .catch((error) => console.log("nono"));
  }, [accessToken, id]);
  return (
    <div className="absolute top-0 right-0 mt-[3em] ml-4 w-[84.15vw] min-h-[100vh] overflow-hidden bg-[#1d1f1f]">
      {/* Go back */}
      <div
        className="relative float-left mt-2 ml-2 cursor-pointer"
        onClick={() => navigate(-1)}
      >
        <IonIcon size="large" icon={chevronBackOutline} />
      </div>
      {/* Artist cover */}
      <div
        style={{
          backgroundImage: `url(${
            artistInfo
              ? artistInfo.images[0].url
              : "https://images.unidays.world/i/self-serve/customer/lETh4F6NVESsgCVuUZg9tjR_8HZ4fEdLrLAnpbEKnwg=/header/07484c11-3ca7-4999-ae9b-9a851860dcd8"
          })`,
        }}
        className="relative bg-black w-full h-[50vh] mt-12 bg-cover bg-no-repeat bg-center"
      >
        <div className="absolute bottom-4 left-7 flex items-center z-30">
          <div className="hover:text-green-700 cursor-pointer">
            <IonIcon size="large" icon={playCircle} />
          </div>
          <div className="ml-2 font-bold text-[2em]">
            {artistInfo ? artistInfo.name : ""}
          </div>
        </div>
      </div>
      {/* Lastest Realise */}
      <div className="w-[30vw] h-[28vh] ml-[3em] overflow-hidden">
        <div className="float-left mt-8 mb-4 font-bold whitespace-nowrap">
          Lastest Realise
        </div>
        <div className="group relative flex items-start h-full w-full">
          {/* Cover */}
          <div
            style={{
              backgroundImage: `url(${
                newRealise
                  ? newRealise.album.images[0].url
                  : "https://images.unidays.world/i/self-serve/customer/lETh4F6NVESsgCVuUZg9tjR_8HZ4fEdLrLAnpbEKnwg=/header/07484c11-3ca7-4999-ae9b-9a851860dcd8"
              })`,
            }}
            className="bg-black w-[36%] h-[70%] bg-cover bg-center bg-no-repeat rounded-2xl mr-5"
          ></div>
          {/* Overlay */}
          <div className="absolute top-0 h-[70%] w-[36%] bg-opacity-25 bg-black hidden group-hover:block z-20 rounded-2xl">
            <div className="flex justify-between items-end h-full w-full text-white">
              {/* Manage */}
              <div
                onClick={() => play(newRealise ? newRealise.uri : "")}
                className="ml-2 cursor-pointer hover:text-green-800"
              >
                <IonIcon size="large" icon={playCircle} />
              </div>
              <div className="mr-2 cursor-pointer hover:text-green-800">
                <IonIcon size="large" icon={ellipsisHorizontalCircle} />
              </div>
            </div>
          </div>
          {/* information */}
          <div className="w-[60%] mt-8 flex flex-col items-start font-semibold">
            <div className="text-gray-400">
              {newRealise ? newRealise.album.release_date : ""}
            </div>
            <div className="w-[70%] text-start truncate overflow-hidden text-ellipsis">
              {newRealise ? newRealise.name : ""}
            </div>
            <div className="mb-3 text-gray-400">
              {newRealise ? newRealise.album.total_tracks : ""} Songs
            </div>
            <div className="flex items-center bg-zinc-700 text-green-700 rounded-xl pr-1 cursor-pointer">
              <IonIcon icon={addOutline} />
              <div className="">Add</div>
            </div>
          </div>
        </div>
      </div>
      {/* List top song */}
      <div className="absolute top-[58vh] right-0 w-[54vw] h-[30vh]">
        <div className="w-full font-bold flex flex-start items-center">
          <div className="">Top Song</div>
          <IonIcon icon={chevronForwardOutline} />
        </div>
        <div className="w-[100%] h-[80%] flex flex-wrap overflow-hidden items-center">
          {topSong ? (
            topSong.map((topsong: TopSongType, index: number) => (
              <ArtistListSong
                key={index}
                cover={topsong.album.images[0].url}
                name={topsong.name}
                album={topsong.album.name}
                type={"Single"}
                year={topsong.album.release_date.slice(0, 4)}
                playsong={() => play(topsong.uri)}
              />
            ))
          ) : (
            <div className=""></div>
          )}
        </div>
      </div>
      {/* Album */}
      <ArtistAlbum id={id ? id : ""} title="Singles & EPs" />
      {/* Related Artist */}
      <div className="mt-8 w-full h-full overflow-hidden">
        <div className="flex items-center mb-8">
          <div className="ml-[3em] text-start font-bold">Similar Artists</div>
          <IonIcon icon={chevronForward} />
        </div>
        <div className="flex justify-around mb-16">
          {relatedArtist ? (
            relatedArtist
              .slice(0, 8)
              .map((artist) => (
                <RelatedArtist
                  key={artist.id}
                  images={artist.images[0].url}
                  name={artist.name}
                  id={artist.id}
                />
              ))
          ) : (
            <div className=""></div>
          )}
        </div>
      </div>
    </div>
  );
}
