import React from "react";
import { Link } from "react-router-dom";

interface SearchResultsProps {
  key: "number";
  id:string;
  poster: string;
  title: string;
  type: string;
  artist: string;
  status: string;
  artistmode: string;
  to:string
}

const SearchResults: React.FC<SearchResultsProps> = ({
  id,
  poster,
  title,
  type,
  artist,
  status,
  artistmode,
  to
}) => {
  return (
    <div
      className={`${status} cursor-pointer hover:bg-green-700 border-t-[0.1em] border-[#20582d] `}
    >
      <div className="p-1 flex">
        <Link
          className="absolute right-0 w-full h-[4em] z-10"
          to={`/${to}/${id}`}
        >
        </Link>
        {/* Poster */}
        <div
          style={{ backgroundImage: `url(${poster})` }}
          className={`bg-black w-[20%] h-[3.5em] bg-contain ${artistmode}`}
        ></div>
        {/* Information */}
        <div className="w-[75%] h-[2em] mt-2 ml-3 items-center text-[0.8em]">
          {/* Title */}
          <div className="w-[100%] leading-1 font-bold text-left truncate text-ellipsis overflow-hidden">
            {title}
          </div>
          {/* Type and artist */}
          <div className="flex w-full">
            <div className="mr-4">{type}</div>
            <div className="truncate text-ellipsis overflow-hidden">
              {artist}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchResults;
