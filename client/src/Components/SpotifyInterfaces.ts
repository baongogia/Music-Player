export interface InfoType {
  info: string;
  title: string;
}
export interface ArrowProps {
  onClick: React.MouseEventHandler<HTMLDivElement>;
}
export interface ArtistType {
  name: string;
  images: ImageType[];
}
export interface ImageType {
  url: string;
}
export interface AlbumType {
  images: ImageType[];
  release_date: string;
  total_tracks: number;
  name: string;
  artists: ArtistType[];
}
export interface SongType {
  id: "number";
  name: string;
  title: string;
  artists: ArtistType[];
  album: AlbumType;
  uri: string;
  duration_ms:number
}
export interface ArtistAlbumType {
  id: "number";
  name: string;
  title: string;
  artists: ArtistType[];
  images: ImageType[];
  uri: string;
}
export interface RelatedArtistProps {
  id: string;
  images: ImageType[];
  name: string;
}

export interface albumPlayType {
  id: "number";
  name: string;
  title: string;
  artists: ArtistType[];
  images: ImageType[];
  release_date: string;
  uri: string;
  href: string;
}
export interface DeviceType {
  id: string;
  is_active: boolean;
}

export interface ArtistInforType {
  images: ImageType[];
  name: string;
}
export interface TopSongType {
  album: albumPlayType;
  name: string;
  type: string;
  uri: string;
}
