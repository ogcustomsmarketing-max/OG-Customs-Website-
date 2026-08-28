import { createFileRoute } from "@tanstack/react-router";
import { SiteHeader } from "@/components/og/SiteHeader";
import { Hero } from "@/components/og/Hero";
import { Story, Services, WhyDetailing, Faq } from "@/components/og/Sections";
import { ContactInfo } from "@/components/og/ContactInfo";
import { BrandBand } from "@/components/og/BrandBand";
import { ChatAssistant } from "@/components/og/ChatAssistant";
import { StartAtTop } from "@/components/og/StartAtTop";

import {
  Testimonials,
  Gallery,
  FinalCta,
  SiteFooter,
  WhatsAppFloat,
} from "@/components/og/Community";

const SITE = "https://ogcustoms.in";
const title = "Car Detailing & Ceramic Coating in Bangalore | OG Customs";
const description =
  "Engineer-led vehicle detailing studio in Domlur, Bangalore. Ceramic coating, paint correction, PPF and interior detailing — free inspection first, then one clear price. Message us on WhatsApp.";
const ogImage =
  "https://pub-bb2e103a32db4e198524a2e9ed8f35b4.r2.dev/d807d1c3-237e-4650-855c-f9aaa80eaabc/id-preview-706932df--f3e1ad59-0244-449a-a169-845658cd538b.lovable.app-1785410249148.png";

const services = [
  "Paint Protection Film (PPF)",
  "Ceramic Coating",
  "Sun Films",
  "Paint Restoration",
  "Hard Water Stain Removal",
  "Cement & Paint Drop Removal",
  "Exterior Plastic Trim Restoration",
  "Windshield Restoration",
];

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "AutoDetailing",
      "@id": `${SITE}/#business`,
      name: "OG Customs",
      description,
      url: SITE,
      image: ogImage,
      telephone: "+91-81051-39791",
      foundingDate: "2021",
      email: "ogcustomsmarketing@gmail.com",
      priceRange: "₹₹",
      address: {
        "@type": "PostalAddress",
        streetAddress: "314/1, 3rd Main Rd, 7th Cross, Domlur I Stage, Domlur",
        addressLocality: "Bengaluru",
        postalCode: "560071",
        addressRegion: "Karnataka",
        addressCountry: "IN",
      },
      areaServed: { "@type": "City", name: "Bangalore" },
      hasMap: "https://maps.app.goo.gl/YTRvUj6PpgjsVkhe7",
      openingHoursSpecification: [
        {
          "@type": "OpeningHoursSpecification",
          dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
          opens: "10:00",
          closes: "20:00",
        },
      ],
      sameAs: ["https://wa.me/918105139791", "https://www.instagram.com/og_customs.blr/"],
      aggregateRating: {
        "@type": "AggregateRating",
        ratingValue: "5",
        reviewCount: "6",
      },
      hasOfferCatalog: {
        "@type": "OfferCatalog",
        name: "Car care services",
        itemListElement: services.map((s) => ({
          "@type": "Offer",
          itemOffered: { "@type": "Service", name: s, areaServed: "Bangalore" },
        })),
      },
    },
    {
      "@type": "FAQPage",
      "@id": `${SITE}/#faq`,
      mainEntity: [
        {
          "@type": "Question",
          name: "What's the difference between PPF and ceramic coating?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "PPF and ceramic coating protect your vehicle in different ways. PPF is a thick, self-healing polyurethane film: a physical barrier against stone chips, deep scratches and abrasions. Ceramic coating is a liquid polymer (usually SiO2 or graphene-based) that bonds to the paint and gives you gloss, chemical resistance and a hydrophobic surface that's easier to keep clean. A lot of owners end up doing both: ceramic coating over the PPF.",
          },
        },
        {
          "@type": "Question",
          name: "How long will your services actually last?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "It depends on the product and how it's maintained. A good ceramic coating usually holds up for 2 to 5 years; a premium PPF can last 5 to 10 years if it's looked after. Every service comes with a specific warranty period, so you know exactly what you're covered for.",
          },
        },
        {
          "@type": "Question",
          name: "Are your sun films legal in India?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Yes. We stick to the current RTO/CMVR rules: at least 70% VLT on the front and rear windshield, 50% on the side windows. We don't sell film that doesn't meet that, no matter how dark you'd prefer it.",
          },
        },
        {
          "@type": "Question",
          name: "PPF or ceramic coating: which one do I need?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "It comes down to what you're trying to solve. Worried about stone chips and scratches? PPF. Want gloss, easy cleaning and chemical resistance? Ceramic coating. A lot of owners do both: PPF on the high-impact areas with a coating over the top. Bring it in and we'll look at your driving conditions, budget and what you actually want out of it, whatever you're driving.",
          },
        },
        {
          "@type": "Question",
          name: "I just bought a used or pre-owned vehicle. Is detailing worth it?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Almost always, yes. A pre-owned vehicle carries someone else's history — sun-baked paint, embedded stains, swirl marks from years of wrong washes. We treat it as a restoration project: correct the paint, deep-clean the interior, and protect it going forward, so it actually feels like yours.",
          },
        },
      ],

    },
  ],
};

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      {
        name: "keywords",
        content:
          "car detailing Bangalore, bike detailing Bangalore, ceramic coating Bangalore, paint correction, PPF Bangalore, interior detailing, car care studio",
      },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:type", content: "website" },
      { property: "og:url", content: `${SITE}/` },
      { property: "og:site_name", content: "OG Customs" },
      { property: "og:locale", content: "en_IN" },
      { property: "og:image", content: ogImage },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: title },
      { name: "twitter:description", content: description },
      { name: "twitter:image", content: ogImage },
      { name: "robots", content: "index, follow, max-image-preview:large" },
      { name: "geo.region", content: "IN-KA" },
      { name: "geo.placename", content: "Bangalore" },
    ],
    links: [{ rel: "canonical", href: `${SITE}/` }],
    scripts: [{ type: "application/ld+json", children: JSON.stringify(jsonLd) }],
  }),
  component: Index,
});


function Index() {
  return (
    <main className="relative">
      <StartAtTop />
      <SiteHeader />
      <Hero />

      <Story />
      <BrandBand />
      <Services />
      <WhyDetailing />
      <Gallery />
      <Testimonials />
      <Faq />
      <FinalCta />
      <ContactInfo />
      <SiteFooter />
      <ChatAssistant />
      <WhatsAppFloat />
    </main>
  );
}
