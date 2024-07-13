/// <reference types="react-scripts" />
declare global {
    namespace JSX {
      interface IntrinsicElements {
        "ion-icon": React.DetailedHTMLProps<
          React.HTMLAttributes<HTMLElement>,
          HTMLElement
        >;
      }
    }
  }
  
  declare module 'path/to/spotify-player-module' {
    interface SpotifyPlayer {
      getCurrentState: () => Promise<any>;
    }
  }
  
  declare global {
    interface Window {
      onSpotifyWebPlaybackSDKReady: () => void;
      Spotify: typeof Spotify;
    }
  }
  
  declare namespace Spotify {
    interface SpotifyPlayer {
      // Declare all the methods and properties you expect the player to have
      connect(): Promise<boolean>;
      disconnect(): void;
      // ... and so on
    }
  
    declare module "lyrics-finder" {
      export default function (artist: string, track: string): Promise<string>;
    }
  }
  