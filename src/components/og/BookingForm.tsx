import { useEffect, useState } from "react";
import { Mail } from "lucide-react";
import { useServerFn } from "@tanstack/react-start";
import { WhatsAppIcon } from "./WhatsAppIcon";

import { submitFormLead } from "@/lib/leads.functions";
import { SERVICES, SERVICE_SELECT_EVENT } from "@/lib/service-select";
import { EMAIL, whatsappLink } from "./Reveal";

const inputClass =
  "w-full rounded-md border border-border bg-background/40 px-4 py-3 text-base text-foreground sm:text-sm placeholder:text-muted-foreground/70 outline-none transition-colors focus:border-gold/60";


export function LeadForm({ className = "" }: { className?: string }) {
  const [form, setForm] = useState({
    name: "",
    phone: "",
    car: "",
    service: SERVICES[0] as string,
    message: "",
  });
  const [error, setError] = useState("");
  const [sending, setSending] = useState(false);
  const logLead = useServerFn(submitFormLead);

  useEffect(() => {
    const onPick = (e: Event) => {
      const service = (e as CustomEvent<string>).detail;
      if (SERVICES.includes(service as (typeof SERVICES)[number])) {
        setForm((prev) => ({ ...prev, service }));
      }
    };
    window.addEventListener(SERVICE_SELECT_EVENT, onPick);
    return () => window.removeEventListener(SERVICE_SELECT_EVENT, onPick);
  }, []);


  const set = (key: keyof typeof form) => (value: string) =>
    setForm((prev) => ({ ...prev, [key]: value }));

  function buildMessage() {
    return [
      "Hi OG Customs, I'd like to book an inspection.",
      `Name: ${form.name.trim()}`,
      `Phone: ${form.phone.trim()}`,
      `Car: ${form.car.trim()}`,
      `Service: ${form.service}`,
      form.message.trim() ? `Notes: ${form.message.trim()}` : "",
    ]
      .filter(Boolean)
      .join("\n");
  }

  function validate() {
    if (form.name.trim().length < 2) return "Please enter your name.";
    if (!/^[\d+\s-]{8,15}$/.test(form.phone.trim())) return "Please enter a valid phone number.";
    if (form.car.trim().length < 2) return "Please tell us your car make and model.";
    if (form.message.length > 500) return "Please keep notes under 500 characters.";
    return "";
  }

  function submit(channel: "whatsapp" | "email") {
    const err = validate();
    setError(err);
    if (err) return;
    const body = buildMessage();

    // Open the handoff synchronously so browsers don't block the popup.
    if (channel === "whatsapp") {
      window.open(whatsappLink(body), "_blank", "noreferrer");
    } else {
      window.location.href = `mailto:${EMAIL}?subject=${encodeURIComponent(
        `Inspection request — ${form.name.trim()}`,
      )}&body=${encodeURIComponent(body)}`;
    }

    // Log the lead to the sheet in the background; never block the customer.
    setSending(true);
    logLead({
      data: {
        name: form.name.trim(),
        phone: form.phone.trim(),
        car: form.car.trim(),
        service: form.service,
        message: form.message.trim(),
        channel,
      },
    })
      .catch(() => undefined)
      .finally(() => setSending(false));
  }

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        submit("whatsapp");
      }}
      className={`rounded-xl border border-border bg-graphite/40 p-5 text-left backdrop-blur-sm sm:p-8 ${className}`}
    >
      <div className="grid gap-4 sm:grid-cols-2">
        <input
          className={inputClass}
          placeholder="Your name"
          maxLength={80}
          value={form.name}
          onChange={(e) => set("name")(e.target.value)}
        />
        <input
          className={inputClass}
          placeholder="Phone number"
          maxLength={15}
          inputMode="tel"
          value={form.phone}
          onChange={(e) => set("phone")(e.target.value)}
        />
      </div>
      <input
        className={`${inputClass} mt-4`}
        placeholder="Car make & model (e.g. Hyundai Creta)"
        maxLength={80}
        value={form.car}
        onChange={(e) => set("car")(e.target.value)}
      />
      <select
        className={`${inputClass} mt-4`}
        value={form.service}
        onChange={(e) => set("service")(e.target.value)}
      >
        {SERVICES.map((s) => (
          <option key={s} value={s} className="bg-background">
            {s}
          </option>
        ))}
      </select>
      <textarea
        className={`${inputClass} mt-4 min-h-24 resize-y`}
        placeholder="Anything bothering you about the car? (optional)"
        maxLength={500}
        value={form.message}
        onChange={(e) => set("message")(e.target.value)}
      />
      {error ? <p className="mt-3 text-sm text-destructive">{error}</p> : null}
      <div className="mt-6 flex flex-col gap-3 sm:flex-row">
        <button
          type="submit"
          disabled={sending}
          className="group inline-flex flex-1 items-center justify-center gap-2 rounded-md bg-whatsapp px-6 py-3.5 text-sm font-semibold text-whatsapp-foreground transition-all duration-300 hover:brightness-110 disabled:opacity-70"
        >
          <WhatsAppIcon className="h-4 w-4" />
          Send on WhatsApp
        </button>

        <button
          type="button"
          onClick={() => submit("email")}
          className="inline-flex items-center justify-center gap-2 rounded-md border border-border bg-background/30 px-6 py-3.5 text-sm font-semibold text-foreground transition-all duration-300 hover:border-gold/50"
        >
          <Mail className="h-4 w-4" />
          Email instead
        </button>
      </div>
    </form>
  );
}
