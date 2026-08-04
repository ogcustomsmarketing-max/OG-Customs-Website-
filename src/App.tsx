import { SiteHeader } from "@/components/og/SiteHeader";
import { Hero } from "@/components/og/Hero";
import { BrandBand } from "@/components/og/BrandBand";
import { Story, Services, WhyDetailing, Faq } from "@/components/og/Sections";
import {
  Testimonials,
  Gallery,
  FinalCta,
  SiteFooter,
  WhatsAppFloat,
} from "@/components/og/Community";
import { ContactInfo } from "@/components/og/ContactInfo";
import { ChatAssistant } from "@/components/og/ChatAssistant";
import { StartAtTop } from "@/components/og/StartAtTop";

export default function App() {
  return (
    <>
      <StartAtTop />
      <SiteHeader />
      <main>
        <Hero />
        <BrandBand />
        <Story />
        <Services />
        <WhyDetailing />
        <Testimonials />
        <Gallery />
        <Faq />
        <ContactInfo />
        <FinalCta />
      </main>
      <SiteFooter />
      <WhatsAppFloat />
      <ChatAssistant />
    </>
  );
}
