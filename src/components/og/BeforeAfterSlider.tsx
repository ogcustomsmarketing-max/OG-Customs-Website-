import { useCallback, useEffect, useRef, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import beforeImg from "@/assets/ba-before.jpg";
import afterImg from "@/assets/ba-after.jpg";

export function BeforeAfterSlider({ className = "" }: { className?: string }) {
  const [pos, setPos] = useState(50);
  const [autoPlaying, setAutoPlaying] = useState(true);
  const containerRef = useRef<HTMLDivElement>(null);
  const dragging = useRef(false);
  const interacted = useRef(false);

  const stopAuto = useCallback(() => {
    interacted.current = true;
    setAutoPlaying(false);
  }, []);

  const setFromClientX = useCallback((clientX: number) => {
    const el = containerRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const pct = ((clientX - rect.left) / rect.width) * 100;
    setPos(Math.min(100, Math.max(0, pct)));
  }, []);

  // Auto-demo: sweep the handle so visitors notice it's draggable.
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    if (typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setAutoPlaying(false);
      return;
    }

    let raf = 0;
    let start = 0;
    let stopped = false;
    const CYCLE = 4200; // two seconds each way

    const tick = (t: number) => {
      if (stopped || interacted.current) return;
      if (!start) start = t;
      const p = ((t - start) % CYCLE) / CYCLE;
      // ease in/out sweep 50 -> 22 -> 78 -> 50
      const wave = Math.sin(p * Math.PI * 2);
      setPos(50 + wave * 28);
      raf = requestAnimationFrame(tick);
    };

    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !interacted.current) {
          raf = requestAnimationFrame(tick);
        } else {
          cancelAnimationFrame(raf);
          start = 0;
        }
      },
      { threshold: 0.35 },
    );
    io.observe(el);

    return () => {
      stopped = true;
      cancelAnimationFrame(raf);
      io.disconnect();
    };
  }, []);


  useEffect(() => {
    const move = (e: PointerEvent) => {
      if (!dragging.current) return;
      e.preventDefault();
      setFromClientX(e.clientX);
    };
    const up = () => {
      dragging.current = false;
    };
    window.addEventListener("pointermove", move, { passive: false });
    window.addEventListener("pointerup", up);
    return () => {
      window.removeEventListener("pointermove", move);
      window.removeEventListener("pointerup", up);
    };
  }, [setFromClientX]);

  return (
    <div
      ref={containerRef}
      onPointerDown={(e) => {
        dragging.current = true;
        stopAuto();
        setFromClientX(e.clientX);
      }}

      className={`group relative select-none overflow-hidden rounded-xl border border-border shadow-[var(--shadow-lift)] ${className}`}
    >
      <img
        src={afterImg}
        alt="Same car after paint correction and polishing at OG Customs, showing deep gloss and mirror reflections"
        loading="lazy"
        width={1280}
        height={960}
        draggable={false}
        className="h-full w-full object-cover"
      />

      <div
        className="absolute inset-0 overflow-hidden"
        style={{ clipPath: `inset(0 ${100 - pos}% 0 0)` }}
      >
        <img
          src={beforeImg}
          alt="Car before detailing with dull, swirled and oxidised paint"
          loading="lazy"
          width={1280}
          height={960}
          draggable={false}
          className="h-full w-full object-cover"
        />
      </div>

      <span className="pointer-events-none absolute left-4 top-4 rounded-full border border-border/70 bg-background/70 px-3 py-1 text-[0.65rem] font-semibold uppercase tracking-[0.2em] text-muted-foreground backdrop-blur">
        Before
      </span>
      <span className="pointer-events-none absolute right-4 top-4 rounded-full border border-gold/40 bg-background/70 px-3 py-1 text-[0.65rem] font-semibold uppercase tracking-[0.2em] text-gold backdrop-blur">
        After
      </span>

      <div
        className="pointer-events-none absolute inset-y-0 w-px bg-gold/90 shadow-[0_0_18px_hsl(var(--gold)/0.6)]"
        style={{ left: `${pos}%` }}
      />

      <input
        type="range"
        min={0}
        max={100}
        step={0.1}
        value={pos}
        onChange={(e) => {
          stopAuto();
          setPos(Number(e.target.value));
        }}
        aria-label="Drag to compare before and after detailing"
        className="absolute inset-0 h-full w-full cursor-ew-resize opacity-0"
      />

      <div
        className="pointer-events-none absolute top-1/2 flex h-11 w-11 -translate-x-1/2 -translate-y-1/2 items-center justify-center gap-0.5 rounded-full bg-[image:var(--gradient-gold)] text-primary-foreground shadow-[var(--shadow-glow)]"
        style={{ left: `${pos}%` }}
      >
        <ChevronLeft className="h-4 w-4" strokeWidth={2.5} />
        <ChevronRight className="h-4 w-4" strokeWidth={2.5} />
      </div>

      <span
        className={`pointer-events-none absolute bottom-4 left-1/2 -translate-x-1/2 rounded-full border border-gold/40 bg-background/75 px-3 py-1 text-[0.6rem] font-semibold uppercase tracking-[0.2em] text-gold backdrop-blur transition-opacity duration-500 ${
          autoPlaying ? "opacity-100" : "opacity-0"
        }`}
      >
        Drag to compare
      </span>

    </div>
  );
}
