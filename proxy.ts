import { clerkMiddleware } from "@clerk/nextjs/server";

const handler = clerkMiddleware(async (auth, request) => {
  const url = new URL(request.url);
  const pathname = url.pathname;

  const isPublicRoute =
    pathname.startsWith("/sign-in") || pathname.startsWith("/sign-up");

  if (!isPublicRoute) {
    await auth.protect();
  }
});

export { handler as proxy };

export const config = {
  matcher: [
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    "/(api|trpc)(.*)",
    "/__clerk/:path*",
  ],
};
