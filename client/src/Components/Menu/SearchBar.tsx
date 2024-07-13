import { useCallback, useState } from "react";
import SearchResults from "./SearchResults";
import React from "react";
import { IonIcon } from "@ionic/react";
import { searchOutline } from "ionicons/icons";
import { Link } from "react-router-dom";

// Interface
interface ArtistType {
  name: string;
}
interface ImageType {
  url: string;
}
interface SuggestType {
  name: string;
  id: string;
}
interface miniAlbumType {
  images: ImageType[];
}
interface albumType {
  id: "number";
  name: string;
  title: string;
  artists: ArtistType[];
  images: ImageType[];
  type: string;
}
interface songType {
  id: "number";
  name: string;
  title: string;
  artists: ArtistType[];
  images: ImageType[];
  type: string;
  album: miniAlbumType;
}
interface artistType {
  id: "number";
  name: string;
  title: string;
  artists: ArtistType[];
  images: ImageType[];
  type: string;
  album: miniAlbumType;
}
function debounce<F extends (...args: never[]) => void>(
  func: F,
  waitFor: number
) {
  let timeoutId: NodeJS.Timeout | null = null;

  const debounced = (...args: Parameters<F>) => {
    if (timeoutId !== null) {
      clearTimeout(timeoutId);
    }
    timeoutId = setTimeout(() => func(...args), waitFor);
  };

  debounced.cancel = () => {
    if (timeoutId !== null) {
      clearTimeout(timeoutId);
    }
  };

  return debounced;
}
// SearchBar function component
const SearchBar: React.FC = () => {
  const [searchInput, setSearchInput] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [albums, setAlbums] = useState([]);
  const [songs, setSongs] = useState([]);
  const [artists, setArtists] = useState<artistType | undefined>();
  const [showResults, setShowResults] = useState("hidden");
  const [artistPoster, setArtistPoster] = useState([]);
  const handleBlur = () => {
    // Đặt một timeout trước khi ẩn kết quả
    setTimeout(() => setShowResults("hidden"), 1000);
  };

  // Get access-token
  const accessToken = localStorage.getItem("access_token");
  // search function
  const search = useCallback(
    (searchInput: string) => {
      const searchParam = {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + accessToken,
        },
      };
      //  suggestions artists
      fetch(
        "https://api.spotify.com/v1/search?q=" +
          searchInput +
          "&type=artist&market=US&limit=3",
        searchParam
      )
        .then((response) => response.json())
        .then((data) => {
          setSuggestions(data.artists.items);
        })
        .catch((error) => console.log("nono"));

      // Get first artist
      fetch(
        `https://api.spotify.com/v1/search?q=${searchInput}&type=artist`,
        searchParam
      )
        .then((response) => response.json())
        .then((data) => {
          setArtistPoster(data.artists.items[0].images[0].url);
          setArtists(data.artists.items[0]);
        })
        .catch((error) => console.log("nono"));
      // Get artist album
      fetch(
        "https://api.spotify.com/v1/search?q=" +
          searchInput +
          "&type=album&market=US&limit=4",
        searchParam
      )
        .then((response) => response.json())
        .then((data) => {
          setAlbums(data.albums.items);
        })
        .catch((error) => console.log("nono"));

      // Get song contain search value
      fetch(
        "https://api.spotify.com/v1/search?q=" +
          searchInput +
          "&type=track&market=US&limit=4",
        searchParam
      )
        .then((response) => response.json())
        .then((data) => {
          setSongs(data.tracks.items);
        })
        .catch((error) => console.log("nono"));
    },
    [accessToken]
  );
  // Set time out
  const debouncedSearch = useCallback(
    debounce((searchInput: string) => search(searchInput), 500),
    [search]
  );
  // Handle change
  const handleSearchInputChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const { value } = event.target;
    setSearchInput(value);

    if (value.trim() === "") {
      // Clear search results if input is empty
      setArtists(undefined);
      setAlbums([]);
      setSongs([]);
      setShowResults("hidden");
    } else {
      debouncedSearch(value);
      // Show results when there's a search input
      setShowResults("block");
    }
  };
  // Search bar UI
  return (
    <div className="mt-14">
      {/* Search icon */}
      <div className="absolute left-[1.1em] text-[1.3em] z-10">
        <IonIcon icon={searchOutline} />
      </div>
      {/* Search bar */}
      <input
        type="search"
        placeholder="Search"
        className="rounded-md indent-7 shadow-sm shadow-white relative outline-none"
        onChange={handleSearchInputChange}
        onBlur={() => handleBlur()}
      />
      {/* Search results */}
      <div
        style={{
          backgroundColor: "rgba(22, 39, 18, 0.403)",
          backdropFilter: "blur(10em)",
        }}
        className={`w-[18em] max-h-[100vh] ml-5 mt-1 rounded-sm border-solid border-[#555756] border-[0.1em] ${showResults}`}
      >
        {/* Suggestions */}
        {suggestions && suggestions.length > 0 ? (
          suggestions.map((suggestion: SuggestType, index: number) => (
            <div
              key={index}
              className={`relative flex items-center ml-2 hover:bg-green-700 cursor-pointer ${showResults}`}
            >
              <IonIcon icon={searchOutline} />
              <div className="ml-2 text-[0.8em]">{suggestion.name}</div>
              <Link className="absolute w-full h-full" to={`/ArtistPage/${suggestion.id}`}></Link>
            </div>
          ))
        ) : (
          <div className=""></div>
        )}
        {/* Artist search results */}
        {artists ? (
          <SearchResults
            id={artists.id}
            key={artists.id}
            poster={`${artistPoster}`}
            title={artists.name}
            type={"Artist"}
            artist={""}
            status={showResults}
            artistmode={"rounded-full"}
            to="ArtistPage"
          />
        ) : (
          <div className=""></div>
        )}
        {/* Albums search results */}
        {albums && albums.length > 0 ? (
          albums.map((album: albumType) => (
            <SearchResults
              id={album.id}
              key={album.id}
              poster={album.images[1].url}
              title={album.name}
              type={"Album"}
              artist={album.artists[0].name}
              status={showResults}
              artistmode="rouned-sm"
              to="AlbumPage"
            />
          ))
        ) : (
          <div className=""></div>
        )}
        {/* Songs search results */}
        {songs && songs.length > 0 ? (
          songs.map((song: songType) => (
            <SearchResults
              id={song.id}
              key={song.id}
              poster={song.album.images[1].url}
              title={song.name}
              type={"Song"}
              artist={song.artists.map((artist) => artist.name).join(", ")}
              status={showResults}
              artistmode={"rounded-sm"}
              to="Songpage"
            />
          ))
        ) : (
          <div className=""></div>
        )}
      </div>
    </div>
  );
};

export default SearchBar;
