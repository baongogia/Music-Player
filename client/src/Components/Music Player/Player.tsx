import React from "react";
import Control from "./Control";
import Display from "./Display";
import Volume from "./Volume";

function Player() {
  return (
    <div
      style={{ backgroundColor: "rgba(50, 50, 50, 0.5)" }}
      className="fixed z-[1] top-0 right-0 w-[85vw] h-[3em]"
    >
      <div className="flex justify-between items-center h-full">
        <Control
          css="flex justify-between items-center h-full w-[14%] ml-20 text-[#959595] text-[1.4em] cursor-pointer"
          playcss="flex w-[60%] justify-between items-center"
        />
        <Display />
        <Volume />
      </div>
    </div>
  );
}

export default Player;
