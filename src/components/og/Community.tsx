import { useState } from "react";
import { Star, ChevronDown } from "lucide-react";
import { LeadForm } from "./BookingForm";
import { WhatsAppIcon } from "./WhatsAppIcon";
import { useScrolledPastHero } from "./useScrolledPastHero";
import gal730i from "@/assets/gal-730i.jpg";
import galPolo from "@/assets/gal-polo_gt.jpg";

import galSantro from "@/assets/gal-Hyundai_Santro.jpg";
import galAClass from "@/assets/gal-Mercedes_A-Class.jpg";
import galHectorBlack from "@/assets/gal-MG_Hector_Black.jpg";
import galHimalayan from "@/assets/gal-Royal_Enfield_Himalayan.jpg";
import galReTank from "@/assets/gal-Royal_Enfield_Tank.jpg";
import galSlaviaRed from "@/assets/gal-Skoda_Slavia_Red.jpg";
import galSlavia from "@/assets/gal-Skoda_Slavia.jpg";
import galGlanza from "@/assets/gal-Toyota_Glanza.jpg";
import galVirtus from "@/assets/gal-VW_Virtus.jpg";
import vidCarWash from "@/assets/gal-Car_wash_video.mp4";
import vidKtm from "@/assets/gal-KTM_Duke_Video.mp4";
import vidHectorRed from "@/assets/gal-MG_Hector_Red.mp4";
import vidPpf from "@/assets/gal-PPF_Application_video.mp4";
import vidThunderbird from "@/assets/gal-Royal_Enfield_Thunderbird.mp4";

import logo from "@/assets/og-logo-mark.png";
import {
  Reveal,
  SectionHeading,
  WHATSAPP_URL,
  WHATSAPP_DISPLAY,
  EMAIL,
} from "./Reveal";

const testimonials = [
  {
    name: "Sandeep Prakash",
    car: "VW Taigun · Basic Polish",
    quote:
      "Top notch work! Brought my VW Taigun in for a basic polish and the car looks absolutely stunning. Archit is extremely knowledgeable and uses high quality products that last. Truly a detailing place that places emphasis on attention to detail. 11/10 would recommend.",
    stars: 5,
  },
  {
    name: "Trevor Coutinho",
    car: "Full Detailing",
    quote:
      "Had an amazing experience with Archit, a truly professional car detailer! He did a fantastic job on my car. He explained the process well and used quality products that really brought back the showroom finish. I highly recommend his services to anyone looking to give their car a proper makeover.",
    stars: 5,
  },
  {
    name: "Amrita Bazray",
    car: "Kia · Paint Correction + Interiors",
    quote:
      "I had given my 2 year old Kia for paint correction and OGC did a great job. Archit who owns this place did so well with the paint job, and interiors. He makes sure his customers are top priority and individually attends to them. The rates are reasonable and value for the service he provides.",
    stars: 5,
  },
  {
    name: "Vivek Varma",
    car: "Royal Enfield GT 650 · OG Treatment",
    quote:
      "Got my GT 650 the OG Treatment @ OG Customs. Not only got the GT to look amazing, but also got a very professional and personal service from the team.",
    stars: 5,
  },
  {
    name: "Hari Charan",
    car: "Datsun Redi-Go · Chrome Delete + Ceramic Coating",
    quote:
      "Professional service with amazing results! Archit suggested a chrome delete with a black bonnet to give it a sporty look and I love the final result. The ceramic coating gives the best glossy finish and helps in maintenance. Highly recommend this place to anyone looking for a premium finish on any vehicle.",
    stars: 5,
  },
  {
    name: "S A",
    car: "Mercedes-AMG A35 · Detailing",
    quote:
      "Excellent work on my AMG A35. Archit is a professional at what he does. Great job !!!",
    stars: 5,
  },
];


function TestimonialCard({ t }: { t: (typeof testimonials)[number] }) {
  return (
    <figure className="flex h-full w-[19rem] shrink-0 flex-col rounded-xl border border-border bg-charcoal/70 p-7 transition-all duration-500 hover:border-gold/30 sm:w-[22rem]">
      <div className="flex gap-1" aria-label={`${t.stars} out of 5 stars`}>
        {Array.from({ length: t.stars }).map((_, s) => (
          <Star key={s} className="h-4 w-4 fill-gold text-gold" />
        ))}
      </div>
      <blockquote className="mt-5 grow text-sm leading-relaxed text-foreground/90">
        “{t.quote}”
      </blockquote>
      <figcaption className="mt-7 flex min-w-0 items-center gap-3 border-t border-border pt-5">
        <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full border border-gold/30 font-display text-sm text-gold">
          {t.name
            .split(" ")
            .map((n) => n[0])
            .join("")}
        </span>
        <span className="min-w-0">
          <span className="block truncate text-sm font-semibold">{t.name}</span>
          <span className="block truncate text-xs text-muted-foreground">{t.car}</span>
        </span>
      </figcaption>
    </figure>
  );
}

export function Testimonials() {
  return (
    <section id="testimonials" className="relative py-16 sm:py-24 md:py-28">
      <div className="mx-auto flex max-w-7xl flex-col gap-6 px-5 sm:px-8 lg:flex-row lg:items-end lg:justify-between lg:gap-12">
        <SectionHeading
          eyebrow="Customer Stories"
          title={
            <>
              What Bangalore owners <span className="text-gold-gradient">say about us</span>
            </>
          }
        />
        <div className="surface-glass flex shrink-0 items-center gap-4 rounded-xl px-5 py-4">
          <p className="font-display text-4xl font-semibold text-gold">5.0</p>
          <div>
            <div className="flex items-center gap-1" aria-hidden>
              {[0, 1, 2, 3, 4].map((i) => (
                <Star key={i} className="h-4 w-4 fill-gold text-gold" strokeWidth={1.2} />
              ))}
            </div>
            <p className="mt-1.5 text-xs uppercase tracking-[0.18em] text-muted-foreground">
              Average rating
            </p>
          </div>
        </div>
      </div>

      <div className="group relative mt-9 overflow-hidden sm:mt-12 [mask-image:linear-gradient(to_right,transparent,black_8%,black_92%,transparent)]">
        <div className="flex w-max gap-5 animate-marquee group-hover:[animation-play-state:paused]">
          {[...testimonials, ...testimonials].map((t, i) => (
            <TestimonialCard key={`${t.name}-${i}`} t={t} />
          ))}
        </div>
      </div>
    </section>
  );
}


type GalleryItem = { src: string; alt: string; type?: "image" | "video" };

const gallery: GalleryItem[] = [
  { src: galAClass, alt: "Black Mercedes A-Class bonnet with mirror-gloss finish after paint correction" },
  { src: vidPpf, type: "video", alt: "Paint protection film being squeegeed onto a panel" },
  { src: galSlaviaRed, alt: "Red Skoda Slavia with deep gloss after ceramic coating" },
  { src: vidKtm, type: "video", alt: "KTM Duke detailed and gleaming in the studio" },
  { src: gal730i, alt: "Silver BMW 730i bonnet after paint correction" },
  { src: galHimalayan, alt: "Royal Enfield Himalayan tank polished to a mirror finish" },
  { src: vidCarWash, type: "video", alt: "Vehicle being foam washed at the OG Customs studio" },
];

const galleryMore: GalleryItem[] = [
  { src: galVirtus, alt: "Black Volkswagen Virtus bonnet reflecting studio light lines" },
  { src: vidHectorRed, type: "video", alt: "Red MG Hector after a full detail" },
  { src: galSantro, alt: "Red Hyundai Santro bonnet restored to a glossy finish" },
  { src: galPolo, alt: "Volkswagen Polo GT bonnet with deep reflections" },
  { src: galHectorBlack, alt: "Black MG Hector detailed and gleaming in daylight" },
  { src: galReTank, alt: "Royal Enfield tank showing half-polished paint correction" },
  { src: vidThunderbird, type: "video", alt: "Royal Enfield Thunderbird detailed at the studio" },
  { src: galSlavia, alt: "Blue Skoda Slavia detailed with a deep gloss finish" },
  { src: galGlanza, alt: "Matte-wrapped Toyota Glanza after detailing" },
];


export function Gallery() {
  const [expanded, setExpanded] = useState(false);

  return (
    <section id="gallery" className="relative py-16 sm:py-24 md:py-28">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <SectionHeading
          eyebrow="Transformations"
          title={
            <>
              Our work, <span className="text-gold-gradient">up close</span>
            </>
          }
          intro="Real vehicles from our studio: corrected paint, coated panels, cleaned-up cabins, and the handover moment owners keep coming back for."
        />
        <div className="mt-10 columns-2 gap-3 sm:mt-14 sm:columns-3 sm:gap-4 lg:columns-4 lg:gap-5">
          {(expanded ? [...gallery, ...galleryMore] : gallery).map((g, i) => (
            <Reveal key={g.src + i} delay={(i % 4) * 0.06} className="mb-3 break-inside-avoid sm:mb-4 lg:mb-5">
              <figure className="group relative overflow-hidden rounded-xl border border-border">
                {g.type === "video" ? (
                  <video
                    src={g.src}
                    aria-label={g.alt}
                    autoPlay
                    loop
                    muted
                    playsInline
                    preload="metadata"
                    className="aspect-[3/4] w-full bg-charcoal/60 object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-[1.07]"

                  />
                ) : (
                  <img
                    src={g.src}
                    alt={g.alt}
                    loading="lazy"
                    className="w-full object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-[1.07]"
                  />
                )}

                <div
                  className="absolute inset-0 bg-gradient-to-t from-background/85 via-transparent to-transparent opacity-70 transition-opacity duration-500 group-hover:opacity-90"
                  aria-hidden
                />
              </figure>
            </Reveal>
          ))}
        </div>


        <div className="mt-8 flex justify-center">
          <button
            type="button"
            onClick={() => setExpanded((v) => !v)}
            className="inline-flex items-center gap-2 rounded-full border border-gold/35 bg-charcoal/60 px-6 py-3 text-xs font-semibold uppercase tracking-[0.18em] text-gold transition-colors hover:border-gold/60 hover:text-gold-soft"
          >
            {expanded ? "View less" : "View more"}
            <ChevronDown
              className={`h-4 w-4 transition-transform duration-300 ${expanded ? "rotate-180" : ""}`}
            />
          </button>
        </div>
      </div>
    </section>
  );
}

export function FinalCta() {
  return (
    <section id="contact" className="relative overflow-hidden py-16 sm:py-24 md:py-28">
      <div
        className="absolute inset-0 -z-10"
        style={{
          background:
            "radial-gradient(60% 60% at 50% 50%, color-mix(in oklab, var(--gold) 14%, transparent), transparent 72%)",
        }}
        aria-hidden
      />
      <div className="mx-auto grid max-w-7xl items-center gap-10 px-5 sm:px-8 lg:grid-cols-2 lg:gap-16">
        <div>
          <Reveal>
            <img
              src={logo}
              alt="OG Customs"
              loading="lazy"
              width={640}
              height={640}
              className="h-14 w-14 object-contain"
            />
          </Reveal>
          <Reveal delay={0.08}>
            <h2 className="mt-7 text-3xl leading-[1.1] font-semibold text-balance sm:text-4xl md:text-5xl">
              Not sure what your vehicle needs?{" "}
              <span className="text-gold-gradient">Let's find out together.</span>
            </h2>
          </Reveal>
          <Reveal delay={0.14}>
            <p className="mt-6 max-w-xl leading-relaxed text-muted-foreground">
              Send us the make and model, and tell us what you're hoping for: a deeper clean, better
              protection, or just some advice on where to start. The team will take a look, walk you
              through your options, and put together a package tailored to exactly what your vehicle
              needs.
            </p>
          </Reveal>
        </div>

        <Reveal delay={0.1}>
          <p className="mb-3 text-sm font-medium tracking-[0.02em] text-gold-soft">
            Fill in details for free inspection.
          </p>
          <LeadForm />
        </Reveal>
      </div>
    </section>
  );
}

export function SiteFooter() {
  return (
    <footer className="border-t border-border py-12">
      <div className="mx-auto grid max-w-7xl gap-6 px-5 sm:px-8 md:grid-cols-[1fr_auto] md:items-center">
        <div className="flex min-w-0 items-center gap-3">
          <img
            src={logo}
            alt="OG Customs logo"
            loading="lazy"
            width={640}
            height={640}
            className="h-9 w-9 shrink-0 object-contain"
          />
          <p className="min-w-0 text-sm text-muted-foreground">
            OG Customs: vehicle detailing, ceramic coating and PPF in Bangalore. Since 2021.
          </p>
        </div>
        <div className="text-xs text-muted-foreground/80 md:text-right">
          <p className="space-x-3">
            <a href={`mailto:${EMAIL}`} className="transition-colors hover:text-gold">
              {EMAIL}
            </a>
            <a href={WHATSAPP_URL} target="_blank" rel="noreferrer" className="transition-colors hover:text-gold">
              {WHATSAPP_DISPLAY}
            </a>
          </p>

          <p className="mt-2 text-muted-foreground/70">
            © {new Date().getFullYear()} OG Customs. Once OG, always OG.
          </p>
        </div>

      </div>
    </footer>
  );
}

export function WhatsAppFloat() {
  const show = useScrolledPastHero();
  return (
    <a
      href={WHATSAPP_URL}
      target="_blank"
      rel="noreferrer"
      aria-label="Chat with OG Customs on WhatsApp"
      className={`fixed right-4 bottom-4 z-50 grid h-14 w-14 place-items-center rounded-full bg-whatsapp p-3.5 text-whatsapp-foreground shadow-[var(--shadow-glow)] transition-all duration-300 hover:scale-105 sm:right-5 sm:bottom-5 ${
        show ? "opacity-100" : "pointer-events-none translate-y-4 opacity-0"
      }`}
    >
      <WhatsAppIcon className="h-6 w-6" />
    </a>
  );
}
