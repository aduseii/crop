export type FormatId = "tight" | "square" | "story" | "sitcom" | "custom";

export const FORMATS: Record<Exclude<FormatId, "custom">, { w: number; h: number; label: string }> = {
  tight: { w: 1080, h: 1080, label: "Tight" },
  square: { w: 1080, h: 1080, label: "Square" },
  story: { w: 1080, h: 1920, label: "Story" },
  sitcom: { w: 1080, h: 1620, label: "Sitcom 2:3" },
};

export function resolveFormat(id: FormatId, customW = 1080, customH = 1080) {
  if (id === "custom") return { w: customW, h: customH, label: "Custom" };
  return FORMATS[id];
}
