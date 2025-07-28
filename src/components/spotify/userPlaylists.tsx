import type { Page, Playlist, TrackItem } from "@spotify/web-api-ts-sdk";
import { type ColumnDef } from "@tanstack/react-table";
import { navigate } from "astro/virtual-modules/transitions-router.js";
import { useMemo } from "react";
import {
    PaginatedDataTable,
    type PaginatedDataTableProps,
} from "../ui/paginated-data-table";
import { SpotifyPlaylistImage } from "./playlistImage";

const columns: ColumnDef<Playlist<TrackItem>>[] = [
    {
        accessorKey: "images",
        cell: (info) => (
            <div className="size-20">
                <SpotifyPlaylistImage
                    images={info.getValue() as Playlist<TrackItem>["images"]}
                    alt={info.row.getValue("name") as string}
                />
            </div>
        ),
        minSize: 0,
        size: 0,
    },
    {
        accessorKey: "name",
        cell: (info) => <div>{info.getValue() as string}</div>,
    },
];

export const SpotifyUserPlaylists: React.FC<{
    playlists: Page<Playlist<TrackItem>>;
    pagination: PaginatedDataTableProps<Playlist<TrackItem>>["pagination"];
}> = ({ playlists, pagination }) => {
    const data = useMemo(() => playlists.items, [playlists]);

    console.log(data);
    return (
        <PaginatedDataTable
            data={data}
            columns={columns}
            pagination={pagination}
            setPagination={(updater) => {
                let val;
                if (updater instanceof Function) {
                    val = updater(pagination);
                } else {
                    val = updater;
                }
                navigate(`?page=${val.pageIndex}`);
            }}
        />
    );
};
