import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Fragment, useEffect, useState } from "react";
import { BsChevronCompactLeft, BsChevronCompactRight } from "react-icons/bs";
import SongCard from "./SongCard";
import React from "react";
import { IonIcon } from "@ionic/react";
import { chevronForwardSharp } from "ionicons/icons";
import { ArrowProps, ArtistAlbumType } from "../SpotifyInterfaces";
import { AlbumPlayer } from "../Context/AlbumPlayer";

interface InfoAType {
  id: string;
  title: string;
}
// SongList
const ArtistAlbum: React.FC<InfoAType> = ({ id, title }) => {
  const accessToken = localStorage.getItem("access_token");
  const [songList, setSongList] = useState([]);
  const { play } = AlbumPlayer(accessToken ? accessToken : "");
  const [showArrow, setShowArrow] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);

  function SampleNextArrow(props: ArrowProps) {
    const { onClick } = props;
    return (
      <div
        className={`absolute top-[30%] ${
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
        className={`absolute top-[30%] left-[-2.3%] ${
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
  // get SongList
  useEffect(() => {
    if (accessToken) {
      const fetchParam = {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + accessToken,
        },
      };

      fetch(`https://api.spotify.com/v1/artists/${id}/albums `, fetchParam)
        .then((response) => {
          if (!response.ok) {
            throw new Error("Response not okay");
          }
          return response.json();
        })
        .then((data) => {
          console.log({ data });
          setSongList(data.items);
        })
        .catch(() => console.log("nono"));
    }
  }, [accessToken, id]);

  const settings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 5,
    slidesToScroll: 5,
    nextArrow: <SampleNextArrow onClick={() => console.log("")} />,
    prevArrow: <SamplePrevArrow onClick={() => console.log("")} />,
    afterChange: (current: number) => setCurrentSlide(current),
    responsive: [
      {
        breakpoint: 3834,
        settings: {
          slidesToShow: 6,
          slidesToScroll: 6,
          infinite: false,
          dots: false,
        },
      },
      {
        breakpoint: 1440,
        settings: {
          slidesToShow: 5,
          slidesToScroll: 5,
          initialSlide: 2,
        },
      },
    ],
  };

  return (
    <div className="ml-[3em] pt-[1em] w-[94%] flex flex-col">
      <div className="float-left w-[2em] font-bold mb-2 whitespace-nowrap flex items-center">
        <div className="">{title}</div>
        <div className="text-[1.2em] h-full flex items-center">
          <IonIcon icon={chevronForwardSharp} />
        </div>
      </div>
      <div
        onMouseEnter={() => setShowArrow(true)}
        onMouseLeave={() => setShowArrow(false)}
      >
        <Slider {...settings}>
          {songList.length > 0 && songList ? (
            songList.map((song: ArtistAlbumType) => (
              <SongCard
                key={song.id}
                background={song.images[0].url}
                songname={song.name}
                singer={song.artists.map((song) => song.name).join(", ")}
                play={() => play(song.id)}
                albumId={song.id}
                album={true}
              />
            ))
          ) : (
            <Fragment>
              <div className=""></div>
            </Fragment>
          )}
        </Slider>
      </div>
    </div>
  );
};

export default ArtistAlbum;
