import { useEffect, useState } from "react";
import { heroPhoto, universes } from "@/lib/maison";

const KEY = "maison-intro-seen";

/** Écran d'entrée : photo plein écran, nom de la maison, univers qui défilent, bouton « Entrer » (qui lance aussi la musique). */
export function Intro({ onDone }: { onDone: (visible: boolean) => void }) {
  const [show, setShow] = useState(true);
  const [leaving, setLeaving] = useState(false);
  const [i, setI] = useState(0);

  useEffect(() => {
    try { if (sessionStorage.getItem(KEY)) { setShow(false); onDone(false); return; } } catch { /* ignore */ }
    onDone(true);
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    if (!show) return;
    const t = setInterval(() => setI((x) => (x + 1) % universes.length), 1800);
    return () => clearInterval(t);
  }, [show]);

  const enter = () => {
    try { sessionStorage.setItem(KEY, "1"); } catch { /* ignore */ }
    setLeaving(true);
    onDone(false);
    setTimeout(() => setShow(false), 1100);
  };

  if (!show) return null;
  return (
    <div
      className={`fixed inset-0 z-[60] overflow-hidden bg-black text-white transition-all duration-[1100ms] ease-out ${leaving ? "pointer-events-none scale-105 opacity-0" : "opacity-100"}`}
      role="dialog" aria-label="Bienvenue"
    >
      <img src={heroPhoto} alt="" className="intro-zoom absolute inset-0 h-full w-full object-cover object-top opacity-60" />
      <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/30 to-black/85" />
      <div className="relative flex h-full flex-col items-center justify-between px-6 py-14 text-center">
        <p className="eyebrow animate-fade-up opacity-80">Calavi · Bénin</p>
        <div>
          <h1 className="animate-fade-up font-display text-6xl font-light leading-none md:text-9xl">Maison<br />Théodora</h1>
          <div className="relative mx-auto mt-8 h-8 overflow-hidden">
            {universes.map((u, k) => (
              <p key={u} className={`absolute inset-x-0 eyebrow transition-all duration-700 ${k === i ? "translate-y-0 opacity-100" : "translate-y-3 opacity-0"}`}>{u}</p>
            ))}
          </div>
        </div>
        <div className="flex flex-col items-center gap-4">
          <button onClick={enter} className="lv-btn-ghost intro-pulse px-10">Entrer dans l'univers</button>
          <p className="text-[11px] opacity-60">♪ Avec le son</p>
        </div>
      </div>
    </div>
  );
}
