import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import logo from "@/assets/og-customs-logo.png";
import instagramIcon from "@/assets/social/instagram-norm.png";
import youtubeIcon from "@/assets/social/youtube-norm.png";
import facebookIcon from "@/assets/social/facebook-norm.png";
import {
  CtaButton,
  INSTAGRAM_URL,
  INSTAGRAM_HANDLE,
  YOUTUBE_URL,
  FACEBOOK_URL,
  openExternal,
} from "./Reveal";

const socials = [
  { name: "Instagram", url: INSTAGRAM_URL, icon: instagramIcon },
  { name: "YouTube", url: YOUTUBE_URL, icon: youtubeIcon },
  { name: "Facebook", url: FACEBOOK_URL, icon: facebookIcon },
];

const links = [
  { href: "#story", label: "Our Story" },
  { href: "#services", label: "Services" },
  { href: "#care", label: "Why Us" },
  { href: "#gallery", label: "Gallery" },
  { href: "#faq", label: "FAQ" },
];

export function SiteHeader() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
        scrolled
          ? "border-b border-border bg-background/80 backdrop-blur-xl"
          : "border-b border-transparent"
      }`}
    >
      {!scrolled ? (
        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-0 top-0 h-[140%] bg-gradient-to-b from-background/85 via-background/45 to-transparent"
        />
      ) : null}
      <div className="relative mx-auto grid max-w-7xl grid-cols-[minmax(0,1fr)_auto] items-center gap-4 px-5 py-3.5 sm:px-8 lg:grid-cols-[auto_1fr_auto]">
        <a href="#top" className="flex min-w-0 items-center">
          <img
            src={logo}
            alt="OG Customs logo"
            className="h-10 w-auto shrink-0 object-contain sm:h-12"
          />
        </a>


        <nav className="hidden justify-center gap-8 lg:flex" aria-label="Primary">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="text-sm font-medium text-foreground/90 transition-colors hover:text-gold [text-shadow:0_1px_10px_rgb(0_0_0_/_0.8)]"
            >
              {l.label}
            </a>
          ))}
        </nav>


        <div className="flex items-center gap-2">
          {socials.map((s) => (
            <a
              key={s.name}
              href={s.url}
              target="_blank"
              rel="noopener noreferrer"
              onClick={openExternal(s.url)}
              aria-label={`OG Customs on ${s.name}`}
              className="hidden h-9 w-9 place-items-center transition-transform hover:-translate-y-0.5 sm:grid"
            >
              <img src={s.icon} alt={`${s.name} logo`} className="h-7 w-7 object-contain" />
            </a>
          ))}

          <div className="block">
            <CtaButton
              href="#contact"
              className="relative overflow-hidden px-3.5 py-2.5 text-[0.65rem] sm:px-5 sm:text-xs"
            >
              <span className="relative z-10">Get Free Inspection</span>
              <span
                aria-hidden
                className="animate-shine pointer-events-none absolute inset-y-0 left-0 z-0 w-1/3 bg-gradient-to-r from-transparent via-white/60 to-transparent"
              />
            </CtaButton>
          </div>
          <button
            type="button"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
            className="grid h-11 w-11 shrink-0 place-items-center rounded-md border border-border bg-background/60 text-foreground backdrop-blur-md lg:hidden"
          >

            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>

      </div>

      {open ? (
        <div className="border-t border-border bg-background/95 px-5 py-4 backdrop-blur-xl lg:hidden">
          <nav className="flex flex-col gap-1" aria-label="Mobile">
            {links.map((l) => (
              <a
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                className="py-2.5 text-base text-muted-foreground"
              >
                {l.label}
              </a>
            ))}
            <div className="flex items-center gap-3 py-2.5">
              {socials.map((s) => (
                <a
                  key={s.name}
                  href={s.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={(e) => {
                    setOpen(false);
                    openExternal(s.url)(e);
                  }}
                  aria-label={`OG Customs on ${s.name}`}
                  className="grid h-10 w-10 place-items-center"
                >
                  <img src={s.icon} alt={`${s.name} logo`} className="h-6 w-6 object-contain" />
                </a>
              ))}
              <span className="text-sm text-muted-foreground">{INSTAGRAM_HANDLE}</span>
            </div>
            <CtaButton href="#contact" className="mt-3 w-full">
              Get Free Inspection
            </CtaButton>

          </nav>

        </div>
      ) : null}
    </header>
  );
}
