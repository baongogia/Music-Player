import { IonIcon } from "@ionic/react";
import { ellipsisHorizontalCircle, playCircle } from "ionicons/icons";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import Overlay from "../Context/Overlay";

interface MusicAlbumType {
  background?: string;
  songname?: string;
  singer?: string;
  type?: string;
  play?: () => void;
  albumId?: string;
  album?: boolean;
}

const SongCard: React.FC<MusicAlbumType> = ({
  background,
  songname,
  singer,
  type,
  play,
  albumId,
  album,
}) => {
  const [action, setAction] = useState(false);
  const [showOverlay, setShowOverlay] = useState<boolean>(false);

  const handleOverlayClick = () => {
    setShowOverlay(false);
    setAction(false);
  };

  return (
    <div className="group relative h-[19em] max-h-[27em] w-[13.3em] flex flex-col justify-end">
      {/* Background */}
      <div
        style={{ backgroundImage: `url(${background})` }}
        className="w-full h-[14em] absolute top-0 bg-white rounded-lg bg-center bg-cover bg-no-repeat cursor-pointer"
      ></div>
      {/* Overlay */}
      <div className="absolute top-0 h-[14em] translate-y-[0em] w-full bg-black bg-opacity-25 hidden group-hover:block z-20 rounded-lg">
        <div className="flex justify-between items-end h-full w-full text-white">
          {/* Manage */}
          <div
            onClick={play}
            className="ml-2 cursor-pointer hover:text-green-800"
          >
            <IonIcon size="large" icon={playCircle} />
          </div>
          <div
            onClick={() => {
              setAction(true);
              setShowOverlay(true);
            }}
            className="mr-2 cursor-pointer hover:text-green-800"
          >
            <IonIcon size="large" icon={ellipsisHorizontalCircle} />
          </div>
        </div>
      </div>
      <Link
        to={`/AlbumPage/${albumId}`}
        className={`absolute top-0 h-[14em] translate-y-[0em] w-full z-20 ${
          album ? "block" : "hidden"
        }`}
      ></Link>
      {/* Information */}
      <div className="w-full h-[4em] text-white text-[0.9em] text-left leading-4 mb-8">
        <div className="font-semibold tracking-wider text-[0.9em] pt-4">
          {songname} {type}
        </div>
        <div className="">{singer}</div>
      </div>
      {/* Action */}
      <div
        className={`absolute z-[99] indent-2 h-20 w-20 bg-white ${
          action ? "opacity-100" : "opacity-0"
        } transition-opacity duration-300`}
      ></div>
      {showOverlay && <Overlay onClick={handleOverlayClick}></Overlay>}
    </div>
  );
};

export default SongCard;
