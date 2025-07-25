import { auth } from "@/lib/auth";
import type { APIRoute } from "astro";

export const prerender = false;

export const GET: APIRoute = async (ctx) => {
    if (!ctx.locals.session)
        return new Response("Unauthorized", { status: 401 });

    if (!ctx.locals.user) return new Response("No user found", { status: 404 });

    // Get accounts for the user
    const accounts = await auth.api.listUserAccounts({
        headers: ctx.request.headers,
    });

    return new Response(JSON.stringify(accounts), {
        headers: {
            "Content-Type": "application/json",
        },
    });
};
