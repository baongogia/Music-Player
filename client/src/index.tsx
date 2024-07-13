import "./index.css";
import ReactDOM from "react-dom";
import React from "react";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { SpotifyPlayerProvider } from "./Components/Music Player/PlayerContext";
import { BrowserRouter } from "react-router-dom";
import { SongProvider } from "./Components/Music Player/SongContext";

ReactDOM.render(
  <React.StrictMode>
    <SongProvider>
      <BrowserRouter>
        <SpotifyPlayerProvider>
          <App />
        </SpotifyPlayerProvider>
      </BrowserRouter>
    </SongProvider>
  </React.StrictMode>,
  document.getElementById("root")
);

reportWebVitals();
