import { IonIcon } from "@ionic/react";
import { addOutline, ellipsisHorizontalCircle, play } from "ionicons/icons";
import React from "react";

interface listType {
  number: number;
  name: string;
  duration: string;
  hightlight: boolean;
  playSong: () => void;
}

const AlbumListSong: React.FC<listType> = ({
  number,
  name,
  duration,
  hightlight,
  playSong,
}) => {
  return (
    <div
      className={`group  ${
        hightlight ? "bg-green-700" : "bg-zinc-900"
      } w-[78.3vw] rounded-md h-[3em] flex justify-between items-center`}
    >
      <div className="flex items-center ml-4">
        <div className="relative transition-opacity">
          <div className="group-hover:opacity-0 w-2">{number}</div>
          <div
            onClick={playSong}
            className="translate-x-[-0.3em] absolute top-0 left-0 z-10 group-hover:opacity-100 opacity-0 cursor-pointer text-[1.5em] "
          >
            <IonIcon icon={play} />
          </div>
        </div>
        <div className="ml-4">{name}</div>
      </div>
      <div className="flex mr-4 items-center">
        <IonIcon className="group-hover:block hidden mr-4" icon={addOutline} />
        <div className="mr-4">{duration}</div>
        <div className="flex text-green-700">
          <IonIcon icon={ellipsisHorizontalCircle} />
        </div>
      </div>
    </div>
  );
};
export default AlbumListSong;
