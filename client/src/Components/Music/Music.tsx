import React from "react";
import AlbumList from "./AlbumList";
import SongList from "./SongList";
import { Link } from "react-router-dom";
interface DataType {
  given_name: string;
  picture: string;
}
interface userDataType {
  data: DataType;
}
function Music() {
  const userInforJSON = localStorage.getItem("userData");
  let userInfor: userDataType | null = null;

  // Kiểm tra và parse JSON
  if (userInforJSON) {
    try {
      userInfor = JSON.parse(userInforJSON);
    } catch (e) {
      console.error("Parsing error:", e);
    }
  }
  //
  return (
    // bg-[#1d1f1f]
    <div className="absolute top-[3em] right-0 w-[85vw] min-h-[100vh] bg-[#1d1f1f]">
      <div className="flex justify-between items-center lg:w-[99.5%] 2xl:w-[93.5%]">
        <div className="font-bold float-left text-[2em] ml-10 mt-10 text-green-700">
          Home
        </div>
        <Link to={`/UserPage`} className="mr-10 mt-12">
          <div
            style={{
              backgroundImage: `url(${
                userInfor
                  ? userInfor.data.picture
                  : "https://upload.wikimedia.org/wikipedia/commons/9/99/Sample_User_Icon.png"
              })`,
            }}
            className="w-[2.5em] h-[2.5em] bg-cover rounded-full bg-white"
          ></div>
        </Link>
      </div>
      <AlbumList />
      <SongList info="jvke" title="JVKE" />
      <SongList info="sza" title="SZA" />
      <SongList info="juice wrld" title="JUICE WRLD" />
    </div>
  );
}

export default Music;
