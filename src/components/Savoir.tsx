/** Encart « À savoir » aux couleurs de la page : fond du site, filet et pastille à la teinte du modèle affiché. */
function pickAccent(hex?: string) {
  const m = /^#([0-9a-f]{6})$/i.exec(hex ?? "");
  if (!m) return "var(--foreground)";
  const n = parseInt(m[1]!, 16);
  const lum = (0.2126 * (n >> 16) + 0.7152 * ((n >> 8) & 255) + 0.0722 * (n & 255)) / 255;
  return lum > 0.72 ? "var(--foreground)" : hex!; // teinte trop claire : on retombe sur le noir du site
}

export function Savoir({ className = "", accent, tone = "white" }: { className?: string; accent?: string; tone?: "white" | "soft" }) {
  const c = pickAccent(accent);
  return (
    <aside
      role="note"
      style={{ borderLeftColor: c }}
      className={`border border-l-[6px] border-border p-6 text-left shadow-md md:p-8 ${tone === "soft" ? "bg-secondary" : "bg-background"} ${className}`}
    >
      <p className="flex items-center gap-3 font-display text-3xl italic text-foreground md:text-4xl">
        <span aria-hidden style={{ background: c }} className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full font-sans text-lg font-bold not-italic text-white">!</span>
        À savoir
      </p>
      <p className="mt-4 text-[16px] font-medium leading-relaxed text-foreground md:text-[17px]">
        Le prix et le délai de conception dépendent de vos choix : modèle, matières, tissus, couleurs, finitions et niveau de personnalisation. Chaque projet fait l'objet d'une étude personnalisée.
      </p>
    </aside>
  );
}
