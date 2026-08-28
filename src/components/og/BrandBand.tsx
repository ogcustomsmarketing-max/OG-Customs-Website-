import benelli from "@/assets/brands/benelli.png";
import river from "@/assets/brands/river.png";
import ultraviolette from "@/assets/brands/ultraviolette.png";
import audi from "@/assets/brands/audi.png";
import bajaj from "@/assets/brands/bajaj.png";
import bmw from "@/assets/brands/bmw-flat.png";
import hero from "@/assets/brands/hero.png";
import honda from "@/assets/brands/honda.png";
import hyundai from "@/assets/brands/hyundai.png";
import jeep from "@/assets/brands/jeep.png";
import kawasaki from "@/assets/brands/kawasaki.png";
import kia from "@/assets/brands/kia.png";
import ktm from "@/assets/brands/ktm.png";
import mahindra from "@/assets/brands/mahindra.png";
import mercedes from "@/assets/brands/mercedes.png";
import porsche from "@/assets/brands/porsche.png";
import royalEnfield from "@/assets/brands/royal_enfield.png";
import suzuki from "@/assets/brands/suzuki.png";
import tata from "@/assets/brands/tata.png";
import toyota from "@/assets/brands/toyota.png";
import triumph from "@/assets/brands/triumph.png";
import tvs from "@/assets/brands/tvs.png";
import volkswagen from "@/assets/brands/volkswagen.png";

// tone: "silhouette" = fill dark marks white, "soft" = keep transparency, "plain" = already white
// scale: optical trim factor -- nudges logos that carry extra internal whitespace.
// Kawasaki is the reference mark: every logo is sized to sit in the same optical box.
const brands: { name: string; src: string; tone?: "silhouette" | "soft" | "plain" | "detail" | "invert"; scale?: number }[] = [
  { name: "Jeep", src: jeep },
  { name: "Honda", src: honda },
  { name: "Hyundai", src: hyundai },
  { name: "Kia", src: kia },
  { name: "Maruti Suzuki", src: suzuki },
  { name: "Tata", src: tata },
  { name: "Mahindra", src: mahindra },
  { name: "Toyota", src: toyota, tone: "plain" },
  { name: "Royal Enfield", src: royalEnfield },
  { name: "TVS", src: tvs, tone: "plain" },
  { name: "Hero", src: hero, tone: "plain" },
  { name: "Bajaj", src: bajaj, tone: "plain" },
  { name: "KTM", src: ktm, tone: "plain" },
  { name: "Kawasaki", src: kawasaki, tone: "plain" },
  { name: "Triumph", src: triumph, tone: "plain" },
  { name: "Benelli", src: benelli, tone: "invert" },
  { name: "Ultraviolette", src: ultraviolette },
  { name: "River", src: river, tone: "detail" },
  { name: "Audi", src: audi },
  { name: "BMW", src: bmw, tone: "detail", scale: 0.95 },
  { name: "Mercedes-Benz", src: mercedes, tone: "soft" },
  { name: "Porsche", src: porsche, tone: "detail", scale: 1.05 },
  { name: "Volkswagen", src: volkswagen },
];

const filters: Record<string, string> = {
  silhouette: "[filter:brightness(0)_invert(1)]",
  soft: "[filter:grayscale(1)_brightness(2.2)]",
  plain: "",
  detail: "[filter:grayscale(1)_brightness(1.5)]",
  invert: "[filter:grayscale(1)_invert(1)_brightness(1.15)]",
};

export function BrandBand() {
  return (
    <section
      aria-label="Vehicle brands we look after"
      className="relative border-y border-border bg-charcoal/40 py-7 sm:py-9"
    >
      <p className="mb-5 text-center text-[0.65rem] uppercase tracking-[0.24em] text-muted-foreground sm:mb-6 sm:text-xs">
        Brands we worked on
      </p>
      <div className="relative overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_8%,black_92%,transparent)]">
        <div className="flex w-max animate-brand-marquee items-center">
          {[...brands, ...brands].map((b, i) => (
            <span
              key={`${b.name}-${i}`}
              className="flex h-9 w-[108px] shrink-0 items-center justify-center px-3 sm:h-12 sm:w-[150px] sm:px-5"
            >
              <img
                src={b.src}
                alt={`${b.name} logo`}
                loading="lazy"
                style={b.scale ? { transform: `scale(${b.scale})` } : undefined}
                className={`max-h-full max-w-full object-contain opacity-60 transition-opacity duration-300 hover:opacity-100 ${filters[b.tone ?? "silhouette"]}`}
              />
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
