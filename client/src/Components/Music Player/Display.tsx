import React from "react";
import ProgressBar from "./ProcessBar";
import { IonIcon } from "@ionic/react";
import { copyOutline } from "ionicons/icons";
import { useSong } from "./SongContext";
import { PuffLoader } from "react-spinners";

function Display() {
  const handleOpenNewTab = (path: string) => {
    // Lấy code từ localStorage nếu nó đã được lưu
    const code = localStorage.getItem("code");
    // Tạo đường dẫn đầy đủ, bao gồm cả code nếu có
    const urlWithCode = code
      ? `${window.location.origin}${path}?code=${code}`
      : `${window.location.origin}${path}`;
    // Mở URL trong tab mới
    window.open(urlWithCode, "_blank");
  };
  // Get playing song data
  const { songPlaying } = useSong();

  return (
    <div
      style={{ backgroundColor: "rgba(85, 82, 82, 0.5)" }}
      className="relative group backdrop-blur w-[45%] h-[95%] ml-[3em] rounded-md flex overflow-hidden"
    >
      {/* Cover */}
      <div
        style={{
          backgroundImage: `url(${
            songPlaying
              ? songPlaying.album.images[0].url
              : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSd9hv-gk7Gar2bpTNYGskRklmzed4PFLJ29KxEPstl5w&s"
          })`,
        }}
        className="w-[3em] h-[102%] bg-contain bg-center bg-no-repeat"
      ></div>
      <div
        onClick={() => handleOpenNewTab("/MiniPlayer")}
        className="absolute w-[2.83em] h-full bg-black bg-opacity-35 group-hover:block hidden cursor-pointer"
      >
        <div className="w-full h-full flex items-center justify-center">
          <IonIcon icon={copyOutline} />
        </div>
      </div>
      {/* Info */}
      <div className="w-full">
        <div className="h-[2.15em] text-[0.8em] translate-y-1 flex flex-col justify-center items-center">
          <div className="font-bold">{songPlaying ? songPlaying.name : ""}</div>
          <div className="">
            {songPlaying ? (
              songPlaying.artists.map((artist) => artist.name).join(", ")
            ) : (
              <div className="w-full flex justify-center">
                <PuffLoader color="#0c8625" size={40} />
              </div>
            )}
          </div>
        </div>
        {/* Process Bar */}
        <ProgressBar css="ml-2.5 w-[96%]" barcss="" />
      </div>
    </div>
  );
}

export default Display;
