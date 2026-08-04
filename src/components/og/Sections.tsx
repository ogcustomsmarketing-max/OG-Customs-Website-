import { ArrowRight, BadgeCheck } from "lucide-react";
import { CtaButton } from "./Reveal";
import { pickService } from "@/lib/service-select";

import svcDetailing from "@/assets/svc-detailing.jpg";
import svcInterior from "@/assets/svc-interior.jpg";
import svcExterior from "@/assets/svc-exterior.jpg";
import svcCorrection from "@/assets/svc-correction.jpg";
import svcCeramic from "@/assets/svc-ceramic.jpg";
import svcPpf from "@/assets/svc-ppf.jpg";
import svcWash from "@/assets/svc-wash.jpg";
import svcSpecial from "@/assets/svc-special.jpg";
import storyImg from "@/assets/story-family.jpg";
import { BeforeAfterSlider } from "./BeforeAfterSlider";
import { Reveal, SectionHeading } from "./Reveal";

export function Story() {
  return (
    <section id="story" className="relative py-14 sm:py-24 md:py-28">
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
              alt="An Indian family standing proudly beside their well-kept car in Bangalore"
              loading="lazy"
              width={1280}
              height={1600}
              className="h-72 w-full rounded-xl object-cover shadow-[var(--shadow-lift)] sm:h-[26rem] lg:h-[30rem]"
            />
          </div>
        </Reveal>

        <div className="order-1 lg:order-2">
          <SectionHeading
            eyebrow="Our Story · OG Family"
            title={
              <>
                In an Indian home, a car is a milestone.{" "}
                <span className="text-gold-gradient">We treat it like one.</span>
              </>
            }
            intro="Most of us wash the car and hope for the best. Paint, leather and trim don't work that way — they age quietly. Looked after on time, they don't."
          />
          <Reveal delay={0.16}>
            <p className="mt-5 max-w-xl leading-relaxed text-muted-foreground">
              Cars and bikes both get the same treatment here — same hands, same standard. Owners
              who come once usually come back. We remember your vehicle, what we did last time, and
              what can wait. That's the OG family.
            </p>
          </Reveal>
          <div className="mt-8 grid gap-4 sm:grid-cols-3 sm:gap-5">
            {[
              { k: "5+ yrs", v: "In the studio, hands on" },
              { k: "150+", v: "Bangalore cars & bikes looked after" },
              { k: "90%", v: "Owners who come back" },
            ].map((s, i) => (
              <Reveal key={s.k} delay={0.1 + i * 0.08}>
                <div className="surface-glass rounded-xl p-5">
                  <p className="font-display text-2xl font-semibold text-gold">{s.k}</p>
                  <p className="mt-1 text-sm text-muted-foreground">{s.v}</p>
                </div>
              </Reveal>
            ))}
          </div>
          <div className="mt-5 flex flex-wrap gap-x-6 gap-y-2 text-sm text-muted-foreground">
            {["Priority slots for regulars", "Cars & bikes, same standard", "We remind you when it's due"].map(
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
    name: "Ceramic Coating",
    img: svcCeramic,
    alt: "Ceramic coating being applied to a car bonnet with water beading",
    benefit: "Built for Bangalore roads.",
    copy: "A hard, water-repelling layer over your paint. Dust rinses off, sun doesn't fade it, washes get easy.",
  },
  {
    name: "Paint Protection Film",
    img: svcPpf,
    alt: "Paint protection film being squeegeed onto a dark car panel",
    benefit: "For stone chips and scuffs.",
    copy: "Self-healing film cut to fit your bonnet, bumper and mirrors. You won't see it. Your paint will feel it.",
  },
  {
    name: "Car Detailing",
    img: svcDetailing,
    alt: "A detailer wiping a glossy black car panel with a microfiber cloth",
    benefit: "A full reset, inside and out.",
    copy: "Every surface cleaned, corrected and protected in order. The car feels new when you get in.",
  },
  {
    name: "Interior Detailing",
    img: svcInterior,
    alt: "Deep cleaning a luxury car interior seat and dashboard",
    benefit: "The part you actually sit in.",
    copy: "Seats, trims, vents and roof lining deep-cleaned. No smell, no dust, no sticky steering wheel.",
  },
  {
    name: "Exterior Detailing",
    img: svcExterior,
    alt: "Snow foam wash on a dark luxury car during exterior detailing",
    benefit: "Showroom look, back again.",
    copy: "Bonded dirt pulled out, gloss lifted, faded trim revived. The paint does the talking.",
  },
  {
    name: "Paint Correction",
    img: svcCorrection,
    alt: "Machine polisher correcting swirl marks on black car paint",
    benefit: "Swirls out, depth back.",
    copy: "Wash marks and dull patches machine-polished away in measured stages — removed, not hidden.",
  },
  {
    name: "Wash & Maintenance Care",
    img: svcWash,
    alt: "Careful hand wash of a glossy dark car with a wash mitt",
    benefit: "Keep it looking done.",
    copy: "Safe, scheduled washes that protect the coating instead of scratching it back to square one.",
  },
  {
    name: "Special Care Packages",
    img: svcSpecial,
    alt: "Freshly detailed luxury car under studio spotlights at delivery",
    benefit: "Built around your plans.",
    copy: "New car prep, wedding and festival days, or a yearly upkeep plan — put together after we see the car.",
  },
];



export function Services() {
  return (
    <section id="services" className="relative py-16 sm:py-24 md:py-32">
      <div className="hairline-gold mx-auto mb-12 h-px max-w-5xl sm:mb-20" aria-hidden />
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <SectionHeading
          eyebrow="What We Do"
          align="center"
          title={
            <>
              Every service starts with <span className="text-gold-gradient">a look at your car</span>
            </>
          }
          intro="Cars and bikes both welcome. No package pushed before we've seen the paint. We inspect, tell you what it needs, and leave out what it doesn't."
        />

        <div className="mt-10 grid gap-4 sm:mt-16 sm:grid-cols-2 sm:gap-5 lg:grid-cols-4">
          {services.map((s, i) => (
            <Reveal key={s.name} delay={(i % 4) * 0.07}>
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
                  className="absolute inset-0 -z-10 h-full w-full object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-[1.07]"
                />
                <div
                  className="absolute inset-0 -z-10 bg-gradient-to-t from-background via-background/80 to-background/25 transition-opacity duration-500 group-hover:from-background group-hover:via-background/70"
                  aria-hidden
                />
                <h3 className="font-display text-lg font-semibold">{s.name}</h3>
                <p className="mt-2 text-sm font-medium text-gold-soft/90">{s.benefit}</p>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{s.copy}</p>
                <span className="mt-4 inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-[0.18em] text-gold transition-colors group-hover:text-gold-soft">
                  Enquire <ArrowRight className="h-3.5 w-3.5" />
                </span>
              </button>
            </Reveal>
          ))}
        </div>

      </div>
    </section>
  );
}

const reasons = [
  { title: "Paint stays protected", copy: "City sun, dust and monsoon rain don't get to dull it." },
  { title: "Swirls actually go", copy: "Polished out properly — not filled in to reappear next wash." },
  { title: "The cabin feels clean", copy: "No dust in the vents, no stickiness on the trim." },
  { title: "Resale value holds", copy: "A well-kept car sells faster, and for more." },
];

export function WhyDetailing() {
  return (
    <section id="care" className="relative py-14 sm:py-24 md:py-28">
      <div className="mx-auto grid max-w-7xl gap-10 px-5 sm:px-8 lg:grid-cols-[0.95fr_1.05fr] lg:gap-20">
        <div>
          <SectionHeading
            eyebrow="Why Us"
            title={
              <>
                Service keeps it running.{" "}
                <span className="text-gold-gradient">We keep it worth owning.</span>
              </>
            }
            intro="This isn't only for weddings or resale day. It's upkeep for the car or bike you ride to work every morning."
          />
          <Reveal delay={0.2}>
            <BeforeAfterSlider className="mt-8 h-56 w-full sm:h-72 lg:mt-10 lg:h-80" />
            <p className="mt-3 text-xs uppercase tracking-[0.2em] text-muted-foreground">
              Drag the slider — same bonnet, before and after
            </p>
          </Reveal>
        </div>

        <div className="grid gap-4 self-center sm:grid-cols-2">
          {reasons.map((r, i) => (
            <Reveal key={r.title} delay={i * 0.08}>
              <div className="surface-glass h-full rounded-xl p-6">
                <BadgeCheck className="h-5 w-5 text-gold" strokeWidth={1.4} />
                <h3 className="mt-4 font-display text-base font-semibold">{r.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{r.copy}</p>
              </div>
            </Reveal>
          ))}
        </div>

      </div>
    </section>
  );
}

const faqs = [
  {
    q: "What is the difference between PPF (Paint Protection Film) and Ceramic Coating?",
    a: "They offer different types of protection. PPF is a thick, self-healing polyurethane film that acts as an invisible physical barrier, primarily protecting your car's paint from stone chips, deep scratches and abrasions. Ceramic Coating is a liquid polymer (typically SiO2 or graphene-based) applied to the paint that creates a permanent bond, offering superior gloss, chemical resistance and hydrophobic properties — making the car incredibly easy to clean. For maximum protection, many owners choose to apply a ceramic coating over their PPF.",
  },
  {
    q: "How long will your car detailing services actually last?",
    a: "The durability depends on the service and product quality. A high-quality ceramic coating typically lasts between 2 to 5 years, while a premium PPF can last 5 to 10 years with proper maintenance. We provide a specific warranty period for each service package, ensuring long-lasting shine and protection for your vehicle.",
  },
  {
    q: "Are your sun protection films for cars legal in India?",
    a: "Yes, we strictly adhere to the updated RTO/CMVR guidelines. Our sun protection films are designed to meet the mandatory Visible Light Transmission (VLT) standards — typically ≥70% VLT for the front/rear windshield and ≥50% VLT for the side windows. We only offer films that are transparent enough to be legal while providing maximum heat and UV rejection.",
  },
  {
    q: "How do I know whether PPF or ceramic coating is right for my vehicle?",
    a: "It depends on your primary goal. For maximum physical damage protection (stone chips, scratches): choose PPF. For high gloss, easy cleaning and chemical resistance: choose Ceramic Coating. Many owners do both — PPF on the impact areas with a coating over it. Talk to our team and we will assess your driving conditions, budget and desired outcome, for cars as well as bikes.",
  },
];


export function Faq() {
  return (
    <section id="faq" className="relative py-16 sm:py-24 md:py-32">
      <div className="mx-auto max-w-4xl px-5 sm:px-8">
        <SectionHeading
          eyebrow="Questions, answered"
          align="center"
          title={
            <>
              Car & bike detailing in Bangalore — <span className="text-gold-gradient">straight answers</span>
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
