import React from "react";
import "./App.css";
import Menu from "./Components/Menu/Menu";
import Player from "./Components/Music Player/Player";
import Music from "./Components/Music/Music";
import Login from "./Components/Login/Login";
import { Route, Routes } from "react-router-dom";
import ArtistPage from "./Components/Page/ArtistPage";
import Songpage from "./Components/Page/Songpage";
import AlbumPage from "./Components/Page/AlbumPage";
import MiniPlayer from "./Components/Music/MiniPlayer";
import UserPage from "./Components/Page/UserPage";
import Hide from "./Components/Context/Hide";
import Browser from "./Components/Browser/Browser";

function App() {
  const params = new URLSearchParams(window.location.search);
  const code = params.get("code");
  // Chỉ lưu code vào localStorage nếu nó tồn tại
  if (code) {
    localStorage.setItem("code", code);
  }

  return (
    <>
      {/* Chỉ hiển thị Menu và Player khi code tồn tại */}
      {code && (
        <>
          <Hide>
            <Menu />
          </Hide>
          <Hide>
            <Player />
          </Hide>
        </>
      )}
      <Routes>
        {/* Điều kiện để hiển thị Music hoặc ArtistPage */}
        <Route path="/" element={code ? <Music /> : <Login />} />
        {code && <Route path="/ArtistPage/:id" element={<ArtistPage />} />}
        {code && <Route path="/Songpage/:id" element={<Songpage />} />}
        {code && <Route path="/AlbumPage/:id" element={<AlbumPage />} />}
        {code && <Route path="/MiniPlayer" element={<MiniPlayer />} />}
        {code && <Route path="/UserPage" element={<UserPage />} />}
        {code && <Route path="/Browser" element={<Browser />} />}
      </Routes>
    </>
  );
}

export default App;
