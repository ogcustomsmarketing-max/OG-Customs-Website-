import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

const trimmed = (max: number) => z.string().trim().max(max);

const formLeadSchema = z.object({
  name: trimmed(80).min(2),
  phone: trimmed(20).min(6),
  car: trimmed(80).min(1),
  service: trimmed(80),
  message: trimmed(500).default(""),
  channel: z.enum(["whatsapp", "email"]),
});

const chatLeadSchema = z.object({
  name: trimmed(80).default(""),
  phone: trimmed(20).default(""),
  car: trimmed(80).default(""),
  service: trimmed(80).default(""),
  condition: trimmed(80).default(""),
  transcript: trimmed(4000).default(""),
});

export const submitFormLead = createServerFn({ method: "POST" })
  .inputValidator((data: unknown) => formLeadSchema.parse(data))
  .handler(async ({ data }) => {
    const { appendRow, nowIST } = await import("./leads.server");
    try {
      await appendRow("form", [
        nowIST(),
        data.name,
        data.phone,
        data.car,
        data.service,
        data.message,
        data.channel === "whatsapp" ? "Website form → WhatsApp" : "Website form → Email",
      ]);
      return { ok: true as const };
    } catch {
      return { ok: false as const };
    }
  });

export const submitChatLead = createServerFn({ method: "POST" })
  .inputValidator((data: unknown) => chatLeadSchema.parse(data))
  .handler(async ({ data }) => {
    const { appendRow, nowIST } = await import("./leads.server");
    try {
      await appendRow("chat", [
        nowIST(),
        data.name,
        data.phone,
        data.car,
        data.service,
        data.condition,
        data.transcript,
      ]);
      return { ok: true as const };
    } catch {
      return { ok: false as const };
    }
  });
