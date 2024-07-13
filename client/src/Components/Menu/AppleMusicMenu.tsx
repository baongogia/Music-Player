import React from "react";
import { IonIcon } from "@ionic/react";
import {
  albumsOutline,
  gridOutline,
  homeOutline,
  micOutline,
  musicalNoteOutline,
  radioOutline,
  refreshOutline,
  sparklesOutline,
  starOutline,
  timeOutline,
  tvOutline,
} from "ionicons/icons";
import { NavLink } from "react-router-dom";

function AppleMusicMenu() {
  const ulTags = (icon: string, title: string, link: string) => {
    return (
      <NavLink
        to={`${link}`}
        className={`group relative pt-[0.5em] pb-[0.5em] flex flex-1 items-center pl-8 cursor-pointer mb-2 rounded-md text-white hover:text-white`}
      >
        <div className={`text-green-700 flex`}>
          <IonIcon icon={`${icon}`} />
        </div>
        <li className="ml-2">{title}</li>
      </NavLink>
    );
  };
  return (
    <div className="relative float-left w-full h-full">
      <p className="absolute float-left top-5 left-3 font-bold text-[0.7em] text-[#ccc] opacity-60">
        Apple Music
      </p>

      <ul className="w-[100%] h-[100%] mt-12 text-[0.8em]">
        {ulTags(homeOutline, "Home", "/")}
        {ulTags(gridOutline, "Browser", "/Browser")}
        {ulTags(radioOutline, "Radio", "/2")}
      </ul>

      <p className="absolute float-left top-[15em] left-3 font-bold text-[0.7em] text-[#ccc] opacity-60">
        Library
      </p>

      <ul className="w-[100%] h-[100%] absolute top-48 text-[0.8em]">
        {ulTags(timeOutline, "Recently Added", "/3")}
        {ulTags(micOutline, "Artists", "/4")}
        {ulTags(albumsOutline, "Album", "/5")}
        {ulTags(musicalNoteOutline, "Songs", "/6")}
        {ulTags(tvOutline, "TV & Movies", "/7")}
        {ulTags(sparklesOutline, "Your favourite", "/8")}
        {ulTags(starOutline, "Best", "/9")}
        {ulTags(refreshOutline, "Refresh", "/10")}
      </ul>

      <p className="absolute float-left top-[46em] left-3 font-bold text-[0.7em] text-[#ccc] opacity-60">
        Playlists
      </p>
    </div>
  );
}

export default AppleMusicMenu;
