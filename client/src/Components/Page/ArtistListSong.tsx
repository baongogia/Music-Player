import React from "react";
import { IonIcon } from "@ionic/react";
import { ellipsisHorizontal, play } from "ionicons/icons";
interface topSongParam {
  cover: string;
  name: string;
  album: string;
  type: string;
  year: string;
  playsong: () => void;
}

const ArtistListSong: React.FC<topSongParam> = ({
  cover,
  name,
  album,
  type,
  year,
  playsong
}) => {
  return (
    //  border-t-[0.1em] border-solid border-green-800
    <div className="w-[50%] h-[23.5%] mt-5 flex items-center">
      <div
        style={{
          backgroundImage: `url(${cover})`,
        }}
        className="relative w-[10%] h-[90%] rounded-md bg-cover bg-center"
      >
        <div className="group w-full h-full rounded-md hover:bg-black hover:bg-opacity-40">
          <div onClick={playsong} className="group-hover:block hidden translate-y-[20%] text-[1.5em] cursor-pointer">
            <IonIcon icon={play} />
          </div>
        </div>
      </div>
      <div className="flex flex-col items-start ml-4 w-[60%] overflow-hidden ">
        <div className="whitespace-nowrap font-semibold">{name}</div>
        <div className="text-gray-400 font-semibold text-ellipsis w-full text-start overflow-hidden whitespace-nowrap">
          {album} - {type} - {year}
        </div>
      </div>
      <div className="ml-16">
        <IonIcon icon={ellipsisHorizontal} />
      </div>
    </div>
  );
};
export default ArtistListSong;
