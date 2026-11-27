import { useEffect, useRef, useState } from "react";
import { creatorPhotos } from "@/lib/maison";

/** Défilement horizontal des photos de la créatrice (balayage au doigt + avance automatique). */
export function CreatorSlider() {
  const ref = useRef<HTMLDivElement>(null);
  const [idx, setIdx] = useState(0);
  const paused = useRef(false);

  useEffect(() => {
    const t = setInterval(() => {
      const el = ref.current;
      if (!el || paused.current) return;
      const next = (Math.round(el.scrollLeft / el.clientWidth) + 1) % creatorPhotos.length;
      el.scrollTo({ left: next * el.clientWidth, behavior: "smooth" });
    }, 4500);
    return () => clearInterval(t);
  }, []);

  return (
    <div className="relative h-[75svh] md:h-full">
      <div
        ref={ref}
        onScroll={(e) => setIdx(Math.round(e.currentTarget.scrollLeft / e.currentTarget.clientWidth))}
        onPointerDown={() => { paused.current = true; }}
        onPointerUp={() => { setTimeout(() => { paused.current = false; }, 6000); }}
        className="flex h-full snap-x snap-mandatory overflow-x-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        {creatorPhotos.map((src, k) => (
          <img key={src} src={src} alt={`La créatrice, photo ${k + 1}`} loading={k === 0 ? "eager" : "lazy"} className="h-full w-full shrink-0 snap-center object-cover object-top" />
        ))}
      </div>
      <div className="pointer-events-none absolute inset-x-0 bottom-5 flex justify-center gap-2">
        {creatorPhotos.map((_, k) => <span key={k} className={`h-1.5 rounded-full bg-white transition-all ${k === idx ? "w-6 opacity-100" : "w-1.5 opacity-50"}`} />)}
      </div>
    </div>
  );
}
