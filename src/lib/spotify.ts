import { SpotifyApi, type MaxInt } from "@spotify/web-api-ts-sdk";

/**
 * Use this for public stuff - Service Account
 */
export const spotifyApiCC = SpotifyApi.withClientCredentials(
    import.meta.env.SPOTIFY_CLIENT_ID,
    import.meta.env.SPOTIFY_CLIENT_SECRET
);
