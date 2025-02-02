import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";

// const isProtectedRoute = createRouteMatcher("/user-profile");
const isPublicRoute = createRouteMatcher(["/", "/sign-in(.*)", "/sign-up(.*)"]);
export default clerkMiddleware(async (auth, req) => {
  const { userId, redirectToSignIn } = await auth();
  // if (isProtectedRoute(req)) await auth.protect();
  // if (!isPublicRoute(req)) await auth.protect();
  if (!userId && !isPublicRoute) {
    // add custom logic to run before redirecting to sign-in
    return redirectToSignIn();
  }
});

export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    // Always run for API routes
    "/(api|trpc)(.*)",
  ],
};
