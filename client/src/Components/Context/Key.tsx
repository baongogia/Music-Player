import { useState, useEffect } from "react";
import axios from "axios";

export default function useAuth() {
  const code = localStorage.getItem("code");
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const [refreshToken, setRefreshToken] = useState<string | null>(null);
  const [expiresIn, setExpiresIn] = useState<number | null>(null);

  useEffect(() => {
    axios
      .post("http://localhost:3001/login", {
        code,
      })
      .then((res) => {
        setAccessToken(res.data.accessToken);
        setRefreshToken(res.data.refreshToken);
        setExpiresIn(res.data.expiresIn);
        localStorage.setItem("access_token", res.data.accessToken);
        window.history.pushState({}, "", "/");
      })
      .catch(() => {});
  }, [code]);

  useEffect(() => {
    if (!refreshToken || !expiresIn) return;
    const interval = setInterval(() => {
      axios
        .post("http://localhost:3001/refresh", {
          refreshToken,
        })
        .then((res) => {
          setAccessToken(res.data.accessToken);
          setExpiresIn(res.data.expiresIn);
        })
        .catch(() => {});
    }, (expiresIn - 60) * 1000);

    return () => clearInterval(interval);
  }, [refreshToken, expiresIn]);

  return accessToken;
}
