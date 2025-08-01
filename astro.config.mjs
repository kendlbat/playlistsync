// @ts-check
import { defineConfig } from "astro/config";

import react from "@astrojs/react";

import tailwindcss from "@tailwindcss/vite";

import node from "@astrojs/node";

// https://astro.build/config
export default defineConfig({
    integrations: [
        react({
            experimentalReactChildren: true,
        }),
    ],

    image: {
        domains: [
            "i.scdn.co", // Spotify
        ],
    },

    vite: {
        plugins: [tailwindcss()],
    },

    output: "server",
    adapter: node({
        mode: "standalone",
    }),
});
