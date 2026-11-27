import { describe, expect, it } from "vitest";
import { buildOrderMessage, whatsappLink } from "@/lib/maison";

describe("order message", () => {
  it("includes chosen model and measurements, skips blanks", () => {
    const msg = buildOrderMessage({ modelId: "signature", fabric: "Satin", color: "Rose", finishes: ["Perles"], level: "", name: "Awa", occasion: "", date: "", bust: "88", waist: "", hips: "", height: "", message: "" });
    expect(msg).toContain("01 — Signature");
    expect(msg).toContain("Tour de poitrine : 88 cm");
    expect(msg).not.toContain("Tour de taille");
  });
  it("targets the creator's WhatsApp number", () => {
    expect(whatsappLink("hi")).toBe("https://wa.me/22944007806?text=hi");
  });
});
