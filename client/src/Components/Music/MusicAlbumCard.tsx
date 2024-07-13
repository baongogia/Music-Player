import { IonIcon } from "@ionic/react";
import { ellipsisHorizontalCircle, playCircle } from "ionicons/icons";
import React from "react";
import { Link } from "react-router-dom";

interface MusicAlbumType {
  background: string;
  songname: string;
  singer: string;
  year: string;
  play: () => void;
  albumID?: string;
}
const MusicAlbumCard: React.FC<MusicAlbumType> = ({
  background,
  songname,
  singer,
  year,
  play,
  albumID,
}) => {
  return (
    <div
      style={{ backgroundImage: `url(${background})` }}
      className="group relative h-[22.5em] lg:w-[16.5em] 2xl:w-[17em] rounded-lg flex flex-col justify-end bg-center bg-cover bg-no-repeat cursor-pointer"
    >
      {/* Overlay */}
      <Link
        to={`/AlbumPage/${albumID}`}
        className="h-full w-full bg-black bg-opacity-20 hidden group-hover:block z-20 relative"
      >
        <div className="bottom-[0.5em] absolute flex justify-between w-full text-white">
          {/* Manage */}
          <div
            onClick={play}
            className="ml-2 cursor-pointer text-[1.7em] hover:text-green-800"
          >
            <IonIcon size="large" icon={playCircle} />
          </div>
          <div className="mr-2 cursor-pointer hover:text-green-800">
            <IonIcon size="large" icon={ellipsisHorizontalCircle} />
          </div>
        </div>
      </Link>
      {/* Information */}
      <div
        style={{ backdropFilter: "blur(3em)" }}
        className="bg-black bg-opacity-25 text-white text-[0.9em] rounded-br-lg 
      rounded-bl-lg py-2 text-center leading-4 w-full"
      >
        <div className="font-bold tracking-widertext-[0.9em]">{songname}</div>
        <div className="truncate text-ellipsis overflow-hidden">{singer}</div>
        <div className="">{year}</div>
      </div>
    </div>
  );
};

export default MusicAlbumCard;
