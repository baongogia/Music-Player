import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from "react";
import { SongType } from "../SpotifyInterfaces";

// Cập nhật kiểu dữ liệu cho SongContextType để chỉ bao gồm songPlaying
type SongContextType = {
  songPlaying: SongType | null;
  setSongPlaying: (song: SongType) => void;
};

// Tạo context với giá trị mặc định là undefined hoặc bạn có thể cung cấp giá trị khởi tạo nếu muốn
const SongContext = createContext<SongContextType | undefined>(undefined);

export const useSong = () => {
  const context = useContext(SongContext);
  if (context === undefined) {
    throw new Error("useSong must be used within a SongProvider");
  }
  return context;
};

type SongProviderProps = {
  children: ReactNode;
};

// Tạo SongProvider component
export const SongProvider = ({ children }: SongProviderProps) => {
  const accessToken = localStorage.getItem("access_token");
  const [songPlaying, setSongPlaying] = useState<SongType | null>(null);

  // Get playing song data
  useEffect(() => {
    let intervalId: NodeJS.Timeout;
    const fetchCurrentlyPlaying = () => {
      if (accessToken) {
        const fetchParam = {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + accessToken,
          },
        };
        fetch(
          "https://api.spotify.com/v1/me/player/currently-playing",
          fetchParam
        )
          .then((response) => response.json())
          .then((data) => {
            if (data && data.item) {
              setSongPlaying(data.item);
            }
          })
          .catch(() => console.log("can't get song playing"));
      }
    };
    fetchCurrentlyPlaying();
    intervalId = setInterval(fetchCurrentlyPlaying, 1000);
    return () => clearInterval(intervalId);
  }, [accessToken]);

  return (
    <SongContext.Provider value={{ songPlaying, setSongPlaying }}>
      {children}
    </SongContext.Provider>
  );
};
