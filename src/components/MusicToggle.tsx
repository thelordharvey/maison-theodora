import { useEffect, useRef, useState } from "react";

const KEY = "maison-music";

/** Musique d'ambiance : démarre dès la 1re interaction (les navigateurs bloquent l'autoplay), bouton ♪ pour couper/relancer. */
export function MusicToggle({ className = "" }: { className?: string }) {
  const ref = useRef<HTMLAudioElement | null>(null);
  const [on, setOn] = useState(false);
  const wanted = useRef(true); // l'utilisateur n'a pas coupé la musique

  useEffect(() => {
    try { if (localStorage.getItem(KEY) === "off") wanted.current = false; } catch { /* ignore */ }
    const a = ref.current;
    if (!a) return;
    a.volume = 0.35;
    const start = () => {
      if (!wanted.current) return;
      a.play().then(() => { setOn(true); off(); }).catch(() => { /* attend la prochaine interaction */ });
    };
    const events = ["pointerdown", "touchend", "click", "keydown"] as const;
    const off = () => events.forEach((e) => window.removeEventListener(e, start));
    events.forEach((e) => window.addEventListener(e, start, { passive: true }));
    start();
    const vis = () => { if (document.hidden) a.pause(); else if (wanted.current && a.paused && on) void a.play().catch(() => {}); };
    document.addEventListener("visibilitychange", vis);
    const sync = () => setOn(!a.paused);
    a.addEventListener("play", sync); a.addEventListener("pause", sync);
    return () => { off(); document.removeEventListener("visibilitychange", vis); a.removeEventListener("play", sync); a.removeEventListener("pause", sync); };
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const toggle = () => {
    const a = ref.current;
    if (!a) return;
    if (a.paused) {
      wanted.current = true;
      try { localStorage.setItem(KEY, "on"); } catch { /* ignore */ }
      void a.play().catch(() => {});
    } else {
      wanted.current = false;
      try { localStorage.setItem(KEY, "off"); } catch { /* ignore */ }
      a.pause();
    }
  };

  return (
    <>
      <audio ref={ref} src="/maison/ambiance.mp3" loop preload="auto" />
      <button
        type="button"
        onClick={toggle}
        aria-label={on ? "Couper la musique" : "Activer la musique"}
        aria-pressed={on}
        className={`relative flex h-8 w-8 items-center justify-center rounded-full border border-current text-[14px] leading-none ${className}`}
      >
        <span aria-hidden>♪</span>
        {!on && <span aria-hidden className="absolute h-px w-5 rotate-45 bg-current" />}
      </button>
    </>
  );
}
