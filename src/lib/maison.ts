const img = (file: string) => ({ url: `/maison/${file}` });
const m1 = img("modele1.jpg");
const m2 = img("modele2.jpg");
const m3 = img("modele3.jpg");
const m4 = img("modele4.jpg");
const m5 = img("modele5.jpg");
const m6 = img("modele6.jpg");
const m7 = img("modele7.jpg");
const m8 = img("modele8.jpg");
const m9 = img("modele9.jpg");
const m10 = img("modele10.jpg");
const m11 = img("modele11.jpg");
const m12 = img("modele12.jpg");
const m13 = img("modele13.jpg");
const p1 = img("photo1.jpg");
const p2 = img("photo2.jpg");
const p3 = img("photo3.jpg");
const p4 = img("photo4.jpg");
const p5 = img("photo5.jpg");
const p6 = img("photo6.jpg");
const cr = img("createur.jpg");

export const WHATSAPP = "22944007806";
export const PHONE = "+2290190431451";
export const INSTAGRAM = "https://www.instagram.com/theodoraa_xx";
export const TIKTOK = "https://www.tiktok.com/@theodoraa_xx6";
export const creatorPhoto = cr.url;
export const gallery = [p1.url, p2.url, p3.url, p4.url, p5.url, p6.url];

/** Silhouette drives the 3D garment shape on the mannequin. */
export type Silhouette = "vest" | "shirt" | "corset-gown" | "skirt-top" | "corset-mini" | "cutout-dress" | "peplum-trousers" | "flowing-gown" | "abaya" | "fitted-gown" | "cape-gown";
export type Universe = "Romantique" | "Bohème" | "Mariage" | "Soirée" | "Avant-garde" | "Tradition";

export type Model = {
  id: string; number: string; name: string; subtitle: string; description: string;
  image: string; universe: Universe; silhouette: Silhouette; color: string; accent: string;
};

export const models: Model[] = [
  { id: "signature", number: "01", name: "Signature", subtitle: "Poésie bohème & jeu de matières", universe: "Bohème", silhouette: "vest", color: "#cdb89a", accent: "#6b4f3a", image: m1.url,
    description: "Autour du concept « mix and match narratif dans un style bohème chic », une veste sur mesure associant lin naturel et textiles choisis. L'assemblage des textures raconte une histoire visuelle unique : une silhouette fluide, authentique et raffinée." },
  { id: "radiance", number: "02", name: "Éclat", subtitle: "Art lyrique avant-gardiste", universe: "Avant-garde", silhouette: "shirt", color: "#f2efe9", accent: "#1d1d1d", image: m2.url,
    description: "Hommage à la figure théâtrale de la cantatrice, cette création réinterprète la chemise classique par une coupe structurée et dramatique. Une vision futuriste de la garde-robe lyrique, entre élégance de scène et modernité de rupture." },
  { id: "heritage", number: "03", name: "Héritage", subtitle: "Sérénité nuptiale", universe: "Mariage", silhouette: "corset-gown", color: "#9db8d6", accent: "#e9eef5", image: m3.url,
    description: "Pensée pour le thème « Où veux-tu que je t'épouse ? », cette tenue de mariage civil revisite l'élégance nuptiale par un corset structuré, dans une palette de bleus exprimant douceur et sérénité." },
  { id: "evidence", number: "04", name: "Évidence", subtitle: "Jupe asymétrique bohème chic", universe: "Bohème", silhouette: "skirt-top", color: "#d9772f", accent: "#f7f4ee", image: m4.url,
    description: "Une longue jupe fluide aux tons orangés et imprimés artisanaux, drapée de façon asymétrique avec des pans superposés qui créent un mouvement aérien à chaque pas, associée à un top blanc minimaliste." },
  { id: "romantic", number: "05", name: "Romantique", subtitle: "Corset rose bonbon", universe: "Romantique", silhouette: "corset-mini", color: "#f2a7c3", accent: "#d63b84", image: m5.url,
    description: "Un contraste fascinant entre la délicatesse structurée du corset en satin rose bonbon et le relief brodé de la mini-jupe. Le bustier baleiné dessine la taille, rehaussé de finitions festonnées fuchsia." },
  { id: "sensual", number: "06", name: "Sensuelle", subtitle: "Émeraude de minuit", universe: "Soirée", silhouette: "cutout-dress", color: "#1c2d5a", accent: "#c9a85c", image: m6.url,
    description: "Une création bâtie autour de l'élégance et de l'assurance. Le bleu profond apporte une touche sophistiquée, tandis que découpes et détails métalliques donnent du caractère à la silhouette." },
  { id: "solar", number: "07", name: "Solaire", subtitle: "Lumière tropicale", universe: "Romantique", silhouette: "flowing-gown", color: "#f3e36a", accent: "#c9a85c", image: m7.url,
    description: "Une tenue qui célèbre la fraîcheur et l'élégance. Le jaune citron apporte la lumière, détails dorés et perles colorées ajoutent caractère et raffinement." },
  { id: "nature", number: "08", name: "Nature", subtitle: "Péplum & pantalon fluide", universe: "Avant-garde", silhouette: "peplum-trousers", color: "#3f7d4e", accent: "#f1f1ea", image: m8.url,
    description: "Un top bustier péplum ajusté et un large pantalon fluide en textile imprimé de motifs géométriques et organiques verts et blancs. Une allure urbaine, structurée et contemporaine." },
  { id: "aura", number: "09", name: "Aura", subtitle: "Élégance lumineuse", universe: "Soirée", silhouette: "flowing-gown", color: "#e8d9c4", accent: "#c9a85c", image: m9.url,
    description: "Une pièce qui joue avec la lumière, les textures et la fluidité. Chaque détail suit le mouvement et révèle une allure à la fois délicate et assurée." },
  { id: "faith", number: "10", name: "Foi & Spiritualité", subtitle: "Abaya brodée d'or", universe: "Tradition", silhouette: "abaya", color: "#111111", accent: "#6e1a2c", image: m10.url,
    description: "Une abaya noire à manches longues brodée d'or aux poignets, accompagnée d'un voile bordeaux richement orné de motifs dorés. Une coupe ample et traditionnelle, complétée d'un pendentif discret." },
  { id: "imperial", number: "11", name: "Impériale", subtitle: "Robe longue bordeaux", universe: "Soirée", silhouette: "fitted-gown", color: "#6e1a2c", accent: "#c9a85c", image: m11.url,
    description: "Robe longue bordeaux bustier ajustée, drapé couvrant épaules et dos, taille marquée et jupe près du corps. Les bracelets dorés contrastent avec la couleur de la tenue." },
  { id: "nebula", number: "12", name: "Nébuleuse", subtitle: "L'élégance en mouvement", universe: "Romantique", silhouette: "flowing-gown", color: "#b9a3d8", accent: "#ffffff", image: m12.url,
    description: "Une féminité moderne : silhouette aérienne, volumes maîtrisés et une couleur qui accroche la lumière. La preuve qu'on peut être simple et remarquable à la fois." },
  { id: "softness", number: "13", name: "Douceur", subtitle: "Cape & fleurs fuchsia", universe: "Mariage", silhouette: "cape-gown", color: "#f4cfd9", accent: "#d63b84", image: m13.url,
    description: "Une robe bustier rose pâle, une jupe fuchsia et une longue cape fluide. De grandes fleurs fuchsia ajoutent du volume ; bijoux dorés et chignon de tresses complètent le look." },
];

export const universes: Universe[] = ["Romantique", "Bohème", "Mariage", "Soirée", "Avant-garde", "Tradition"];

export const fabrics = [
  { id: "Lin naturel", rough: 0.95, sheen: 0, metal: 0 },
  { id: "Satin", rough: 0.25, sheen: 1, metal: 0.05 },
  { id: "Soie", rough: 0.35, sheen: 0.8, metal: 0 },
  { id: "Velours", rough: 1, sheen: 1, metal: 0 },
  { id: "Dentelle", rough: 0.7, sheen: 0.3, metal: 0 },
  { id: "Wax / tissu imprimé", rough: 0.8, sheen: 0.1, metal: 0 },
] as const;

export const colors = [
  { id: "Couleur d'origine", hex: "" },
  { id: "Noir", hex: "#141414" }, { id: "Blanc", hex: "#f5f3ee" }, { id: "Rouge", hex: "#b3122a" },
  { id: "Rose", hex: "#f2a7c3" }, { id: "Bleu", hex: "#2f4f8f" }, { id: "Vert", hex: "#2f6b45" },
  { id: "Jaune", hex: "#f1d54a" }, { id: "Bordeaux", hex: "#6e1a2c" }, { id: "Or", hex: "#c9a85c" },
] as const;

export const finishes = ["Broderies", "Perles", "Détails métalliques", "Dentelle / volants", "Strass", "Finitions minimalistes"] as const;
export const levels = ["Adaptation légère du modèle", "Personnalisation importante", "Création entièrement sur mesure"] as const;

export type Order = {
  modelId: string; fabric: string; color: string; finishes: string[]; level: string;
  name: string; occasion: string; date: string; bust: string; waist: string; hips: string; height: string; message: string;
};

/** Builds the WhatsApp message sent to the creator, skipping blank fields. */
export function buildOrderMessage(o: Order): string {
  const m = models.find((x) => x.id === o.modelId);
  const lines: [string, string][] = [
    ["Modèle", m ? `${m.number} — ${m.name}` : ""], ["Tissu", o.fabric], ["Couleur", o.color],
    ["Finitions", o.finishes.join(", ")], ["Personnalisation", o.level], ["Occasion", o.occasion], ["Date souhaitée", o.date],
    ["Tour de poitrine", o.bust && `${o.bust} cm`], ["Tour de taille", o.waist && `${o.waist} cm`],
    ["Tour de hanches", o.hips && `${o.hips} cm`], ["Taille", o.height && `${o.height} cm`], ["Message", o.message],
  ];
  const body = lines.filter(([, v]) => v).map(([k, v]) => `• ${k} : ${v}`).join("\n");
  return `Bonjour Théodora${o.name ? `, je suis ${o.name}` : ""}. Voici mon projet de création sur mesure :\n\n${body}`;
}

export const whatsappLink = (text?: string) => `https://wa.me/${WHATSAPP}${text ? `?text=${encodeURIComponent(text)}` : ""}`;
