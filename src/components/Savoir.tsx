/** Encart « À savoir » : information à ne pas manquer (prix et délai). */
export function Savoir({ className = "" }: { className?: string }) {
  return (
    <aside role="note" className={`border-l-4 border-[#c9a85c] bg-neutral-950 p-6 text-left text-white shadow-lg md:p-8 ${className}`}>
      <p className="flex items-center gap-3 font-display text-3xl text-[#c9a85c]">
        <span aria-hidden className="flex h-8 w-8 items-center justify-center rounded-full bg-[#c9a85c] font-sans text-lg font-bold text-black">!</span>
        À savoir
      </p>
      <p className="mt-4 text-[16px] font-semibold leading-relaxed md:text-[17px]">
        Le prix et le délai de conception dépendent de vos choix : modèle, matières, tissus, couleurs, finitions et niveau de personnalisation. Chaque projet fait l'objet d'une étude personnalisée.
      </p>
    </aside>
  );
}
