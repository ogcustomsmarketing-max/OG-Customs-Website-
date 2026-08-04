import { useEffect, useRef } from "react";
import heroCar from "@/assets/hero-car.jpg";

export function Hero() {
  const bgRef = useRef<HTMLDivElement>(null);

  // Lightweight CSS parallax via scroll listener — no extra deps needed.
  useEffect(() => {
    const onScroll = () => {
      if (!bgRef.current) return;
      const y = window.scrollY * 0.17;
      bgRef.current.style.transform = `translateY(${y}px)`;
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <section id="top" className="relative isolate min-h-[92svh] overflow-hidden">
      <div ref={bgRef} className="absolute inset-0 -z-10 scale-105">
        <img
          src={heroCar}
          alt="A glossy black luxury car inside the OG Customs detailing studio in Bangalore"
          className="h-full w-full object-cover object-center"
        />
      </div>

      <div
        className="absolute inset-0 -z-10"
        style={{ background: "var(--gradient-veil)" }}
        aria-hidden
      />
      <div
        className="animate-sheen absolute inset-x-0 top-1/3 -z-10 h-64 blur-3xl"
        style={{
          background:
            "radial-gradient(60% 100% at 50% 50%, color-mix(in oklab, var(--gold) 22%, transparent), transparent 70%)",
        }}
        aria-hidden
      />

      <div className="mx-auto flex min-h-[92svh] max-w-7xl flex-col justify-end px-5 pt-32 pb-16 sm:px-8 sm:pb-24">
        <div className="max-w-3xl" style={{ animation: "hero-fade-in 1s ease both 0.1s" }}>
          <h1
            className="text-4xl leading-[1.03] font-semibold text-balance sm:text-6xl lg:text-7xl"
            style={{ animation: "hero-slide-up 1s cubic-bezier(0.16,1,0.3,1) both 0.1s" }}
          >
            Your car doesn't need a wash.{" "}
            <span className="text-gold-gradient">It needs proper care.</span>
          </h1>

          <p
            className="mt-6 max-w-xl text-base leading-relaxed text-muted-foreground sm:text-lg"
            style={{ animation: "hero-slide-up 1s cubic-bezier(0.16,1,0.3,1) both 0.22s" }}
          >
            A detailing studio in Domlur, Bangalore — for cars and bikes. Ceramic coating, paint
            correction, PPF and interior work, done by hand, checked before we quote, built to
            survive city roads.
          </p>
        </div>
      </div>

      <style>{`
        @keyframes hero-slide-up {
          from { opacity: 0; transform: translateY(30px); }
          to   { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </section>
  );
}
