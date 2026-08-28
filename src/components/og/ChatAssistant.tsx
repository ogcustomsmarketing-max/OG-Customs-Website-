import { useEffect, useRef, useState } from "react";
import { MessageCircle, Send, X } from "lucide-react";
import { WhatsAppIcon } from "./WhatsAppIcon";

import logo from "@/assets/og-monogram.png";
import { submitChatLead } from "@/lib/leads";
import { whatsappLink } from "./Reveal";
import { useScrolledPastHero } from "./useScrolledPastHero";


type Step = {
  id: string;
  question: string;
  options?: string[];
  placeholder?: string;
};

const STEPS: Step[] = [
  {
    id: "service",
    question: "Hey! OG Customs here. What can we help you with?",
    options: [
      "Ceramic Coating",
      "Paint Protection Film",
      "Paint Correction",
      "Interior Detailing",
      "Not sure yet",
    ],
  },
  {
    id: "car",
    question: "Nice. Which vehicle are we working on? (make & model)",
    placeholder: "e.g. Hyundai Creta",
  },
  {
    id: "condition",
    question: "How's the paint holding up right now?",
    options: ["Brand new", "Minor swirls & scratches", "Dull / faded", "Needs a full revival"],
  },
  {
    id: "name",
    question: "Got it. What's your name?",
    placeholder: "Your name",
  },
  {
    id: "phone",
    question: "And a number we can reach you on?",
    placeholder: "+91 ...",
  },
];

const INFO: Record<string, string> = {
  "Ceramic Coating":
    "Good pick. Coating puts a hard, water-repelling layer over your paint — dust rinses off, washes get easy, shine lasts years.",
  "Paint Protection Film":
    "PPF is a self-healing film over your paint. It takes the stone chips and scuffs so your bonnet and bumper don't.",
  "Paint Correction":
    "We machine-polish out the swirls and wash marks instead of hiding them, so the depth actually comes back.",
  "Interior Detailing":
    "Seats, dash, vents and roof lining deep-cleaned and treated. No dust, no smell, no sticky trim.",
  "Not sure yet":
    "That's fine — most owners start with an inspection. We look at the vehicle and tell you only what it actually needs.",
};

type Msg = { from: "bot" | "user"; text: string };

export function ChatAssistant() {
  const [open, setOpen] = useState(false);
  const [index, setIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [input, setInput] = useState("");
  const [badge, setBadge] = useState(false);
  const [dismissedBadge, setDismissedBadge] = useState(false);
  const [messages, setMessages] = useState<Msg[]>([{ from: "bot", text: STEPS[0].question }]);
  const scrollRef = useRef<HTMLDivElement>(null);
  const loggedRef = useRef(false);

  const step = STEPS[index];
  const done = index >= STEPS.length;
  const show = useScrolledPastHero();

  // Close the panel again if the visitor scrolls back up to the hero.
  useEffect(() => {
    if (!show) setOpen(false);
  }, [show]);

  // Attention badge on the chat bubble, 2s after the button appears.
  useEffect(() => {
    if (!show || open || dismissedBadge) return;
    const t = window.setTimeout(() => setBadge(true), 2000);
    return () => window.clearTimeout(t);
  }, [show, open, dismissedBadge]);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [messages, open]);


  function logConversation(finalAnswers: Record<string, string>, finalMessages: Msg[]) {
    if (loggedRef.current) return;
    loggedRef.current = true;
    submitChatLead({
      name: finalAnswers.name ?? "",
      phone: finalAnswers.phone ?? "",
      car: finalAnswers.car ?? "",
      service: finalAnswers.service ?? "",
      condition: finalAnswers.condition ?? "",
      transcript: finalMessages
        .map((m) => `${m.from === "bot" ? "OG" : "Customer"}: ${m.text}`)
        .join("\n")
        .slice(0, 4000),
    }).catch(() => undefined);
  }

  function answer(value: string) {
    const clean = value.trim();
    if (!clean || done) return;
    const next = { ...answers, [step.id]: clean };
    setAnswers(next);
    setInput("");

    const additions: Msg[] = [{ from: "user", text: clean }];
    if (step.id === "service" && INFO[clean]) additions.push({ from: "bot", text: INFO[clean] });

    const nextIndex = index + 1;
    if (nextIndex < STEPS.length) {
      additions.push({ from: "bot", text: STEPS[nextIndex].question });
    } else {
      additions.push({
        from: "bot",
        text: `Thanks ${next.name}! So that's ${next.service} for your ${next.car} — paint currently ${next.condition.toLowerCase()}. Tap below and we'll take it forward on WhatsApp.`,
      });
    }
    const allMessages = [...messages, ...additions];
    setMessages(allMessages);
    setIndex(nextIndex);

    if (nextIndex >= STEPS.length) logConversation(next, allMessages);
  }


  const summary = whatsappLink(
    [
      "Hi OG Customs, I used the chat assistant.",
      `Name: ${answers.name ?? ""}`,
      `Phone: ${answers.phone ?? ""}`,
      `Vehicle: ${answers.car ?? ""}`,
      `Service: ${answers.service ?? ""}`,
      `Paint condition: ${answers.condition ?? ""}`,
    ].join("\n"),
  );

  return (
    <>
      <button
        onClick={() => {
          setOpen((o) => !o);
          setBadge(false);
          setDismissedBadge(true);
        }}
        aria-label={open ? "Close chat assistant" : "Open chat assistant"}
        className={`fixed right-4 bottom-[5.5rem] z-50 grid h-14 w-14 place-items-center rounded-full bg-[image:var(--gradient-gold)] text-primary-foreground shadow-[var(--shadow-glow)] transition-all duration-300 hover:scale-105 sm:right-5 sm:bottom-24 ${
          show ? "opacity-100" : "pointer-events-none translate-y-4 opacity-0"
        }`}
      >
        {open ? <X className="h-6 w-6" /> : <MessageCircle className="h-6 w-6" />}
        {badge && !open ? (
          <span className="animate-badge-pop absolute -top-1 -right-1 grid h-6 w-6 place-items-center rounded-full bg-destructive text-[0.7rem] font-bold text-destructive-foreground ring-2 ring-background">
            1
          </span>
        ) : null}
      </button>

      {open && show ? (
        <div className="fixed right-4 bottom-[10.5rem] z-50 flex h-[min(30rem,calc(100svh-13rem))] w-[calc(100vw-2rem)] max-w-sm sm:right-5 sm:bottom-44 flex-col overflow-hidden rounded-xl border border-border bg-background/95 shadow-[var(--shadow-glow)] backdrop-blur-md">
          <div className="flex items-center gap-3 border-b border-border px-4 py-3">
            <img src={logo} alt="OG Customs" width={64} height={64} className="h-8 w-8 object-contain" />
            <div>
              <p className="text-sm font-semibold text-foreground">OG Assistant</p>
              <p className="text-xs text-muted-foreground">Replies in a few minutes</p>
            </div>
          </div>

          <div ref={scrollRef} className="flex-1 space-y-3 overflow-y-auto px-4 py-4">
            {messages.map((m, i) => (
              <div
                key={i}
                className={
                  m.from === "user"
                    ? "ml-auto max-w-[85%] rounded-lg bg-[image:var(--gradient-gold)] px-3 py-2 text-sm text-primary-foreground"
                    : "max-w-[90%] text-sm leading-relaxed text-foreground"
                }
              >
                {m.text}
              </div>
            ))}

            {!done && step.options ? (
              <div className="flex flex-wrap gap-2 pt-1">
                {step.options.map((o) => (
                  <button
                    key={o}
                    onClick={() => answer(o)}
                    className="rounded-full border border-border px-3 py-1.5 text-xs text-muted-foreground transition-colors hover:border-gold/60 hover:text-gold"
                  >
                    {o}
                  </button>
                ))}
              </div>
            ) : null}

            {done ? (
              <a
                href={summary}
                target="_blank"
                rel="noreferrer"
                className="mt-2 inline-flex w-full items-center justify-center gap-2 rounded-md bg-whatsapp px-4 py-2.5 text-sm font-semibold text-whatsapp-foreground"
              >
                <WhatsAppIcon className="h-4 w-4" />
                Continue on WhatsApp
              </a>
            ) : null}
          </div>

          {!done && !step.options ? (
            <form
              onSubmit={(e) => {
                e.preventDefault();
                answer(input);
              }}
              className="flex items-center gap-2 border-t border-border px-3 py-3"
            >
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                maxLength={80}
                placeholder={step.placeholder}
                className="w-full rounded-md border border-border bg-background/40 px-3 py-2 text-base sm:text-sm text-foreground placeholder:text-muted-foreground/70 outline-none focus:border-gold/60"
              />
              <button
                type="submit"
                aria-label="Send"
                className="grid h-9 w-9 shrink-0 place-items-center rounded-md bg-[image:var(--gradient-gold)] text-primary-foreground"
              >
                <Send className="h-4 w-4" />
              </button>
            </form>
          ) : null}
        </div>
      ) : null}
    </>
  );
}
