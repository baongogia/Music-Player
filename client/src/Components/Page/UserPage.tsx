import { IonIcon } from "@ionic/react";
import { chevronBackOutline } from "ionicons/icons";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
interface user {
  picture: string;
  given_name: string;
  email: string;
}
export default function UserPage() {
  const [userData, setUserData] = useState<user>();
  const [currentPlaying, setCurrentPlaying] = useState();
  const accessToken = localStorage.getItem('access_token');
  const navigate = useNavigate();
  //   Get user data
  useEffect(() => {
    const userDataString = localStorage.getItem("userData");
    if (userDataString) {
      const userData = JSON.parse(userDataString);
      setUserData(userData.data);
    } else {
      console.log("No user data found in localStorage");
    }
  }, []);
  //   Get current playing
  useEffect(() => {
    if (accessToken) {
      const fetchParam = {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + accessToken,
        },
      };

      fetch(
        `https://api.spotify.com/v1/me/player/currently-playing`,
        fetchParam
      )
        .then((response) => {
          if (!response.ok) {
            throw new Error("Response not okay");
          }
          return response.json();
        })
        .then((data) => {
            console.log({data});
        })
        .catch(() => console.log("Can't get data"));
    }
  }, [accessToken]);

  return (
    <div className="relative top-0 left-[8.8%] mt-[3em] w-[84.15vw] min-h-[100vh] bg-[#1d1f1f]">
      {/* Go back */}
      <div
        className="relative float-left mt-2 ml-2 cursor-pointer"
        onClick={() => navigate(-1)}
      >
        <IonIcon size="large" icon={chevronBackOutline} />
      </div>
      {/* User background */}
      <div
        style={{ backgroundImage: `url(${userData?.picture})` }}
        className="absolute top-10 w-full h-[50%] bg-cover bg-center bg-no-repeat"
      ></div>
      <div
        style={{ backdropFilter: "blur(2em)" }}
        className="absolute top-10 w-full h-[50%] bg-black bg-opacity-10"
      >
        <div
          style={{ backgroundImage: `url(${userData?.picture})` }}
          className="absolute left-[42%] top-28 w-48 h-48 rounded-full bg-cover bg-center bg-no-repeat"
        ></div>
        {/* User infor */}
        <div className="absolute bottom-10 left-8 text-[2em] font-bold">
          {userData?.given_name}
        </div>
        <div className="absolute bottom-4 left-8 text-[1.3em] font-bold text-gray-300">
          {userData?.email}
        </div>
        {/* User listening */}
        
      </div>
    </div>
  );
}
