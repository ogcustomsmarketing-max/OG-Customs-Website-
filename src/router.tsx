import { QueryClient } from "@tanstack/react-query";
import { createRouter } from "@tanstack/react-router";
import { routeTree } from "./routeTree.gen";

export const getRouter = () => {
  const queryClient = new QueryClient();

  const router = createRouter({
    routeTree,
    context: { queryClient },
    // Vite serves this app under `base` (see vite.config.ts) — e.g.
    // "/OG-Customs-Website-/" on GitHub Pages, not "/". Without this,
    // the router matches the raw URL against route "/" and always misses,
    // landing on the 404 page. import.meta.env.BASE_URL always mirrors
    // vite.config.ts's `base`, so the two can't drift apart.
    basepath: import.meta.env.BASE_URL,
    scrollRestoration: true,
    defaultPreloadStaleTime: 0,
  });

  return router;
};

declare module "@tanstack/react-router" {
  interface Register {
    router: ReturnType<typeof getRouter>;
  }
}
