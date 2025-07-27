import type { IconType } from "react-icons";
import { FaGoogle, FaSpotify } from "react-icons/fa";

export enum Providers {
    Google = "google",
    Spotify = "spotify",
}

export const providers: Record<
    Providers,
    { name: string; icon: IconType; scopes: Array<string> }
> = {
    [Providers.Google]: {
        name: "Google",
        icon: FaGoogle,
        scopes: [],
    },
    [Providers.Spotify]: {
        name: "Spotify",
        icon: FaSpotify,
        scopes: [
            "playlist-read-private",
            // "playlist-read-collaborative",
            "playlist-modify-private",
            // "playlist-modify-public",
        ],
    },
};
