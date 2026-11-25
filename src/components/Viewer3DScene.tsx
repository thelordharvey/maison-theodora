import { Canvas } from "@react-three/fiber";
import { ContactShadows, OrbitControls } from "@react-three/drei";
import { useMemo } from "react";
import * as THREE from "three";
import { fabrics, type Model } from "@/lib/maison";

type P = [number, number][]; // [radius, y]
type Part = { kind: "lathe"; pts: P; tone: "main" | "accent"; scale?: [number, number, number]; rotZ?: number; open?: boolean; x?: number };

const lathe = (pts: P) => new THREE.LatheGeometry(pts.map(([r, y]) => new THREE.Vector2(r, y)), 64);
const bodice = (top: number, bottom: number, m = 0.012): P => {
  const prof: P = [[0.0, 1.5], [0.15, 1.46], [0.172, 1.34], [0.135, 1.16], [0.172, 1.0]];
  const r = (y: number) => {
    for (let i = 0; i < prof.length - 1; i++) {
      const [r0, y0] = prof[i]!; const [r1, y1] = prof[i + 1]!;
      if (y <= y0 && y >= y1) return r0 + ((y0 - y) / (y0 - y1)) * (r1 - r0);
    }
    return 0.17;
  };
  const out: P = [];
  for (let i = 0; i <= 12; i++) { const y = top - ((top - bottom) * i) / 12; out.push([r(y) + m, y]); }
  return out;
};
const skirt = (from: number, to: number, startR: number, endR: number, curve = 1.6): P => {
  const out: P = [];
  for (let i = 0; i <= 16; i++) { const t = i / 16; out.push([startR + (endR - startR) * Math.pow(t, curve), from - (from - to) * t]); }
  return out;
};

function partsFor(s: Model["silhouette"]): Part[] {
  const B = (t: number, b: number, tone: Part["tone"] = "main", m?: number): Part => ({ kind: "lathe", pts: bodice(t, b, m), tone });
  const S = (f: number, t: number, a: number, b: number, tone: Part["tone"] = "main", c?: number): Part => ({ kind: "lathe", pts: skirt(f, t, a, b, c), tone });
  switch (s) {
    case "vest": return [B(1.47, 0.98, "accent"), B(1.45, 0.92, "main", 0.03)];
    case "shirt": return [B(1.48, 0.95, "main", 0.02), S(1.02, 0.86, 0.18, 0.27, "main", 1), S(1.0, 0.1, 0.2, 0.21, "accent", 1)];
    case "corset-gown": return [B(1.38, 1.1), S(1.12, 0.05, 0.155, 0.48)];
    case "skirt-top": return [B(1.46, 1.12, "accent"), { ...S(1.14, 0.06, 0.15, 0.42, "main", 1.3), rotZ: 0.06, scale: [1.08, 1, 0.92] }];
    case "corset-mini": return [B(1.38, 1.08), S(1.1, 0.8, 0.165, 0.27, "accent", 0.9)];
    case "cutout-dress": return [B(1.42, 1.2), S(1.12, 0.06, 0.15, 0.22, "main", 2)];
    case "peplum-trousers": return [B(1.38, 1.1), S(1.12, 0.98, 0.14, 0.27, "main", 0.7),
      { ...S(1.0, 0.05, 0.08, 0.13, "main", 1), x: -0.075 }, { ...S(1.0, 0.05, 0.08, 0.13, "main", 1), x: 0.075 }];
    case "flowing-gown": return [B(1.42, 1.12), S(1.14, 0.04, 0.15, 0.55, "main", 1.4)];
    case "abaya": return [B(1.5, 1.0, "main", 0.03), S(1.05, 0.04, 0.2, 0.42, "main", 1.2),
      { kind: "lathe", pts: [[0.001, 1.86], [0.11, 1.8], [0.13, 1.68], [0.2, 1.5], [0.24, 1.36]], tone: "accent" }];
    case "fitted-gown": return [B(1.4, 1.1), S(1.12, 0.05, 0.168, 0.3, "main", 4),
      { kind: "lathe", pts: [[0.19, 1.46], [0.215, 1.4], [0.2, 1.3]], tone: "main", open: true }];
    case "cape-gown": return [B(1.4, 1.12), S(1.14, 0.04, 0.15, 0.48, "accent", 1.4)];
  }
}

function patternTexture(hex: string) {
  const c = document.createElement("canvas"); c.width = c.height = 256;
  const g = c.getContext("2d")!;
  g.fillStyle = hex; g.fillRect(0, 0, 256, 256);
  g.strokeStyle = "rgba(255,255,255,0.55)"; g.lineWidth = 6;
  for (let i = 0; i < 4; i++) for (let j = 0; j < 4; j++) { g.beginPath(); g.arc(i * 64 + 32, j * 64 + 32, 18, 0, Math.PI * 2); g.stroke(); }
  g.fillStyle = "rgba(0,0,0,0.25)";
  for (let i = 0; i < 8; i++) g.fillRect(i * 32, 0, 4, 256);
  const t = new THREE.CanvasTexture(c); t.wrapS = t.wrapT = THREE.RepeatWrapping; t.repeat.set(6, 3); t.colorSpace = THREE.SRGBColorSpace;
  return t;
}

function Mannequin({ model, colorHex, fabric, finishes }: Props) {
  const main = colorHex || model.color;
  const f = fabrics.find((x) => x.id === fabric) ?? fabrics[1];
  const tex = useMemo(() => (fabric?.startsWith("Wax") ? patternTexture(main) : null), [fabric, main]);
  const parts = useMemo(() => partsFor(model.silhouette), [model.silhouette]);
  const metallic = finishes.includes("Détails métalliques") || ["cutout-dress", "fitted-gown"].includes(model.silhouette);
  const beads = finishes.includes("Perles") || finishes.includes("Strass");
  const lace = fabric === "Dentelle";
  const bodyGeo = useMemo(() => lathe([[0.001, 1.0], [0.172, 1.0], [0.135, 1.16], [0.172, 1.34], [0.15, 1.46], [0.05, 1.53], [0.045, 1.6], [0.001, 1.6]]), []);
  const capeGeo = useMemo(() => new THREE.CylinderGeometry(0.2, 0.62, 1.45, 48, 1, true, Math.PI * 0.55, Math.PI * 0.9), []);

  const mat = (tone: Part["tone"], side: THREE.Side = THREE.FrontSide) => (
    <meshPhysicalMaterial side={side} color={tone === "main" ? main : model.accent} map={tone === "main" ? tex : null}
      roughness={f.rough} sheen={f.sheen} sheenColor={"#ffffff"} metalness={f.metal}
      transparent={lace && tone === "main"} opacity={lace && tone === "main" ? 0.82 : 1} />
  );

  return (
    <group position={[0, -0.95, 0]}>
      {/* stand */}
      <mesh position={[0, 0.02, 0]}><cylinderGeometry args={[0.2, 0.22, 0.03, 48]} /><meshStandardMaterial color="#1a1a1a" metalness={0.6} roughness={0.3} /></mesh>
      <mesh position={[0, 0.5, 0]}><cylinderGeometry args={[0.012, 0.012, 1, 16]} /><meshStandardMaterial color="#b89a5e" metalness={0.9} roughness={0.25} /></mesh>
      {/* body form */}
      <mesh geometry={bodyGeo}>
        <meshStandardMaterial color="#e9e1d4" roughness={0.85} />
      </mesh>
      <mesh position={[0, 1.71, 0]} scale={[0.8, 1, 0.9]}><sphereGeometry args={[0.1, 32, 32]} /><meshStandardMaterial color="#e9e1d4" roughness={0.6} /></mesh>
      {parts.map((p, i) => (
        <mesh key={`${model.id}-${i}`} geometry={lathe(p.pts)} position={[p.x ?? 0, 0, 0]} rotation={[0, 0, p.rotZ ?? 0]} scale={p.scale ?? [1, 1, 1]} castShadow>
          {mat(p.tone, THREE.DoubleSide)}
        </mesh>
      ))}
      {/* sleeves */}
      {(model.silhouette === "abaya" || model.silhouette === "shirt") && [-1, 1].map((s) => (
        <group key={s}>
          <mesh position={[s * 0.2, 1.2, 0]} rotation={[0, 0, s * 0.12]}>
            <cylinderGeometry args={[0.045, model.silhouette === "abaya" ? 0.09 : 0.05, 0.55, 24]} />{mat("main")}
          </mesh>
          {model.silhouette === "shirt" && <mesh position={[s * 0.2, 1.44, 0]} scale={[1, 0.8, 1]}><sphereGeometry args={[0.11, 32, 32]} />{mat("main")}</mesh>}
          {model.silhouette === "abaya" && <mesh position={[s * 0.233, 0.93, 0]}><torusGeometry args={[0.085, 0.012, 12, 40]} /><meshStandardMaterial color="#c9a85c" metalness={1} roughness={0.2} /></mesh>}
        </group>
      ))}
      {model.silhouette === "cape-gown" && (
        <mesh position={[0, 0.75, -0.02]} geometry={capeGeo}>
          <meshPhysicalMaterial color={main} side={THREE.DoubleSide} roughness={0.4} sheen={1} transparent opacity={0.85} />
        </mesh>
      )}
      {model.silhouette === "cape-gown" && [[0.12, 1.3, 0.12], [-0.13, 1.18, 0.1], [0.3, 0.6, 0.18]].map((p, i) => (
        <mesh key={i} position={p as [number, number, number]}><icosahedronGeometry args={[0.055, 1]} /><meshStandardMaterial color={model.accent} roughness={0.5} flatShading /></mesh>
      ))}
      {metallic && (
        <mesh position={[0, 1.16, 0]} rotation={[Math.PI / 2, 0, 0]}><torusGeometry args={[0.15, 0.009, 16, 80]} /><meshStandardMaterial color="#c9a85c" metalness={1} roughness={0.18} /></mesh>
      )}
      {beads && Array.from({ length: 28 }).map((_, i) => {
        const a = (i / 28) * Math.PI * 2;
        return <mesh key={i} position={[Math.cos(a) * 0.168, 1.37, Math.sin(a) * 0.168]}><sphereGeometry args={[0.009, 12, 12]} /><meshStandardMaterial color="#f4ecd8" metalness={0.5} roughness={0.15} /></mesh>;
      })}
      {finishes.includes("Broderies") && Array.from({ length: 18 }).map((_, i) => {
        const a = (i / 18) * Math.PI * 2;
        return <mesh key={i} position={[Math.cos(a) * 0.15, 1.05 + (i % 2) * 0.03, Math.sin(a) * 0.15]}><octahedronGeometry args={[0.014]} /><meshStandardMaterial color="#c9a85c" metalness={0.8} roughness={0.3} /></mesh>;
      })}
    </group>
  );
}

type Props = { model: Model; colorHex?: string; fabric?: string; finishes: string[] };

export default function Viewer3DScene(props: Props) {
  return (
    <Canvas camera={{ position: [0, 0.15, 3], fov: 35 }} dpr={[1, 2]} shadows>
      <ambientLight intensity={0.55} />
      <directionalLight position={[2, 3, 2]} intensity={1.6} castShadow />
      <directionalLight position={[-3, 1.5, -1]} intensity={0.6} color="#f2e6d0" />
      <pointLight position={[0, 1, -2]} intensity={0.8} />
      <Mannequin {...props} />
      <ContactShadows position={[0, -0.94, 0]} opacity={0.35} scale={3} blur={2.5} far={1.5} />
      <OrbitControls enablePan={false} minDistance={1.8} maxDistance={4.5} autoRotate autoRotateSpeed={1.2} target={[0, 0.05, 0]} minPolarAngle={Math.PI / 4} maxPolarAngle={Math.PI / 1.8} />
    </Canvas>
  );
}
