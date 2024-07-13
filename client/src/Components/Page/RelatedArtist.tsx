import React from "react";
import { Link } from "react-router-dom";

interface Pop {
  images: string;
  name: string;
  id: string;
}

const RelatedArtist: React.FC<Pop> = ({ images, name, id }) => {
  return (
    <div>
      <div
        style={{ backgroundImage: `url(${images})` }}
        className="group mb-3 w-[8vw] h-[15vh] rounded-full bg-cover bg-center"
      >
        <div className="bg-black w-full h-full rounded-full group-hover:block group-hover:bg-opacity-35 relative hidden">
          <Link
            className="absolute left-0 w-full h-full rounded-full"
            to={`/ArtistPage/${id}`}
          ></Link>
        </div>
      </div>
      <div className="text-[0.8em]">{name}</div>
    </div>
  );
};

export default RelatedArtist;
