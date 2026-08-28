export const SERVICE_SELECT_EVENT = "og:select-service";

export const SERVICES = [
  "Paint Restoration",
  "Paint Protection Film (PPF)",
  "Ceramic Coating",
  "Sun Film",
  "Other Services",
  "Wash & Maintenance Care",
  "Not sure — need your advice",
] as const;

export function pickService(service: string) {
  window.dispatchEvent(new CustomEvent(SERVICE_SELECT_EVENT, { detail: service }));
  document.getElementById("contact")?.scrollIntoView({ behavior: "smooth", block: "start" });
}
