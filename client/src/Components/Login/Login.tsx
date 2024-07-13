import React from "react";

const Login: React.FC = () => {
  const scopes = [
    "playlist-read-private",
    "user-read-private",
    "user-read-email",
    "streaming",
    "user-read-playback-state",
    "user-modify-playback-state",
    "app-remote-control",
    "user-read-currently-playing",
  ];

  const params = new URLSearchParams({
    response_type: "code",
    client_id: "a2ded5056942407db9066653a1f51a5d",
    scope: scopes.join(" "),
    redirect_uri: "http://localhost:3000",
    state: "music",
  });

  const AUTH_URL = `https://accounts.spotify.com/authorize?${params.toString()}`;

  return (
    <div
      className="bg-black px-16 py-8 rounded-lg group
     hover:bg-green-600 border-green-400 border-dotted border-[0.1em]"
    >
      <a
        href={AUTH_URL}
        className="text-green-700 uppercase font-bold group-hover:text-black"
      >
        Login to Spotify
      </a>
    </div>
  );
};

export default Login;
