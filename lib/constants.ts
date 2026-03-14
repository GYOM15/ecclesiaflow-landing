import {
  Users,
  MessageSquare,
  Calendar,
  BarChart3,
  Shield,
  Globe,
  Heart,
  BookOpen,
  Bell,
  CreditCard,
  Zap,
  Headphones,
  Mail,
  Smartphone,
  Cloud,
  Lock,
  ChevronRight,
  CheckCircle2,
  Star,
  Church,
  HandHeart,
  Lightbulb,
  Eye,
  Sparkles,
  type LucideIcon,
} from "lucide-react";

// ─── Navigation ──────────────────────────────────────────
export const NAV_LINKS = [
  { label: "Fonctionnalités", href: "/features" },
  { label: "Tarifs", href: "/pricing" },
  { label: "À propos", href: "/about" },
];

// ─── Ticker Strip (église associations) ──────────────────
export const TICKER_ITEMS = [
  "Églises Baptistes",
  "Assemblées de Dieu",
  "Églises Évangéliques",
  "Églises Pentecôtistes",
  "Églises Presbytériennes",
  "Églises Méthodistes",
  "Communautés Charismatiques",
  "Églises Réformées",
  "Églises Luthériennes",
  "Églises Adventistes",
  "Paroisses Catholiques",
  "Églises Protestantes",
  "Communautés Mennonites",
  "Missions Évangéliques",
  "Églises Indépendantes",
];

// ─── Features Overview ───────────────────────────────────
export interface Feature {
  icon: LucideIcon;
  title: string;
  description: string;
  tag?: string;
}

export const FEATURES_OVERVIEW: Feature[] = [
  {
    icon: Users,
    title: "Gestion des membres",
    description:
      "Profils complets, familles, groupes de vie, historique pastoral et suivi de la croissance spirituelle de chaque membre.",
    tag: "Essentiel",
  },
  {
    icon: MessageSquare,
    title: "Communication ciblée",
    description:
      "Envoyez des emails, SMS et notifications push segmentés par groupe, ministère ou événement. Modèles personnalisables.",
  },
  {
    icon: BarChart3,
    title: "Tableaux de bord & Analytics",
    description:
      "Suivez la fréquentation, les tendances de croissance, l'engagement des membres et les indicateurs clés de votre communauté.",
    tag: "Populaire",
  },
  {
    icon: CreditCard,
    title: "Dons & Finances",
    description:
      "Collecte de dons en ligne, suivi des dîmes, reçus fiscaux automatiques, rapports financiers et budgets par département.",
  },
];

// ─── Features Deep Dive ──────────────────────────────────
export interface FeatureDeepDive {
  title: string;
  subtitle: string;
  description: string;
  bullets: string[];
  badge: string;
  reversed?: boolean;
}

export const FEATURES_DEEP_DIVE: FeatureDeepDive[] = [
  {
    title: "Connaissez chaque membre de votre communauté",
    subtitle: "Gestion des membres",
    description:
      "Un annuaire intelligent qui va bien au-delà d'une simple liste de contacts. Suivez le parcours de chaque membre, de sa première visite à son engagement actif.",
    bullets: [
      "Profils détaillés avec photo, famille et groupes",
      "Suivi du parcours spirituel et des étapes clés",
      "Recherche avancée et filtres par critère",
      "Import/export facile depuis Excel ou CSV",
      "Notes pastorales confidentielles par membre",
    ],
    badge: "Membres",
  },
  {
    title: "Communiquez efficacement, touchez chaque cœur",
    subtitle: "Communication",
    description:
      "Des outils de communication multicanaux qui vous permettent d'atteindre les bonnes personnes, au bon moment, avec le bon message.",
    bullets: [
      "Emails et SMS avec modèles personnalisables",
      "Segmentation intelligente par groupe ou ministère",
      "Notifications push pour les rappels d'événements",
      "Automatisation des messages de bienvenue",
      "Statistiques d'ouverture et d'engagement",
    ],
    badge: "Communication",
    reversed: true,
  },
  {
    title: "Organisez vos événements sans effort",
    subtitle: "Événements",
    description:
      "De la planification à l'exécution, gérez tous vos événements depuis une seule interface. Cultes, retraites, conférences, groupes de maison.",
    bullets: [
      "Calendrier interactif avec vue mensuelle et hebdo",
      "Inscriptions et check-in en ligne",
      "Gestion des équipes et rotation des bénévoles",
      "Rappels automatiques par email et SMS",
      "Rapports de fréquentation en temps réel",
    ],
    badge: "Événements",
  },
];

// ─── Stats ───────────────────────────────────────────────
export interface Stat {
  value: number;
  suffix: string;
  label: string;
}

export const STATS: Stat[] = [
  { value: 10000, suffix: "+", label: "Églises à équiper" },
  { value: 1, suffix: "M+", label: "Membres à connecter" },
  { value: 99, suffix: ".9%", label: "Disponibilité visée" },
  { value: 5, suffix: "/5", label: "Notre objectif qualité" },
];

// ─── Testimonials ────────────────────────────────────────
export interface Testimonial {
  quote: string;
  name: string;
  role: string;
  church: string;
}

export const TESTIMONIALS: Testimonial[] = [
  {
    quote:
      "EcclesiaFlow a transformé notre façon de gérer notre communauté de 800 membres. Ce qui prenait des heures se fait maintenant en quelques clics. L'équipe pastorale peut enfin se concentrer sur l'essentiel.",
    name: "Pasteur David Morel",
    role: "Pasteur principal",
    church: "Église Nouvelle Vie, Montréal",
  },
  {
    quote:
      "La simplicité d'utilisation est remarquable. Même nos bénévoles les moins à l'aise avec la technologie l'ont adopté en une semaine. Le support client est exceptionnel, toujours à l'écoute.",
    name: "Sarah Nguema",
    role: "Responsable administrative",
    church: "Centre Chrétien de Laval",
  },
  {
    quote:
      "Les rapports financiers automatisés nous ont fait économiser un temps considérable. Les reçus fiscaux sont générés en un clic. C'est un investissement qui se rentabilise immédiatement.",
    name: "Jean-Marc Dubois",
    role: "Trésorier",
    church: "Assemblée de Dieu, Québec",
  },
  {
    quote:
      "Nous gérons 12 groupes de maison avec EcclesiaFlow. La communication ciblée et le suivi des présences ont considérablement amélioré l'engagement de nos membres dans la vie de l'église.",
    name: "Pasteur Esther Kone",
    role: "Pasteur des groupes",
    church: "Église Grâce & Vérité, Gatineau",
  },
  {
    quote:
      "L'interface est magnifique et intuitive. On sent que c'est conçu par des gens qui comprennent les besoins spécifiques d'une église. C'est bien plus qu'un simple outil de gestion.",
    name: "Thomas Lefèvre",
    role: "Diacre & développeur",
    church: "Église Protestante, Sherbrooke",
  },
  {
    quote:
      "La migration depuis notre ancien système s'est faite en douceur. L'équipe d'EcclesiaFlow nous a accompagnés à chaque étape. Aujourd'hui, impossible de revenir en arrière.",
    name: "Marie-Claire Petit",
    role: "Secrétaire générale",
    church: "Église Baptiste, Longueuil",
  },
];

// ─── How It Works ────────────────────────────────────────
export interface Step {
  step: number;
  title: string;
  description: string;
  icon: LucideIcon;
}

export const HOW_IT_WORKS: Step[] = [
  {
    step: 1,
    title: "Créez votre espace",
    description:
      "Inscrivez-vous gratuitement et configurez le profil de votre église en moins de 5 minutes. Importez vos données existantes facilement.",
    icon: Zap,
  },
  {
    step: 2,
    title: "Invitez votre équipe",
    description:
      "Ajoutez vos pasteurs, diacres et responsables de ministère. Chacun reçoit un accès adapté à son rôle avec les permissions appropriées.",
    icon: Users,
  },
  {
    step: 3,
    title: "Gérez et grandissez",
    description:
      "Commencez à gérer vos membres, planifier vos événements, communiquer avec votre communauté et suivre la croissance de votre église.",
    icon: BarChart3,
  },
];

// ─── Integrations ────────────────────────────────────────
export interface Integration {
  name: string;
  description: string;
  icon: LucideIcon;
}

export const INTEGRATIONS: Integration[] = [
  { name: "Email", description: "Envoi d'emails transactionnels et marketing", icon: Mail },
  { name: "SMS", description: "Notifications et rappels par SMS", icon: Smartphone },
  { name: "Calendrier", description: "Sync Google Calendar & Outlook", icon: Calendar },
  { name: "Paiement", description: "Stripe, PayPal & virement bancaire", icon: CreditCard },
  { name: "Cloud", description: "Stockage sécurisé des documents", icon: Cloud },
  { name: "Sécurité", description: "Authentification SSO & 2FA", icon: Lock },
  { name: "Analytics", description: "Rapports et tableaux de bord", icon: BarChart3 },
  { name: "Notifications", description: "Push notifications en temps réel", icon: Bell },
];

// ─── Pricing ─────────────────────────────────────────────
export interface PricingPlan {
  name: string;
  description: string;
  monthlyPrice: number | null;
  yearlyPrice: number | null;
  features: string[];
  highlighted: boolean;
  cta: string;
  badge?: string;
}

export const PRICING_PLANS: PricingPlan[] = [
  {
    name: "Gratuit",
    description: "Pour les petites communautés qui démarrent",
    monthlyPrice: 0,
    yearlyPrice: 0,
    features: [
      "Jusqu'à 50 membres",
      "1 administrateur",
      "Gestion des membres basique",
      "Calendrier d'événements",
      "Emails groupés (100/mois)",
      "Support par email",
    ],
    highlighted: false,
    cta: "Démarrer",
  },
  {
    name: "Pro",
    description: "Pour les églises en croissance",
    monthlyPrice: 29,
    yearlyPrice: 249,
    features: [
      "Membres illimités",
      "5 administrateurs",
      "Gestion complète des membres",
      "Communication multicanale",
      "Gestion des dons & finances",
      "Groupes et ministères",
      "Rapports & analytics avancés",
      "Intégrations tierces",
      "Support prioritaire",
    ],
    highlighted: true,
    cta: "Démarrer",
    badge: "Populaire",
  },
  {
    name: "Entreprise",
    description: "Pour les réseaux d'églises et grandes communautés",
    monthlyPrice: null,
    yearlyPrice: null,
    features: [
      "Tout du plan Pro",
      "Administrateurs illimités",
      "Multi-sites & multi-campus",
      "API & webhooks",
      "SSO & authentification avancée",
      "Formations personnalisées",
      "Manager de compte dédié",
      "SLA garanti 99.99%",
      "Migration assistée",
    ],
    highlighted: false,
    cta: "Contacter l'équipe",
  },
];

// ─── Pricing FAQ ─────────────────────────────────────────
export const PRICING_FAQ = [
  {
    question: "Puis-je essayer EcclesiaFlow gratuitement ?",
    answer:
      "Absolument ! Notre plan gratuit vous permet de gérer jusqu'à 50 membres sans limite de temps. Pour le plan Pro, vous bénéficiez de 14 jours d'essai gratuit, sans carte de crédit requise.",
  },
  {
    question: "Comment fonctionne la facturation annuelle ?",
    answer:
      "En choisissant la facturation annuelle, vous économisez environ 30% par rapport au tarif mensuel. Le paiement est effectué en une seule fois pour l'année complète.",
  },
  {
    question: "Puis-je changer de plan à tout moment ?",
    answer:
      "Oui, vous pouvez upgrader ou downgrader votre plan à tout moment. Si vous passez à un plan supérieur, la différence sera calculée au prorata. Si vous réduisez votre plan, le crédit sera appliqué à votre prochaine facture.",
  },
  {
    question: "Mes données sont-elles sécurisées ?",
    answer:
      "La sécurité est notre priorité absolue. Toutes les données sont chiffrées en transit et au repos. Nous sommes conformes à la Loi 25 du Québec et effectuons des sauvegardes quotidiennes automatiques. Nos serveurs sont hébergés au Canada.",
  },
  {
    question: "Proposez-vous des tarifs spéciaux pour les petites églises ?",
    answer:
      "Oui ! Notre plan gratuit est conçu spécifiquement pour les petites communautés. De plus, nous offrons des réductions pour les églises en plantation et les missions. Contactez-nous pour en discuter.",
  },
  {
    question: "Comment migrer depuis notre système actuel ?",
    answer:
      "Nous proposons un outil d'import qui prend en charge les fichiers CSV, Excel et les exports de la plupart des logiciels de gestion d'église. Pour le plan Entreprise, notre équipe vous accompagne dans la migration complète.",
  },
];

// ─── Pricing Comparison ──────────────────────────────────
export interface ComparisonRow {
  feature: string;
  free: boolean | string;
  pro: boolean | string;
  enterprise: boolean | string;
}

export const PRICING_COMPARISON: ComparisonRow[] = [
  { feature: "Gestion des membres", free: "50 max", pro: "Illimité", enterprise: "Illimité" },
  { feature: "Administrateurs", free: "1", pro: "5", enterprise: "Illimité" },
  { feature: "Calendrier d'événements", free: true, pro: true, enterprise: true },
  { feature: "Emails groupés", free: "100/mois", pro: "Illimité", enterprise: "Illimité" },
  { feature: "SMS", free: false, pro: true, enterprise: true },
  { feature: "Gestion des dons", free: false, pro: true, enterprise: true },
  { feature: "Rapports & analytics", free: false, pro: true, enterprise: true },
  { feature: "Groupes & ministères", free: false, pro: true, enterprise: true },
  { feature: "Intégrations tierces", free: false, pro: true, enterprise: true },
  { feature: "API & webhooks", free: false, pro: false, enterprise: true },
  { feature: "Multi-sites", free: false, pro: false, enterprise: true },
  { feature: "SSO", free: false, pro: false, enterprise: true },
  { feature: "Support", free: "Email", pro: "Prioritaire", enterprise: "Dédié 24/7" },
];

// ─── About Page Values ───────────────────────────────────
export interface Value {
  icon: LucideIcon;
  title: string;
  description: string;
}

export const VALUES: Value[] = [
  {
    icon: Heart,
    title: "Foi & Innovation",
    description:
      "Nous croyons que la technologie est un don de Dieu pour servir son Église. Nous innovons avec humilité et intention.",
  },
  {
    icon: Users,
    title: "Communauté d'abord",
    description:
      "Chaque fonctionnalité est conçue en pensant aux personnes, pas aux processus. La technologie doit rapprocher, jamais isoler.",
  },
  {
    icon: Lightbulb,
    title: "Simplicité radicale",
    description:
      "La complexité est l'ennemi de l'adoption. Nous rendons le puissant simple et l'utile accessible à tous.",
  },
  {
    icon: Shield,
    title: "Confiance & Sécurité",
    description:
      "Les données de votre communauté sont sacrées. Nous les protégeons avec le même soin que vous portez à vos membres.",
  },
  {
    icon: Eye,
    title: "Transparence totale",
    description:
      "Pas de frais cachés, pas de surprises. Notre code de conduite et nos pratiques sont ouverts et honnêtes.",
  },
  {
    icon: HandHeart,
    title: "Impact mesurable",
    description:
      "Notre succès se mesure au nombre d'églises qui grandissent et de communautés qui s'épanouissent grâce à nos outils.",
  },
];

// ─── About Team ──────────────────────────────────────────
export interface TeamMember {
  name: string;
  role: string;
  bio: string;
}

export const TEAM_MEMBERS: TeamMember[] = [
  {
    name: "Emmanuel Kofi",
    role: "Fondateur & CEO",
    bio: "Ancien développeur chez Google, passionné par la tech au service de l'Église depuis 12 ans.",
  },
  {
    name: "Naomi Assani",
    role: "Directrice Produit",
    bio: "10 ans d'expérience en product management dans la fintech. Diaconesse dans son église locale.",
  },
  {
    name: "Marc-Antoine Dufour",
    role: "CTO",
    bio: "Architecte logiciel senior, contributeur open source. Passionné par les systèmes distribués.",
  },
  {
    name: "Ruth Ndiaye",
    role: "Head of Design",
    bio: "Designer UI/UX primée, ancienne de Figma. Elle croit que le beau design glorifie Dieu.",
  },
];

// ─── Features Page Categories ────────────────────────────
export interface FeatureCategory {
  id: string;
  label: string;
  icon: LucideIcon;
  features: {
    title: string;
    description: string;
    icon: LucideIcon;
  }[];
}

export const FEATURE_CATEGORIES: FeatureCategory[] = [
  {
    id: "members",
    label: "Membres",
    icon: Users,
    features: [
      {
        title: "Annuaire intelligent",
        description: "Recherchez, filtrez et segmentez vos membres par n'importe quel critère. Profils complets avec photo et coordonnées.",
        icon: Users,
      },
      {
        title: "Gestion des familles",
        description: "Liez les membres par famille pour une vue complète des foyers. Gérez les relations parent-enfant facilement.",
        icon: Heart,
      },
      {
        title: "Parcours spirituel",
        description: "Suivez les étapes clés : baptême, formation, engagement, ministère. Identifiez les besoins de suivi pastoral.",
        icon: BookOpen,
      },
      {
        title: "Import & Export",
        description: "Importez vos données depuis Excel, CSV ou d'autres systèmes. Exportez à tout moment sans restriction.",
        icon: Globe,
      },
    ],
  },
  {
    id: "communication",
    label: "Communication",
    icon: MessageSquare,
    features: [
      {
        title: "Emails personnalisés",
        description: "Créez de beaux emails avec notre éditeur visuel. Modèles prêts à l'emploi pour chaque occasion.",
        icon: Mail,
      },
      {
        title: "SMS & Notifications",
        description: "Envoyez des SMS individuels ou groupés. Notifications push pour les rappels urgents.",
        icon: Smartphone,
      },
      {
        title: "Segmentation avancée",
        description: "Ciblez précisément vos communications par groupe, âge, ministère, fréquentation ou tout autre critère.",
        icon: Users,
      },
      {
        title: "Automatisations",
        description: "Messages de bienvenue automatiques, rappels d'anniversaire, suivi des absences et bien plus.",
        icon: Zap,
      },
    ],
  },
  {
    id: "events",
    label: "Événements",
    icon: Calendar,
    features: [
      {
        title: "Calendrier partagé",
        description: "Vue mensuelle, hebdomadaire et quotidienne. Synchronisation avec Google Calendar et Outlook.",
        icon: Calendar,
      },
      {
        title: "Inscriptions en ligne",
        description: "Formulaires d'inscription personnalisables avec paiement intégré pour les retraites et conférences.",
        icon: CheckCircle2,
      },
      {
        title: "Gestion des bénévoles",
        description: "Planifiez les équipes de service, gérez les rotations et envoyez des rappels automatiques.",
        icon: HandHeart,
      },
      {
        title: "Check-in digital",
        description: "Enregistrement des présences par QR code. Statistiques de fréquentation en temps réel.",
        icon: Smartphone,
      },
    ],
  },
  {
    id: "finance",
    label: "Finances",
    icon: CreditCard,
    features: [
      {
        title: "Dons en ligne",
        description: "Page de don personnalisée, dons récurrents, multiples moyens de paiement (CB, virement, PayPal).",
        icon: CreditCard,
      },
      {
        title: "Suivi des dîmes",
        description: "Historique complet par membre, rappels optionnels, objectifs de campagne de collecte.",
        icon: BarChart3,
      },
      {
        title: "Reçus fiscaux",
        description: "Génération automatique des reçus fiscaux conformes à la réglementation canadienne.",
        icon: CheckCircle2,
      },
      {
        title: "Rapports financiers",
        description: "Budgets par département, suivi des dépenses, rapports personnalisables et exports comptables.",
        icon: BarChart3,
      },
    ],
  },
  {
    id: "admin",
    label: "Administration",
    icon: Shield,
    features: [
      {
        title: "Rôles & permissions",
        description: "Contrôle d'accès granulaire par rôle. Chaque responsable voit uniquement ce qui le concerne.",
        icon: Lock,
      },
      {
        title: "Journaux d'audit",
        description: "Traçabilité complète de toutes les actions. Conformité Loi 25 et protection des données.",
        icon: Eye,
      },
      {
        title: "Sauvegardes auto",
        description: "Sauvegardes quotidiennes automatiques. Restauration en un clic en cas de besoin.",
        icon: Cloud,
      },
      {
        title: "Support dédié",
        description: "Équipe de support francophone disponible par chat, email et téléphone.",
        icon: Headphones,
      },
    ],
  },
];

// ─── Features Comparison ─────────────────────────────────
export const FEATURES_COMPARISON = [
  {
    feature: "Interface moderne",
    ecclesiaflow: true,
    traditional: false,
    spreadsheet: false,
  },
  {
    feature: "Application mobile",
    ecclesiaflow: true,
    traditional: "Limitée",
    spreadsheet: false,
  },
  {
    feature: "Gestion des membres",
    ecclesiaflow: "Complète",
    traditional: "Basique",
    spreadsheet: "Manuelle",
  },
  {
    feature: "Communication multicanale",
    ecclesiaflow: true,
    traditional: "Email seul",
    spreadsheet: false,
  },
  {
    feature: "Dons en ligne",
    ecclesiaflow: true,
    traditional: "Module payant",
    spreadsheet: false,
  },
  {
    feature: "Rapports automatisés",
    ecclesiaflow: true,
    traditional: "Limités",
    spreadsheet: "Manuels",
  },
  {
    feature: "Protection des données",
    ecclesiaflow: true,
    traditional: "Partielle",
    spreadsheet: false,
  },
  {
    feature: "Support en français",
    ecclesiaflow: true,
    traditional: "Anglais",
    spreadsheet: false,
  },
  {
    feature: "Temps de mise en place",
    ecclesiaflow: "5 minutes",
    traditional: "Semaines",
    spreadsheet: "Heures",
  },
  {
    feature: "Prix de départ",
    ecclesiaflow: "Gratuit",
    traditional: "$50/mois",
    spreadsheet: "Gratuit",
  },
];

// ─── Footer Links ────────────────────────────────────────
export const FOOTER_LINKS = {
  Produit: [
    { label: "Fonctionnalités", href: "/features" },
    { label: "Tarifs", href: "/pricing" },
    { label: "Aperçu", href: "/preview" },
    { label: "Intégrations", href: "/features#integrations" },
    { label: "Changelog", href: "#" },
  ],
  Entreprise: [
    { label: "À propos", href: "/about" },
    { label: "Blog", href: "#" },
    { label: "Carrières", href: "#" },
    { label: "Presse", href: "#" },
    { label: "Contact", href: "#" },
  ],
  Ressources: [
    { label: "Documentation", href: "#" },
    { label: "Guides", href: "#" },
    { label: "Webinaires", href: "#" },
    { label: "Communauté", href: "#" },
    { label: "Status", href: "#" },
  ],
  Légal: [
    { label: "Confidentialité", href: "#" },
    { label: "CGU", href: "#" },
    { label: "Cookies", href: "#" },
    { label: "Loi 25", href: "#" },
  ],
};

// ─── Bible Verse (Footer) ────────────────────────────────
export const BIBLE_VERSE = {
  text: "Car là où deux ou trois sont assemblés en mon nom, je suis au milieu d'eux.",
  reference: "Matthieu 18:20",
};
