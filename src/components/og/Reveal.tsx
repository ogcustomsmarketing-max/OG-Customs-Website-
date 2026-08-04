import { useEffect, useRef, type ReactNode } from "react";
import type { MouseEvent } from "react";

// ---------------------------------------------------------------------------
// Reveal — fade + slide up via IntersectionObserver + CSS transitions
// ---------------------------------------------------------------------------

export function Reveal({
  children,
  className,
  delay = 0,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    el.style.opacity = "0";
    el.style.transform = "translateY(28px)";
    el.style.filter = "blur(6px)";
    el.style.transition = `opacity 0.9s ease, transform 0.9s ease, filter 0.9s ease`;
    el.style.transitionDelay = `${delay}s`;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.style.opacity = "1";
          el.style.transform = "translateY(0)";
          el.style.filter = "blur(0px)";
          observer.disconnect();
        }
      },
      { rootMargin: "-80px" },
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [delay]);

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}

// ---------------------------------------------------------------------------
// Constants
// ---------------------------------------------------------------------------

export const WHATSAPP_NUMBER = "918105139791";
export const WHATSAPP_DISPLAY = "+91 81051 39791";
export const EMAIL = "ogcustomsmarketing@gmail.com";
export const INSTAGRAM_URL = "https://www.instagram.com/og_customs.blr/";
export const INSTAGRAM_HANDLE = "@og_customs.blr";

export const WHATSAPP_URL =
  `https://wa.me/${WHATSAPP_NUMBER}?text=` +
  encodeURIComponent("Hi OG Customs, I'd like to book an inspection for my car.");

export function whatsappLink(message: string) {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}

/**
 * Opens an external URL in a new tab, falling back to a top-level navigation
 * when the popup is blocked (e.g. inside a sandboxed preview iframe).
 */
export function openExternal(url: string) {
  return (e: MouseEvent) => {
    e.preventDefault();
    const win = window.open(url, "_blank", "noopener,noreferrer");
    if (!win) {
      try {
        (window.top ?? window).location.href = url;
      } catch {
        window.location.href = url;
      }
    }
  };
}

export function CtaButton({
  href,
  children,
  variant = "gold",
  className = "",
}: {
  href: string;
  children: ReactNode;
  variant?: "gold" | "ghost";
  className?: string;
}) {
  const base =
    "group inline-flex items-center justify-center gap-2 rounded-md px-7 py-3.5 text-sm font-semibold tracking-wide transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring";
  const styles =
    variant === "gold"
      ? "bg-[image:var(--gradient-gold)] text-primary-foreground shadow-[var(--shadow-glow)] hover:brightness-110 hover:-translate-y-0.5"
      : "border border-border bg-background/30 text-foreground backdrop-blur-sm hover:border-gold/50 hover:bg-graphite/60 hover:-translate-y-0.5";
  return (
    <a
      href={href}
      target={href.startsWith("http") ? "_blank" : undefined}
      rel={href.startsWith("http") ? "noreferrer" : undefined}
      className={`${base} ${styles} ${className}`}
    >
      {children}
    </a>
  );
}

export function SectionHeading({
  eyebrow,
  title,
  intro,
  align = "left",
}: {
  eyebrow: string;
  title: ReactNode;
  intro?: string;
  align?: "left" | "center";
}) {
  return (
    <div className={align === "center" ? "mx-auto max-w-2xl text-center" : "max-w-2xl"}>
      <Reveal>
        <p className="eyebrow">{eyebrow}</p>
      </Reveal>
      <Reveal delay={0.08}>
        <h2 className="mt-5 text-3xl leading-[1.1] font-semibold text-balance sm:text-4xl md:text-5xl">
          {title}
        </h2>
      </Reveal>
      {intro ? (
        <Reveal delay={0.14}>
          <p className="mt-5 text-base leading-relaxed text-muted-foreground sm:text-lg">{intro}</p>
        </Reveal>
      ) : null}
    </div>
  );
}
