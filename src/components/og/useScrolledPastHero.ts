import { useEffect, useState } from "react";

/**
 * True once the visitor has scrolled past the hero into the second section.
 * Used to reveal the floating chat + WhatsApp buttons.
 */
export function useScrolledPastHero() {
  const [past, setPast] = useState(false);

  useEffect(() => {
    const onScroll = () => setPast(window.scrollY > window.innerHeight * 0.7);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return past;
}
