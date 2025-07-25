import { auth } from "@/lib/auth";
import { defineMiddleware } from "astro:middleware";

export const onRequest = defineMiddleware(async (context, next) => {
    // If this is request to /api/auth, skip this
    console.log(
        "Middleware running for:",
        context.request.method,
        context.request.url
    );
    if (new URL(context.request.url).pathname.startsWith("/api/auth")) {
        return next();
    }

    const isAuthed = await auth.api.getSession({
        headers: context.request.headers,
    });

    if (isAuthed) {
        context.locals.user = isAuthed.user;
        context.locals.session = isAuthed.session;
    } else {
        context.locals.user = null;
        context.locals.session = null;
    }

    return next();
});
