import type { APIRoute } from "astro";
import { auth } from "@/lib/auth";

export const prerender = false;

export const ALL: APIRoute = async (ctx) => {
    console.log(ctx.request.method, ctx.request.url);
    return auth.handler(ctx.request);
};
