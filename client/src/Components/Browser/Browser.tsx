import React from "react";
import SongList from "../Music/SongList";

export default function Browser() {
  return (
    <div className="absolute top-[3em] right-0 w-[85vw] min-h-[100vh] bg-[#1d1f1f]">
      <div className="mt-10">
        <SongList info="justatee" title="Justatee" />
      </div>
    </div>
  );
}
