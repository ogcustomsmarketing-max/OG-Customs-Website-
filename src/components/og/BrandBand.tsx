const carBrands = [
  "Honda",
  "Hyundai",
  "Maruti Suzuki",
  "Mercedes-Benz",
  "BMW",
  "Volkswagen",
  "Skoda",
  "Kia",
];

const bikeBrands = ["Yamaha", "Royal Enfield", "Hero", "KTM"];

const brands = [...carBrands, ...bikeBrands];

export function BrandBand() {
  return (
    <section
      aria-label="Car and bike brands we work on"
      className="relative border-y border-border bg-charcoal/40 py-7 sm:py-9"
    >
      <p className="mb-5 text-center text-[0.65rem] uppercase tracking-[0.24em] text-muted-foreground sm:text-xs">
        Cars &amp; bikes we look after
      </p>
      <div className="relative overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_8%,black_92%,transparent)]">
        <div className="flex w-max animate-brand-marquee items-center">
          {[...brands, ...brands].map((b, i) => (
            <span
              key={`${b}-${i}`}
              className="flex shrink-0 items-center gap-8 px-8 font-display text-lg font-semibold tracking-[0.08em] whitespace-nowrap text-foreground/55 transition-colors hover:text-gold sm:text-2xl"
            >
              {b}
              <span className="h-1 w-1 rounded-full bg-gold/50" aria-hidden />
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
