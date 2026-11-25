import { ClientOnly } from "@tanstack/react-router";
import { lazy, Suspense } from "react";
import type { Model } from "@/lib/maison";

const Scene = lazy(() => import("./Viewer3DScene"));

export function Viewer3D(props: { model: Model; colorHex?: string; fabric?: string; finishes?: string[] }) {
  const fallback = <div className="flex h-full items-center justify-center eyebrow text-muted-foreground">Chargement 3D…</div>;
  return (
    <div className="relative h-full w-full bg-stage">
      <ClientOnly fallback={fallback}>
        <Suspense fallback={fallback}>
          <Scene model={props.model} colorHex={props.colorHex} fabric={props.fabric} finishes={props.finishes ?? []} />
        </Suspense>
      </ClientOnly>
      <p className="pointer-events-none absolute bottom-4 left-0 right-0 text-center eyebrow text-muted-foreground">Faites glisser pour tourner · 360°</p>
    </div>
  );
}
