import SearchBar from "./SearchBar";
import AppleMusicMenu from "./AppleMusicMenu";
import React from "react";

function Menu() {
  return (
    <div
      style={{ backgroundColor: "rgba(30, 40, 40, 0.5)" }}
      className="fixed z-10 top-0 left-0 w-[15vw] h-[100vh] border-r-[0.1em] border-r-green-700 border-opacity-45"
    >
      <SearchBar />
      <AppleMusicMenu />
    </div>
  );
}

export default Menu;
