import { ArrowRight, BadgeCheck } from "lucide-react";
import { CtaButton } from "./Reveal";
import { pickService } from "@/lib/service-select";

import svcPpfAsset from "@/assets/services/svc-paint_protection_film.jpeg";
import svcCeramicAsset from "@/assets/services/svc-ceramic_coating.jpeg";
import svcSunfilmAsset from "@/assets/services/svc-sun_film.jpeg";
import svcCorrectionAsset from "@/assets/services/svc-paint_restoration.jpeg";
import svcOtherAsset from "@/assets/services/svc-other_services.png";
import svcWashAsset from "@/assets/services/svc-wash_and_maintenance_care.jpeg";
import storyImg from "@/assets/archit.jpg";
import evofilms from "@/assets/partners/evofilms.png";
import artdeshine from "@/assets/partners/artdeshine.png";
import rupes from "@/assets/partners/rupes-red.png";
import shinemate from "@/assets/partners/shinemate.png";
import stek from "@/assets/partners/stek.png";
import carpro from "@/assets/partners/carpro.png";
import { BeforeAfterSlider } from "./BeforeAfterSlider";
import { Reveal, SectionHeading } from "./Reveal";

export function Story() {
  return (
    <section id="story" className="relative py-16 sm:py-24 md:py-28">
      <div className="mx-auto grid max-w-7xl items-center gap-10 px-5 sm:px-8 lg:grid-cols-2 lg:gap-20">
        <Reveal className="order-2 lg:order-1">
          <div className="relative">
            <div
              className="absolute -inset-6 -z-10 rounded-[2rem] opacity-60 blur-3xl"
              style={{
                background:
                  "radial-gradient(60% 60% at 40% 40%, color-mix(in oklab, var(--gold) 16%, transparent), transparent 70%)",
              }}
              aria-hidden
            />
            <img
              src={storyImg}
              alt="Archit, co-founder of OG Customs, machine-polishing a car bonnet at the Domlur studio"
              loading="lazy"
              width={1280}
              height={1600}
              className="h-72 w-full rounded-xl object-cover shadow-[var(--shadow-lift)] sm:h-[26rem] lg:h-[30rem]"
            />
          </div>
        </Reveal>

        <div className="order-1 lg:order-2">
          <SectionHeading
            eyebrow="Our Story"
            title={
              <>
                Built by engineers,{" "}
                <span className="text-gold-gradient">and it shows.</span>
              </>
            }
            intro="OG Customs is led by two automobile engineers who've spent the last 5 years detailing vehicles by hand — not managing the process from a distance, but doing the work themselves, panel by panel. Every technician on the floor today was trained by them personally, on the same standards they still check against."
          />
          <Reveal delay={0.16}>
            <p className="mt-5 max-w-xl leading-relaxed text-muted-foreground">
              A vehicle here is rarely just transport. It's an investment you've planned and saved
              for, and one you'd like to hold its value for years. We treat it that way: paint,
              leather and trim inspected properly, corrected where needed, and protected before it
              starts to show its age. Every customer gets the same attention, whatever you drive —
              and we keep a record of what we did last time and what's due next, so it's one less
              thing for you to remember.
            </p>
          </Reveal>
          <div className="mt-8 grid gap-4 sm:grid-cols-3 sm:gap-5">
            {[
              { k: "5+ yrs", v: "In the studio, hands on" },
              { k: "700+", v: "vehicles detailed" },
              { k: "90%", v: "Owners who come back" },
            ].map((s, i) => (
              <Reveal key={s.k} delay={0.1 + i * 0.08}>
                <div className="surface-glass h-full rounded-xl p-5 sm:p-6">
                  <p className="font-display text-2xl font-semibold text-gold">{s.k}</p>
                  <p className="mt-1 text-sm text-muted-foreground">{s.v}</p>
                </div>
              </Reveal>
            ))}
          </div>
          <div className="mt-5 flex flex-wrap gap-x-6 gap-y-2 text-sm text-muted-foreground">
            {["Priority slots for regulars", "Every vehicle, same high standard of care", "We remind you when it's due"].map(
              (t) => (
                <span key={t} className="inline-flex items-center gap-2">
                  <BadgeCheck className="h-4 w-4 text-gold" /> {t}
                </span>
              ),
            )}
          </div>
          <Reveal delay={0.24}>
            <CtaButton href="#testimonials" variant="ghost" className="mt-8">
              Hear from our family <ArrowRight className="h-4 w-4" />
            </CtaButton>
          </Reveal>
        </div>
      </div>
    </section>
  );
}


const services = [
  {
    name: "Paint Protection Film (PPF)",
    img: svcPpfAsset,
    alt: "Paint protection film being squeegeed onto a dark vehicle panel",
    benefit: "190 to 230 micron, self-healing.",
    points: [
      "Gloss, matte / satin and coloured PPF",
      "190 to 230 micron film thickness",
      "Self-healing against swirls and light marks",
      "Maximum protection, 5, 7 and 10Y warranty",
    ],
  },
  {
    name: "Ceramic Coating",
    img: svcCeramicAsset,
    alt: "Ceramic coating being applied to a glossy black vehicle bonnet",
    benefit: "Gloss and protection, 3 to 7 years.",
    points: [
      "Nano graphene coating for gloss and protection",
      "Ceramic coating for deep, wet-look gloss",
      "Coating ranges from 3Y to 7Y",
      "Higher gloss and strong hydrophobicity",
    ],
  },
  {
    name: "Sun Film",
    img: svcSunfilmAsset,
    alt: "Nano ceramic sun control film being installed on a vehicle windshield",
    benefit: "Cooler cabin by up to 5°C.",
    points: [
      "Nano ceramic sun films",
      "100% UV rejection, skin safe",
      "Cuts night glare and heat",
      "Keeps the cabin cooler by 5°C, coloured films available",
    ],
  },
  {
    name: "Paint Restoration",
    img: svcCorrectionAsset,
    alt: "Machine polisher restoring swirl-marked black vehicle paint",
    benefit: "Paint quality, back to new.",
    points: [
      "3-Step Correction: for deep swirls and scratches",
      "2-Step Enhancement: brings back colour and shine",
      "1-Step Enhancement: brings gloss back, suitable for new cars",
    ],
  },
  {
    name: "Other Services",
    img: svcOtherAsset,
    alt: "Technician restoring faded black plastic wheel-arch trim on a vehicle",
    benefit: "The details others skip.",
    points: [
      "Plastic restoration",
      "Old PPF and glue removal",
      "Windshield restoration",
      "Cement and paint drop removal",
      "Wheel restoration",
    ],
  },
  {
    name: "Wash & Maintenance Care",
    img: svcWashAsset,
    alt: "Pressure wash removing dirt and grime from a dark vehicle",
    benefit: "Deep decontamination, done right.",
    points: [
      "Iron and deep contamination removal",
      "Heavy dirt, muck and grime removal",
      "Hard water stain removal",
      "Bird dropping and acid mark removal",
    ],
  },
];



export function Services() {
  return (
    <section id="services" className="relative py-16 sm:py-24 md:py-28">
      <div className="hairline-gold mx-auto mb-12 h-px max-w-5xl sm:mb-20" aria-hidden />
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <SectionHeading
          eyebrow="What We Do"
          align="center"
          title={
            <>
              Every service starts with <span className="text-gold-gradient">a look at your vehicle</span>
            </>
          }
          intro="All vehicles are welcome here. We check the paint before we suggest anything, and if it doesn't need a service, we'll say so."
        />

        <div className="mt-10 grid gap-4 sm:mt-14 sm:grid-cols-2 sm:gap-5 lg:grid-cols-3">
          {services.map((s, i) => (
            <Reveal key={s.name} delay={(i % 3) * 0.07}>
              <button
                type="button"
                onClick={() => pickService(s.name)}
                aria-label={`Enquire about ${s.name}`}
                className="group relative flex h-full min-h-[19rem] w-full flex-col justify-end overflow-hidden rounded-xl border border-border p-6 text-left transition-all duration-500 hover:-translate-y-1 hover:border-gold/35 hover:shadow-[var(--shadow-lift)] focus-visible:border-gold/60 focus-visible:outline-none"
              >
                <img
                  src={s.img}
                  alt={s.alt}
                  loading="lazy"
                  width={960}
                  height={720}
                  className="absolute inset-0 -z-10 h-full w-full object-cover brightness-[1.05] transition-transform duration-[1200ms] ease-out group-hover:scale-[1.07]"
                />
                {/* subtle neon-violet gradient overlay — keeps photo colours, ~20-30% tint, darker at bottom */}
                <div
                  className="absolute inset-0 -z-10"
                  style={{
                    background:
                      "linear-gradient(to top, rgba(76,29,149,0.42) 0%, rgba(109,40,217,0.24) 45%, rgba(139,92,246,0.14) 100%)",
                  }}
                  aria-hidden
                />
                {/* readability scrim concentrated at the bottom where the copy sits */}
                <div
                  className="absolute inset-0 -z-10 bg-gradient-to-t from-background/98 via-background/80 to-background/30 transition-opacity duration-500 group-hover:via-background/70"
                  aria-hidden
                />

                <div className="relative [text-shadow:0_1px_8px_rgba(0,0,0,0.85),0_0_2px_rgba(0,0,0,0.9)]">
                  <h3 className="font-display text-lg font-semibold text-white">{s.name}</h3>
                  <p className="mt-2 text-sm font-medium text-gold-soft">{s.benefit}</p>
                  <ul className="mt-3 space-y-1.5">
                    {s.points.map((p) => (
                      <li key={p} className="flex gap-2 text-sm leading-relaxed text-white/85">
                        <BadgeCheck className="mt-0.5 h-3.5 w-3.5 shrink-0 text-gold" strokeWidth={1.6} />
                        <span>{p}</span>
                      </li>
                    ))}
                  </ul>
                  <span className="mt-4 inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-[0.18em] text-gold transition-colors group-hover:text-gold-soft">
                    Enquire <ArrowRight className="h-3.5 w-3.5" />
                  </span>
                </div>
              </button>
            </Reveal>
          ))}
        </div>

      </div>
    </section>
  );
}

const reasons = [
  {
    title: "Aged or pre-owned? We bring it back.",
    copy: "Think of us as the automotive world's plastic surgeons: sun damage, old scratches and years of neglect, corrected properly.",
  },
  {
    title: "Every technician, engineer-trained",
    copy: "The same process our founders built, and still check against, on every vehicle.",
  },
  {
    title: "The cabin stays cooler",
    copy: "Sun films with superior heat rejection block 100% of UV rays — protecting your skin and keeping the cabin cooler.",
  },
  {
    title: "Paint stays protected",
    copy: "City sun, dust and monsoon rain don't get the chance to dull it.",
  },
  { title: "Resale value holds up", copy: "A well-kept vehicle sells faster, and for more." },
  {
    title: "Swirls actually disappear",
    copy: "Polished out properly, so they don't reappear after the next wash.",
  },
];

const partners: { name: string; src: string; scale?: number; solid?: boolean }[] = [
  { name: "EVOFilms", src: evofilms, solid: true },
  { name: "Artdeshine", src: artdeshine, solid: true },
  { name: "RUPES", src: rupes, scale: 0.9, solid: true },
  { name: "Shine Mate", src: shinemate, scale: 1.35 },
  { name: "STEK", src: stek },
  { name: "CarPro", src: carpro, scale: 0.95 },
];

export function WhyDetailing() {
  return (
    <section id="care" className="relative overflow-hidden py-16 sm:py-24 md:py-28">
      <div className="mx-auto grid max-w-7xl gap-10 px-5 sm:px-8 lg:grid-cols-[0.95fr_1.05fr] lg:gap-20">
        <div className="min-w-0">
          <SectionHeading
            eyebrow="Your Investment, Protected"
            title={
              <>
                A well-kept vehicle holds its value,{" "}
                <span className="text-gold-gradient">and its character, for years.</span>
              </>
            }
          />
          <Reveal delay={0.2}>
            <BeforeAfterSlider className="mt-8 h-56 w-full sm:h-72 lg:mt-10 lg:h-80" />
            <p className="mt-3 text-[0.65rem] uppercase tracking-[0.16em] text-muted-foreground sm:text-xs sm:tracking-[0.2em]">
              Drag the slider to see the same bonnet, before and after
            </p>
          </Reveal>
        </div>

        <div className="grid min-w-0 gap-4 self-center sm:grid-cols-2 sm:gap-5">
          {reasons.map((r, i) => (
            <Reveal key={r.title} className="min-w-0" delay={i * 0.08}>
              <div className="surface-glass h-full min-w-0 rounded-xl p-5 sm:p-6">
                <BadgeCheck className="h-5 w-5 text-gold" strokeWidth={1.4} />
                <h3 className="mt-3 font-display text-[0.95rem] font-semibold sm:mt-4 sm:text-base">
                  {r.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{r.copy}</p>
              </div>
            </Reveal>
          ))}
        </div>

        <div className="min-w-0 lg:col-span-2">
          <Reveal>
            <p className="flex items-start gap-2 rounded-2xl border border-gold/30 bg-charcoal/60 px-4 py-3 text-[0.68rem] font-semibold uppercase leading-relaxed tracking-[0.12em] text-gold-soft sm:inline-flex sm:items-center sm:rounded-full sm:py-2 sm:text-sm sm:tracking-[0.16em]">
              <BadgeCheck className="mt-0.5 h-4 w-4 shrink-0 text-gold sm:mt-0" strokeWidth={1.6} />
              Authorised installers for EVOFilms and Artdeshine products
            </p>
          </Reveal>

          <Reveal delay={0.1}>
            <h3 className="mt-8 text-center font-display text-xl font-semibold sm:text-2xl">
              Brands <span className="text-gold-gradient">used</span>
            </h3>
            <div className="relative mt-5 w-full overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]">
              <div className="flex w-max animate-brand-marquee items-center">
                {[...partners, ...partners, ...partners].map((b, i) => (
                  <span
                    key={`${b.name}-${i}`}
                    className="flex h-8 w-[124px] shrink-0 items-center justify-center px-4 sm:h-12 sm:w-[176px] sm:px-8"
                  >
                    <img
                      src={b.src}
                      alt={`${b.name} logo`}
                      loading="lazy"
                      style={b.scale ? { transform: `scale(${b.scale})` } : undefined}
                      className={`max-h-full max-w-full object-contain transition-opacity duration-300 hover:opacity-100 ${
                        b.solid ? "opacity-95" : "opacity-85 mix-blend-screen"
                      }`}
                    />

                  </span>
                ))}
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>

  );
}

const faqs = [
  {
    q: "What's the difference between PPF and ceramic coating?",
    a: "PPF and ceramic coating protect your vehicle in different ways. PPF is a thick, self-healing polyurethane film: a physical barrier against stone chips, deep scratches and abrasions. Ceramic coating is a liquid polymer (usually SiO2 or graphene-based) that bonds to the paint and gives you gloss, chemical resistance and a hydrophobic surface that's easier to keep clean. A lot of owners end up doing both: ceramic coating over the PPF.",
  },
  {
    q: "How long will your services actually last?",
    a: "It depends on the product and how it's maintained. A good ceramic coating usually holds up for 2 to 5 years; a premium PPF can last 5 to 10 years if it's looked after. Every service comes with a specific warranty period, so you know exactly what you're covered for.",
  },
  {
    q: "Are your sun films legal in India?",
    a: "Yes. We stick to the current RTO/CMVR rules: at least 70% VLT on the front and rear windshield, 50% on the side windows. We don't sell film that doesn't meet that, no matter how dark you'd prefer it.",
  },
  {
    q: "PPF or ceramic coating: which one do I need?",
    a: "It comes down to what you're trying to solve. Worried about stone chips and scratches? PPF. Want gloss, easy cleaning and chemical resistance? Ceramic coating. A lot of owners do both: PPF on the high-impact areas with a coating over the top. Bring it in and we'll look at your driving conditions, budget and what you actually want out of it, whatever you're driving.",
  },
  {
    q: "I just bought a used or pre-owned vehicle. Is detailing worth it?",
    a: "Almost always, yes. A pre-owned vehicle carries someone else's history — sun-baked paint, embedded stains, swirl marks from years of wrong washes. We treat it as a restoration project: correct the paint, deep-clean the interior, and protect it going forward, so it actually feels like yours. Don't write it off as \"just an old vehicle\" before you've seen what's still there under the surface.",
  },
];


export function Faq() {
  return (
    <section id="faq" className="relative py-16 sm:py-24 md:py-28">
      <div className="mx-auto max-w-4xl px-5 sm:px-8">
        <SectionHeading
          eyebrow="Questions, answered"
          align="center"
          title={
            <>
              Vehicle detailing in Bangalore — <span className="text-gold-gradient">straight answers</span>
            </>
          }
        />
        <div className="mt-10 divide-y divide-border rounded-xl border border-border bg-charcoal/60 sm:mt-14">
          {faqs.map((f, i) => (
            <Reveal key={f.q} delay={i * 0.06}>
              <details className="group px-5 py-5 sm:px-7 sm:py-6">
                <summary className="cursor-pointer list-none font-display text-base font-semibold text-foreground marker:hidden sm:text-lg">
                  {f.q}
                </summary>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{f.a}</p>
              </details>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
