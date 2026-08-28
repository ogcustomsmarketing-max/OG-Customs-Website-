import { Mail, MapPin, Phone, Clock, ExternalLink } from "lucide-react";
import instagramIcon from "@/assets/social/instagram-norm.png";
import youtubeIcon from "@/assets/social/youtube-norm.png";
import facebookIcon from "@/assets/social/facebook-norm.png";
import {
  Reveal,
  SectionHeading,
  EMAIL,
  WHATSAPP_DISPLAY,
  WHATSAPP_URL,
  INSTAGRAM_URL,
  INSTAGRAM_HANDLE,
  YOUTUBE_URL,
  FACEBOOK_URL,
  openExternal,
} from "./Reveal";

export const ADDRESS =
  "314/1, 3rd Main Rd, 7th Cross, Domlur I Stage, 1st Stage, Domlur, Bengaluru, Karnataka 560071";
export const MAPS_URL = "https://maps.app.goo.gl/YTRvUj6PpgjsVkhe7";
const MAP_EMBED =
  "https://www.google.com/maps?q=" +
  encodeURIComponent("OG Customs, 314/1, 3rd Main Rd, Domlur, Bengaluru, Karnataka 560071") +
  "&z=15&output=embed";

const hours = [
  ["Monday", "10 am – 8 pm"],
  ["Tuesday", "10 am – 8 pm"],
  ["Wednesday", "10 am – 8 pm"],
  ["Thursday", "10 am – 8 pm"],
  ["Friday", "10 am – 8 pm"],
  ["Saturday", "10 am – 8 pm"],
  ["Sunday", "Closed"],
];

export function ContactInfo() {
  return (
    <section id="visit" className="relative py-16 sm:py-24 md:py-28">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <SectionHeading
          eyebrow=""
          align="center"
          title={
            <>
              Drop by, or just <span className="text-gold-gradient">message us</span>
            </>
          }
        />

        <div className="mt-10 grid gap-8 sm:mt-14 lg:grid-cols-2 lg:gap-12">
          <div className="space-y-9">
            <div>
              <h3 className="eyebrow">Get in touch</h3>
              <ul className="mt-5 space-y-4 text-sm">
                <li>
                  <a
                    href={WHATSAPP_URL}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-start gap-3 text-muted-foreground transition-colors hover:text-gold"
                  >
                    <Phone className="mt-0.5 h-4 w-4 shrink-0 text-gold" />
                    <span>Mobile: {WHATSAPP_DISPLAY}</span>
                  </a>
                </li>
                <li>
                  <a
                    href={`mailto:${EMAIL}`}
                    className="flex items-start gap-3 text-muted-foreground transition-colors hover:text-gold"
                  >
                    <Mail className="mt-0.5 h-4 w-4 shrink-0 text-gold" />
                    <span>Email: {EMAIL}</span>
                  </a>
                </li>
                <li>
                  <a
                    href={MAPS_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={openExternal(MAPS_URL)}
                    className="flex items-start gap-3 text-muted-foreground transition-colors hover:text-gold"
                  >
                    <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-gold" />
                    <span>Address: {ADDRESS}</span>
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="eyebrow">Business hours</h3>
              <ul className="mt-5 space-y-2 text-sm">
                {hours.map(([day, time]) => (
                  <li key={day} className="flex items-center gap-3">
                    <Clock className="h-3.5 w-3.5 shrink-0 text-gold/70" />
                    <span className="w-28 text-foreground/90">{day}</span>
                    <span className={time === "Closed" ? "text-gold" : "text-muted-foreground"}>
                      {time}
                    </span>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="eyebrow">Follow us</h3>
              <ul className="mt-5 space-y-3 text-sm">
                {[
                  { name: "Instagram", url: INSTAGRAM_URL, icon: instagramIcon, label: `OG Customs Bangalore — ${INSTAGRAM_HANDLE}` },
                  { name: "YouTube", url: YOUTUBE_URL, icon: youtubeIcon, label: "OG Customs on YouTube" },
                  { name: "Facebook", url: FACEBOOK_URL, icon: facebookIcon, label: "OG Customs on Facebook" },
                ].map((s) => (
                  <li key={s.name}>
                    <a
                      href={s.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={openExternal(s.url)}
                      className="inline-flex items-center gap-3 text-muted-foreground transition-colors hover:text-gold"
                    >
                      <img src={s.icon} alt={`${s.name} logo`} className="h-5 w-5 object-contain" />
                      {s.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

          </div>

          <Reveal delay={0.1}>
            <a
              href={MAPS_URL}
              target="_blank"
              rel="noopener noreferrer"
              onClick={openExternal(MAPS_URL)}
              aria-label="Open OG Customs location in Google Maps"
              className="group relative block overflow-hidden rounded-xl border border-border"
            >
              <iframe
                src={MAP_EMBED}
                title="Map showing the OG Customs detailing studio in Domlur, Bengaluru"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="pointer-events-none h-72 w-full sm:h-[26rem]"
              />
              <span className="absolute right-3 bottom-3 inline-flex items-center gap-2 rounded-md bg-background/85 px-3 py-2 text-xs font-semibold text-foreground backdrop-blur-sm transition-colors group-hover:text-gold">
                <ExternalLink className="h-3.5 w-3.5" />
                Open in Google Maps
              </span>
            </a>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
