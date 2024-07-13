import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { SongType } from "../SpotifyInterfaces";
import { IonIcon } from "@ionic/react";
import {
  addOutline,
  chevronBackOutline,
  ellipsisHorizontalCircle,
  shuffle,
} from "ionicons/icons";
import AlbumListSong from "./AlbumListSong";
import { useSpotifyPlayer } from "../Context/useSpotifyPlayer";
import ArtistAlbum from "../Music/ArtistAlbum";
import { BsFillPlayFill } from "react-icons/bs";
import { AlbumPlayer } from "../Context/AlbumPlayer";

export default function Songpage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const accessToken = localStorage.getItem("access_token");
  const [albumID, setAlbumId] = useState("");
  const [artistID, setArtistID] = useState("");
  const [artistName, setArtistName] = useState("");
  const [listSong, setListSong] = useState<SongType[]>([]);
  const [songData, setSongData] = useState<SongType>();
  const { play: songPlay } = useSpotifyPlayer(accessToken ? accessToken : "");
  const { play: albumPlay } = AlbumPlayer(accessToken ? accessToken : "");
  // Covent time
  function formatDuration(milliseconds: number) {
    const minutes = Math.floor(milliseconds / 60000);
    const seconds = parseInt(((milliseconds % 60000) / 1000).toFixed(0), 10);
    return minutes + ":" + (seconds < 10 ? "0" : "") + seconds;
  }
  //   Get song infor
  useEffect(() => {
    const authParam = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + accessToken,
      },
    };
    fetch(`https://api.spotify.com/v1/tracks/${id}`, authParam)
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setAlbumId(data.album.id);
        setSongData(data);
      })
      .catch((error) => console.log("nono"));
  }, [accessToken, id]);
  //   Get list song in album include song
  useEffect(() => {
    const authParam = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + accessToken,
      },
    };
    fetch(`https://api.spotify.com/v1/albums/${albumID}`, authParam)
      .then((response) => response.json())
      .then((data) => {
        setListSong(data.tracks.items);
        setArtistID(data.artists[0].id);
        setArtistName(data.artists[0].name);
      })
      .catch((error) => console.log("nono"));
  }, [accessToken, id, albumID]);
  return (
    <div className="absolute top-0 right-0 mt-[3em] ml-4 w-[84.15vw] min-h-[100vh] overflow-hidden bg-[#1d1f1f]">
      <div
        className="relative float-left mt-2 ml-2 cursor-pointer"
        onClick={() => navigate(-1)}
      >
        <IonIcon size="large" icon={chevronBackOutline} />
      </div>
      {/* Cover and info */}
      <div className="w-full h-[30vh] mt-28 ml-10 flex items-center">
        {/* Album cover */}
        <div
          style={{
            backgroundImage: `url(${
              songData
                ? songData.album.images[0].url
                : "https://cdn.tgdd.vn/Files/2023/08/26/1544573/2-270823-003239.jpg"
            })`,
          }}
          className="bg-black w-[20%] h-full bg-cover bg-center bg-no-repeat rounded-lg"
        ></div>
        {/* Album info */}
        <div className="w-[65%] h-full ml-8 flex flex-col justify-between text-start">
          <div className="mt-10">
            <div className="text-[2em] font-bold leading-4">
              {songData ? songData.album.name : ""}
            </div>
            <div className="text-[1.5em] text-green-700">
              {songData
                ? songData.artists.map((artist) => artist.name).join(", ")
                : ""}
            </div>
            <div className="font-semibold text-[0.8em] ">
              Pop - {songData?.album.release_date.slice(0, 4)} - Lossless
            </div>
            <div className="mt-6 w-[55%] font-semibold text-[0.8em] ">
              Music flows through artist like a river, each note a brushstroke
              on the canvas of sound. They paints with passion, blending hues of
              emotion and harmony to create a tapestry that speaks to the soul.
            </div>
          </div>
          <div className="flex">
            <div
              onClick={() => albumPlay(albumID)}
              className="px-5 mr-3 flex items-center text-[0.8em] bg-green-700 rounded-md cursor-pointer"
            >
              <BsFillPlayFill />
              Play
            </div>
            <div className="px-3 flex items-center text-[0.8em] bg-green-700 rounded-md cursor-pointer">
              <IonIcon icon={shuffle} />
              Shuffle
            </div>
          </div>
        </div>
        {/* Feature */}
        <div className="mt-[19.5%] w-[10%]">
          <div className="flex items-center w-14 bg-green-700 text-black rounded-xl pr-2 px-1 cursor-pointer">
            <IonIcon icon={addOutline} />
            <div className="">Add</div>
          </div>
          <div className="text-green-700 ml-3 mt-1">
            <IonIcon size="large" icon={ellipsisHorizontalCircle} />
          </div>
        </div>
      </div>
      {/* List song */}
      <div className="mt-10 ml-10 mb-10 w-full h-full">
        {listSong ? (
          listSong.map((song, index) => (
            <AlbumListSong
              number={index + 1}
              name={song.name}
              duration={formatDuration(song.duration_ms)}
              hightlight={song.name === songData?.name}
              playSong={() => songPlay(song.uri)}
            />
          ))
        ) : (
          <div className=""></div>
        )}
      </div>
      {/* More by artist */}
      <ArtistAlbum
        id={artistID ? artistID : ""}
        title={`More By ${artistName}`}
      />
    </div>
  );
}
