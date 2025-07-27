import { betterAuth } from "better-auth";

import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { db } from "@/db";
import { providers } from "./globals";

export const auth = betterAuth({
    database: drizzleAdapter(db, {
        provider: "pg",
    }),

    emailAndPassword: {
        enabled: false,
    },

    socialProviders: {
        google: {
            clientId: import.meta.env.GOOGLE_CLIENT_ID,
            clientSecret: import.meta.env.GOOGLE_CLIENT_SECRET,
        },
        spotify: {
            clientId: import.meta.env.SPOTIFY_CLIENT_ID,
            clientSecret: import.meta.env.SPOTIFY_CLIENT_SECRET,
        },
    },

    account: {
        accountLinking: {
            allowDifferentEmails: true,
            trustedProviders: Object.keys(providers),
            enabled: true,
        },
    },

    secret: import.meta.env.BETTER_AUTH_SECRET,
    baseURL: import.meta.env.BETTER_AUTH_URL,

    session: {
        cookieCache: {
            enabled: true,
            maxAge: 60 * 60 * 24, // 1 day
        },
    },
});
