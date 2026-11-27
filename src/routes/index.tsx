import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useMemo, useState } from "react";
import { CreatorSlider } from "@/components/CreatorSlider";
import { Intro } from "@/components/Intro";
import { MusicToggle } from "@/components/MusicToggle";
import { Savoir } from "@/components/Savoir";
import { Viewer3D } from "@/components/Viewer3D";
import {
  buildOrderMessage, colors, fabrics, finishes, gallery, heroPhoto, INSTAGRAM, levels, models, PHONE,
  TIKTOK, universes, whatsappLink, type Model, type Order, type Universe,
} from "@/lib/maison";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Maison Théodora — Créations sur mesure & essayage 3D" },
      { name: "description", content: `Découvrez les ${models.length} créations de Maison Théodora, visualisez-les en 3D et composez votre pièce sur mesure.` },
      { property: "og:title", content: "Maison Théodora — Créations sur mesure" },
      { property: "og:description", content: "Collection couture, mannequin 3D et atelier de personnalisation." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

const emptyOrder: Order = { modelId: "", fabric: "", color: "", finishes: [], level: "", name: "", occasion: "", date: "", bust: "", waist: "", hips: "", height: "", message: "" };

function Index() {
  const [scrolled, setScrolled] = useState(false);
  const [menu, setMenu] = useState(false);
  const [intro, setIntro] = useState(true);
  const [filter, setFilter] = useState<Universe | "Tout">("Tout");
  const [open, setOpen] = useState<Model | null>(null);
  const [order, setOrder] = useState<Order>(emptyOrder);

  useEffect(() => {
    const on = () => setScrolled(window.scrollY > 40);
    on(); window.addEventListener("scroll", on); return () => window.removeEventListener("scroll", on);
  }, []);
  useEffect(() => { document.body.style.overflow = open || menu || intro ? "hidden" : ""; }, [open, menu, intro]);

  const startOrder = (m: Model) => {
    setOrder((o) => ({ ...o, modelId: m.id }));
    setOpen(null);
    setTimeout(() => document.getElementById("atelier")?.scrollIntoView({ behavior: "smooth" }), 50);
  };
  const list = filter === "Tout" ? models : models.filter((m) => m.universe === filter);
  const nav = [["Collection", "#collection"], ["Univers", "#univers"], ["La créatrice", "#maison"], ["Atelier sur mesure", "#atelier"], ["Contact", "#contact"]];

  return (
    <div className="bg-background text-foreground">
      <Intro onDone={setIntro} />
      <MusicToggle className="fixed bottom-5 right-4 z-30" />
      <a href={`tel:${PHONE}`} aria-label="Téléphoner" className="fixed bottom-5 left-4 z-30 flex h-12 w-12 items-center justify-center rounded-full bg-[#25a244] text-white shadow-lg transition hover:scale-105">
        <svg viewBox="0 0 24 24" className="h-6 w-6" fill="currentColor" aria-hidden><path d="M6.6 10.8a15.1 15.1 0 0 0 6.6 6.6l2.2-2.2a1 1 0 0 1 1-.25c1.1.37 2.3.57 3.6.57a1 1 0 0 1 1 1V20a1 1 0 0 1-1 1A17 17 0 0 1 3 4a1 1 0 0 1 1-1h3.5a1 1 0 0 1 1 1c0 1.25.2 2.45.57 3.6a1 1 0 0 1-.25 1z" /></svg>
      </a>
      <header className={`fixed inset-x-0 top-0 z-40 transition-colors duration-500 ${scrolled ? "border-b border-border bg-background text-foreground" : "text-on-image"}`}>
        <div className="grid h-16 grid-cols-[1fr_auto_1fr] items-center gap-2 px-4 md:px-10">
          <button onClick={() => setMenu(true)} aria-label="Menu" className="flex items-center gap-3 justify-self-start text-[13px]">
            <span className="flex flex-col gap-[5px]"><span className="h-px w-5 bg-current" /><span className="h-px w-5 bg-current" /></span>
            <span className="hidden sm:inline">Menu</span>
          </button>
          <a href="#top" className="justify-self-center whitespace-nowrap font-display text-xl tracking-wide md:text-3xl">Maison Théodora</a>
          <span />
        </div>
      </header>

      {menu && (
        <div className="fixed inset-0 z-50 flex">
          <nav className="animate-fade-up flex w-full max-w-sm flex-col bg-background p-10">
            <button onClick={() => setMenu(false)} className="mb-12 self-start text-[13px]">✕ Fermer</button>
            {nav.map(([l, h]) => <a key={h} href={h} onClick={() => setMenu(false)} className="py-3 text-2xl font-light">{l}</a>)}
            <a href={whatsappLink()} target="_blank" rel="noopener" className="mt-auto text-[13px] underline underline-offset-4">WhatsApp +229 44 00 78 06</a>
          </nav>
          <button aria-label="Fermer" onClick={() => setMenu(false)} className="flex-1 bg-overlay" />
        </div>
      )}

      {/* HERO */}
      <section id="top" className="relative h-[100svh] overflow-hidden">
        <img src={heroPhoto} alt="Portrait de la créatrice" className="absolute inset-0 h-full w-full object-cover object-top" />
        <div className="absolute inset-0 bg-overlay" />
        <div className="relative flex h-full flex-col items-center justify-end pb-20 text-center text-on-image">
          <p className="eyebrow animate-fade-up">Création · Élégance · Identité</p>
          <h1 className="animate-fade-up mt-5 font-display text-5xl font-normal md:text-8xl">L'art de s'habiller</h1>
          <div className="animate-fade-up mt-10 flex flex-wrap justify-center gap-3">
            <a href="#collection" className="lv-btn-ghost">Découvrir la collection</a>
            <a href="#atelier" className="lv-btn-ghost">Créer ma pièce</a>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-2xl px-6 py-24 text-center">
        <p className="eyebrow text-muted-foreground">Création sur mesure</p>
        <h2 className="mt-6 font-display text-4xl md:text-5xl">Révéler une identité.</h2>
        <p className="mt-6 text-[15px] leading-relaxed text-muted-foreground">Des créations pensées pour révéler une personnalité et une manière unique de se présenter au monde. Chaque modèle se découvre désormais en 3D, puis se compose à votre image.</p>
      </section>

      {/* UNIVERS */}
      <section id="univers" className="px-5 pb-24 md:px-10">
        <h2 className="mb-10 text-center text-2xl font-light">Choisir un univers</h2>
        <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
          {universes.map((u) => {
            const m = models.find((x) => x.universe === u)!;
            return (
              <a key={u} href="#collection" onClick={() => setFilter(u)} className="group relative aspect-[3/4] overflow-hidden md:aspect-[4/5]">
                <img src={m.image} alt={u} loading="lazy" className="h-full w-full object-cover object-top transition duration-1000 group-hover:scale-105" />
                <div className="absolute inset-0 bg-gradient-to-t from-overlay to-transparent" />
                <div className="absolute inset-x-0 bottom-6 text-center text-on-image">
                  <p className="text-lg font-light md:text-2xl">{u}</p>
                  <p className="mt-1 text-[12px] underline underline-offset-4 opacity-90">Découvrir</p>
                </div>
              </a>
            );
          })}
        </div>
      </section>

      {/* COLLECTION */}
      <section id="collection" className="border-t border-border px-5 py-20 md:px-10">
        <div className="mb-10 flex flex-col items-center gap-6">
          <h2 className="text-2xl font-light">La collection <span className="text-muted-foreground">· {list.length} créations</span></h2>
          <div className="flex flex-wrap justify-center gap-2">
            {(["Tout", ...universes] as const).map((u) => <button key={u} data-active={filter === u} onClick={() => setFilter(u)} className="chip">{u}</button>)}
          </div>
        </div>
        <div className="grid grid-cols-2 gap-x-3 gap-y-10 md:grid-cols-3 lg:grid-cols-4">
          {list.map((m) => (
            <button key={m.id} onClick={() => setOpen(m)} className="group text-left">
              <div className="relative aspect-[3/4] overflow-hidden bg-stage">
                <img src={m.image} alt={m.name} loading="lazy" className="h-full w-full object-cover object-top transition duration-700 group-hover:scale-105" />
                <span className="absolute left-3 top-3 rounded-full bg-background px-3 py-1 text-[11px]">Voir en 3D</span>
              </div>
              <p className="mt-3 text-[11px] text-muted-foreground">{m.number} — {m.universe}</p>
              <p className="text-[15px]">{m.name}</p>
              <p className="text-[13px] text-muted-foreground">{m.subtitle}</p>
            </button>
          ))}
        </div>
      </section>

      {/* CREATRICE */}
      <section id="maison" className="grid md:grid-cols-2">
        <CreatorSlider />
        <div className="flex flex-col justify-center bg-secondary px-8 py-20 md:px-20">
          <p className="eyebrow text-muted-foreground">La créatrice</p>
          <h2 className="mt-6 font-display text-4xl md:text-5xl">Une histoire de passion.</h2>
          <div className="mt-8 space-y-4 text-[15px] leading-relaxed text-muted-foreground">
            <p>Je suis Tossou Flora Théodora Ahouéfa. J'ai 20 ans et je vis à Calavi, au Bénin. Je crée des vêtements pour femmes et hommes, qui vous vont parfaitement et vous donnent confiance dès que vous les portez.</p>
            <p>Étudiante en deuxième année à l'école de mode ESDAM, je prépare aussi une licence d'anglais. Ce double parcours m'a appris le sérieux, l'organisation et l'ouverture d'esprit.</p>
            <p>Je suis également mannequin photo : je comprends comment un vêtement tombe, bouge et se révèle une fois porté. Derrière chaque création, il y a aussi moi, devant l'objectif.</p>
          </div>
        </div>
      </section>

      <section className="py-20">
        <h2 className="mb-10 px-5 text-center text-2xl font-light">Derrière les créations</h2>
        <div className="flex snap-x gap-3 overflow-x-auto px-5 pb-4 md:px-10">
          {gallery.map((g, i) => <img key={g} src={g} alt={`Séance photo ${i + 1}`} loading="lazy" className="h-[60vh] w-auto shrink-0 snap-start object-cover" />)}
        </div>
      </section>

      <Atelier order={order} setOrder={setOrder} />

      {/* CONTACT */}
      <section id="contact" className="relative">
        <img src={gallery[2]} alt="" className="absolute inset-0 h-full w-full object-cover" />
        <div className="absolute inset-0 bg-overlay" />
        <div className="relative mx-auto max-w-xl px-6 py-32 text-center text-on-image">
          <p className="eyebrow">Contact</p>
          <h2 className="mt-6 font-display text-4xl md:text-6xl">Créons quelque chose d'unique.</h2>
          <p className="mt-6 text-[15px] opacity-90">Pour une commande, une création sur mesure ou simplement échanger sur un projet, contactez directement la créatrice.</p>
          <div className="mt-10 flex flex-wrap justify-center gap-3">
            <a href={whatsappLink()} target="_blank" rel="noopener" className="lv-btn-ghost">WhatsApp</a>
            <a href={`tel:${PHONE}`} className="lv-btn-ghost">Appeler</a>
            <a href={INSTAGRAM} target="_blank" rel="noopener noreferrer" className="lv-btn-ghost">Instagram</a>
            <a href={TIKTOK} target="_blank" rel="noopener noreferrer" className="lv-btn-ghost">TikTok</a>
          </div>
        </div>
      </section>
      <footer className="flex flex-col items-center gap-4 border-t border-border py-12">
        <div className="flex items-center gap-6 text-[13px]">
          <a href={INSTAGRAM} target="_blank" rel="noopener noreferrer" className="underline underline-offset-4">Instagram</a>
          <a href={TIKTOK} target="_blank" rel="noopener noreferrer" className="underline underline-offset-4">TikTok</a>
        </div>
        <p className="text-[12px] text-muted-foreground">Calavi, Bénin · © {new Date().getFullYear()}</p>
      </footer>

      {open && <ModelSheet model={open} onClose={() => setOpen(null)} onOrder={startOrder} />}
    </div>
  );
}

function ModelSheet({ model, onClose, onOrder }: { model: Model; onClose: () => void; onOrder: (m: Model) => void }) {
  const [view, setView] = useState<"3d" | "photo">("3d");
  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-background animate-fade-up">
      <button onClick={onClose} className="fixed right-5 top-5 z-10 rounded-full bg-background px-4 py-2 text-[13px] border border-border">✕ Fermer</button>
      <div className="grid min-h-full lg:grid-cols-[1fr_1fr_420px]">
        <div className="h-[70vh] lg:h-screen lg:sticky lg:top-0 hidden lg:block"><img src={model.image} alt={model.name} className="h-full w-full object-cover object-top" /></div>
        <div className="flex flex-col lg:sticky lg:top-0 lg:h-screen">
          <div className="flex gap-2 px-5 pb-4 pt-5 lg:hidden">
            {(["3d", "photo"] as const).map((v) => <button key={v} data-active={view === v} onClick={() => setView(v)} className="chip bg-background">{v === "3d" ? "Mannequin 3D" : "Photo"}</button>)}
          </div>
          <div className="relative mx-4 h-[62svh] overflow-hidden lg:mx-0 lg:h-full">
            {view === "photo" ? <img src={model.image} alt={model.name} className="h-full w-full object-cover object-top lg:hidden" /> : null}
            <div className={view === "photo" ? "hidden lg:block h-full" : "h-full"}><Viewer3D model={model} /></div>
          </div>
        </div>
        <div className="flex flex-col justify-center px-8 py-16">
          <p className="text-[12px] text-muted-foreground">{model.number} — Création · {model.universe}</p>
          <h2 className="mt-3 text-3xl font-light">{model.name}</h2>
          <p className="mt-1 font-display text-xl italic text-muted-foreground">{model.subtitle}</p>
          <p className="mt-6 text-[14px] leading-relaxed text-muted-foreground">{model.description}</p>
          <Savoir className="mt-8" />
          <div className="mt-10 flex flex-col gap-3">
            <button onClick={() => onOrder(model)} className="lv-btn">Personnaliser cette pièce</button>
            <a href={whatsappLink(`Bonjour, je suis intéressé(e) par la création ${model.name}.`)} target="_blank" rel="noopener" className="lv-btn-outline">Échanger sur WhatsApp</a>
          </div>
        </div>
      </div>
    </div>
  );
}

const steps = ["Modèle", "Tissu", "Couleur", "Finitions", "Mesures", "Envoi"] as const;

function Atelier({ order, setOrder }: { order: Order; setOrder: React.Dispatch<React.SetStateAction<Order>> }) {
  const [step, setStep] = useState(0);
  useEffect(() => { if (order.modelId && step === 0) setStep(1); }, [order.modelId]); // eslint-disable-line react-hooks/exhaustive-deps
  const model = models.find((m) => m.id === order.modelId) ?? models[4]!;
  const colorHex = colors.find((c) => c.id === order.color)?.hex || undefined;
  const set = <K extends keyof Order>(k: K, v: Order[K]) => setOrder((o) => ({ ...o, [k]: v }));
  const message = useMemo(() => buildOrderMessage(order), [order]);
  const canNext = [order.modelId, order.fabric, order.color, order.level, "ok", "ok"][step];

  return (
    <section id="atelier" className="border-t border-border bg-secondary">
      <div className="px-5 pt-20 text-center md:px-10">
        <p className="eyebrow text-muted-foreground">Projet sur mesure</p>
        <h2 className="mt-5 font-display text-4xl md:text-6xl">Créez votre pièce.</h2>
        <p className="mx-auto mt-5 max-w-lg text-[14px] text-muted-foreground">Choisissez votre modèle, vos matières, couleurs et finitions : le mannequin s'habille en direct. Chaque projet est étudié individuellement.</p>
        <Savoir className="mx-auto mt-10 max-w-2xl" />
      </div>
      <div className="grid grid-cols-[minmax(0,1fr)] gap-0 py-14 lg:grid-cols-2">
        <div className="relative flex flex-col pb-6 lg:sticky lg:top-16 lg:block lg:h-[calc(100vh-4rem)] lg:pb-0">
          <div className="relative z-10 mx-5 mb-5 flex w-fit items-center gap-3 bg-background p-2 pr-4 lg:absolute lg:left-5 lg:top-5 lg:m-0">
            <img src={model.image} alt="" className="h-14 w-11 object-cover object-top" />
            <div><p className="text-[11px] text-muted-foreground">{model.number} · {model.universe}</p><p className="text-[14px]">{model.name}</p></div>
          </div>
          <div className="mx-5 h-[62svh] overflow-hidden lg:mx-0 lg:h-full">
            <Viewer3D model={model} colorHex={colorHex} fabric={order.fabric} finishes={order.finishes} />
          </div>
        </div>
        <div className="bg-background px-6 py-10 md:px-14">
          <ol className="mb-10 flex flex-wrap gap-x-5 gap-y-2 text-[12px]">
            {steps.map((s, i) => (
              <li key={s}><button onClick={() => setStep(i)} className={i === step ? "underline underline-offset-8" : i < step ? "" : "text-muted-foreground"}>{i + 1}. {s}</button></li>
            ))}
          </ol>

          {step === 0 && (
            <Step title="Choisissez votre modèle">
              <div className="grid grid-cols-3 gap-2 sm:grid-cols-4">
                {models.map((m) => (
                  <button key={m.id} onClick={() => set("modelId", m.id)} className={`text-left ${order.modelId === m.id ? "outline outline-1 outline-foreground outline-offset-2" : ""}`}>
                    <img src={m.image} alt={m.name} loading="lazy" className="aspect-[3/4] w-full object-cover object-top" />
                    <p className="mt-1 truncate text-[12px]">{m.name}</p>
                  </button>
                ))}
              </div>
            </Step>
          )}
          {step === 1 && (
            <Step title="Matière / tissu">
              <div className="flex flex-wrap gap-2">{fabrics.map((f) => <button key={f.id} data-active={order.fabric === f.id} onClick={() => set("fabric", f.id)} className="chip">{f.id}</button>)}</div>
            </Step>
          )}
          {step === 2 && (
            <Step title="Couleur">
              <div className="grid grid-cols-5 gap-3">
                {colors.map((c) => (
                  <button key={c.id} onClick={() => set("color", c.id)} className="flex flex-col items-center gap-2 text-[11px]">
                    <span className={`h-11 w-11 rounded-full border ${order.color === c.id ? "ring-1 ring-foreground ring-offset-2" : "border-border"}`} style={{ background: c.hex || model.color }} />
                    {c.id}
                  </button>
                ))}
              </div>
            </Step>
          )}
          {step === 3 && (
            <Step title="Finitions & niveau de personnalisation">
              <p className="mb-3 text-[12px] text-muted-foreground">Finitions (plusieurs choix possibles)</p>
              <div className="flex flex-wrap gap-2">
                {finishes.map((f) => {
                  const on = order.finishes.includes(f);
                  return <button key={f} data-active={on} onClick={() => set("finishes", on ? order.finishes.filter((x) => x !== f) : [...order.finishes, f])} className="chip">{f}</button>;
                })}
              </div>
              <p className="mb-3 mt-8 text-[12px] text-muted-foreground">Niveau de personnalisation</p>
              <div className="flex flex-col gap-2">{levels.map((l) => <button key={l} data-active={order.level === l} onClick={() => set("level", l)} className="chip text-left">{l}</button>)}</div>
            </Step>
          )}
          {step === 4 && (
            <Step title="Vos mesures & votre occasion">
              <div className="grid grid-cols-2 gap-x-6 gap-y-2">
                <input className="field col-span-2" placeholder="Votre nom" value={order.name} onChange={(e) => set("name", e.target.value)} />
                <input className="field" placeholder="Occasion (soirée, gala…)" value={order.occasion} onChange={(e) => set("occasion", e.target.value)} />
                <input className="field" type="date" value={order.date} onChange={(e) => set("date", e.target.value)} />
                {([["bust", "Tour de poitrine (cm)"], ["waist", "Tour de taille (cm)"], ["hips", "Tour de hanches (cm)"], ["height", "Taille (cm)"]] as const).map(([k, l]) => (
                  <input key={k} className="field" inputMode="numeric" placeholder={l} value={order[k]} onChange={(e) => set(k, e.target.value.replace(/[^0-9.,]/g, ""))} />
                ))}
                <textarea className="field col-span-2 min-h-24" placeholder="Parlez-nous de votre projet : modifications, inspirations…" value={order.message} onChange={(e) => set("message", e.target.value)} />
              </div>
            </Step>
          )}
          {step === 5 && (
            <Step title="Votre projet">
              <pre className="whitespace-pre-wrap bg-secondary p-5 font-sans text-[13px] leading-relaxed">{message}</pre>
              <Savoir className="mt-6" />
              <p className="mt-4 text-[12px] text-muted-foreground">Si vous avez une photo d'inspiration, joignez-la dans la conversation WhatsApp.</p>
              <a href={whatsappLink(message)} target="_blank" rel="noopener" className="lv-btn mt-6 w-full">Envoyer mon projet sur WhatsApp</a>
              <button onClick={() => { setOrder(emptyOrder); setStep(0); }} className="mt-4 w-full text-[12px] underline underline-offset-4">Recommencer</button>
            </Step>
          )}

          {step < 5 && (
            <div className="mt-10 flex justify-between">
              <button disabled={step === 0} onClick={() => setStep(step - 1)} className="text-[13px] disabled:opacity-30">← Retour</button>
              <button disabled={!canNext} onClick={() => setStep(step + 1)} className="lv-btn">Continuer</button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

function Step({ title, children }: { title: string; children: React.ReactNode }) {
  return <div className="animate-fade-up"><h3 className="mb-6 text-xl font-light">{title}</h3>{children}</div>;
}
