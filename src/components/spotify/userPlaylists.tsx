import type { Page, Playlist, TrackItem } from "@spotify/web-api-ts-sdk";

export const SpotifyUserPlaylists: React.FC<{
    playlists: Page<Playlist<TrackItem>>;
}> = ({ playlists }) => {
    return (
        <a
            href={`data:application/json,${JSON.stringify(playlists)}`}
            target="_"
        >
            Bingo bong
        </a>
    );
};
