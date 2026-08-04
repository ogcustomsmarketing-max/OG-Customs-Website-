export const SERVICE_SELECT_EVENT = "og:select-service";

export const SERVICES = [
  "Ceramic Coating",
  "Paint Protection Film",
  "Car Detailing",
  "Interior Detailing",
  "Exterior Detailing",
  "Paint Correction",
  "Wash & Maintenance Care",
  "Special Care Packages",
  "Not sure — need your advice",
] as const;

export function pickService(service: string) {
  window.dispatchEvent(new CustomEvent(SERVICE_SELECT_EVENT, { detail: service }));
  document.getElementById("contact")?.scrollIntoView({ behavior: "smooth", block: "start" });
}
