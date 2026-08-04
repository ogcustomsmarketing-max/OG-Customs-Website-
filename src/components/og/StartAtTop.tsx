import { useEffect } from "react";

/**
 * On a fresh page load or reload, always start at the top of the page —
 * never at a leftover #hash from a previous in-page navigation.
 */
export function StartAtTop() {
  useEffect(() => {
    if (typeof window === "undefined") return;
    if (window.location.hash) {
      window.history.replaceState(null, "", window.location.pathname + window.location.search);
    }
    // Run after the browser's own restoration/hash scroll.
    const id = window.requestAnimationFrame(() => window.scrollTo(0, 0));
    return () => window.cancelAnimationFrame(id);
  }, []);

  return null;
}
