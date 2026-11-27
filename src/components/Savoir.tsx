/** Encart « À savoir » : écriture noire sur fond blanc, bien visible. */
export function Savoir({ className = "" }: { className?: string; accent?: string; tone?: "white" | "soft" }) {
  return (
    <aside role="note" className={`border border-l-[6px] border-black bg-white p-6 text-left text-black shadow-md md:p-8 ${className}`}>
      <p className="flex items-center gap-3 font-display text-3xl italic md:text-4xl">
        <span aria-hidden className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-black font-sans text-lg font-bold not-italic text-white">!</span>
        À savoir
      </p>
      <p className="mt-4 text-[16px] font-semibold leading-relaxed md:text-[17px]">
        Le prix et le délai de conception dépendent de vos choix : modèle, matières, tissus, couleurs, finitions et niveau de personnalisation. Chaque projet fait l'objet d'une étude personnalisée.
      </p>
    </aside>
  );
}
