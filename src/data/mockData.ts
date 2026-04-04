export interface Agency {
  id: string;
  name: string;
  city: string;
  address: string;
  rating: number;
  reviews: number;
  vehicles: number;
  verified: boolean;
  logo: string;
  description: string;
}

export interface Vehicle {
  id: string;
  name: string;
  year: number;
  transmission: string;
  fuel: string;
  power: string;
  seats: number;
  doors: number;
  trunk: string;
  price: number;
  agencyId: string;
  agencyName: string;
  category: string;
  features: string[];
  description: string;
  chauffeurAvailable: boolean;
  chauffeurPrice: number;
  conditions: {
    minAge: number;
    licenseYears: number;
    deposit: number;
    kmPerDay: number;
  };
}

export const agencies: Agency[] = [
  {
    id: "1",
    name: "Prestige Auto Nice",
    city: "Nice",
    address: "42 Promenade des Anglais, Nice",
    rating: 4.8,
    reviews: 142,
    vehicles: 28,
    verified: true,
    logo: "P",
    description:
      "Leader de la location de véhicules de prestige sur la Côte d'Azur depuis 2010.",
  },
  {
    id: "2",
    name: "Riviera Luxury Cars",
    city: "Cannes",
    address: "Boulevard de la Croisette, Cannes",
    rating: 4.9,
    reviews: 89,
    vehicles: 22,
    verified: true,
    logo: "R",
    description:
      "Spécialiste de la location de voitures de luxe à Cannes et sur toute la Côte d'Azur.",
  },
  {
    id: "3",
    name: "Monaco Premium Fleet",
    city: "Monaco",
    address: "Avenue de Monte-Carlo, Monaco",
    rating: 5.0,
    reviews: 67,
    vehicles: 35,
    verified: true,
    logo: "M",
    description:
      "La référence monégasque pour la location de véhicules d'exception.",
  },
  {
    id: "4",
    name: "Côte d'Azur Motors",
    city: "Antibes",
    address: "Port Vauban, Antibes",
    rating: 4.7,
    reviews: 124,
    vehicles: 19,
    verified: true,
    logo: "C",
    description:
      "Agence familiale offrant un service personnalisé et une sélection raffinée.",
  },
];

export const vehicles: Vehicle[] = [
  {
    id: "1",
    name: "Porsche 911 Carrera S",
    year: 2024,
    transmission: "Auto",
    fuel: "Essence",
    power: "450 ch",
    seats: 4,
    doors: 2,
    trunk: "132 L",
    price: 320,
    agencyId: "1",
    agencyName: "Prestige Auto Nice",
    category: "Sportive",
    features: ["Climatisation", "GPS intégré", "Bluetooth", "Sièges cuir"],
    description: "Icône sportive par excellence, la Porsche 911 Carrera S allie performances exceptionnelles et confort de conduite quotidien. Moteur boxer 6 cylindres de 450 ch, 0-100 km/h en 3.7s.",
    chauffeurAvailable: true,
    chauffeurPrice: 120,
    conditions: { minAge: 25, licenseYears: 3, deposit: 5000, kmPerDay: 300 },
  },
  {
    id: "2",
    name: "Mercedes-AMG GT",
    year: 2024,
    transmission: "Auto",
    fuel: "Essence",
    power: "585 ch",
    seats: 2,
    doors: 2,
    trunk: "285 L",
    price: 450,
    agencyId: "1",
    agencyName: "Prestige Auto Nice",
    category: "Sportive",
    features: ["Climatisation", "GPS intégré", "Bluetooth", "Échappement sport"],
    description: "La Mercedes-AMG GT incarne la sportivité pure. Design agressif et performances de supercar pour une expérience de conduite inoubliable.",
    chauffeurAvailable: true,
    chauffeurPrice: 150,
    conditions: { minAge: 28, licenseYears: 5, deposit: 8000, kmPerDay: 250 },
  },
  {
    id: "3",
    name: "BMW M4 Competition",
    year: 2024,
    transmission: "Auto",
    fuel: "Essence",
    power: "510 ch",
    seats: 4,
    doors: 2,
    trunk: "440 L",
    price: 380,
    agencyId: "2",
    agencyName: "Riviera Luxury Cars",
    category: "Sportive",
    features: ["Climatisation", "GPS intégré", "Sièges cuir M", "Harman Kardon"],
    description: "La BMW M4 Competition offre un équilibre parfait entre sportivité extrême et praticité quotidienne. 510 ch de pur plaisir.",
    chauffeurAvailable: true,
    chauffeurPrice: 120,
    conditions: { minAge: 25, licenseYears: 3, deposit: 6000, kmPerDay: 300 },
  },
  {
    id: "4",
    name: "Range Rover Velar",
    year: 2024,
    transmission: "Auto",
    fuel: "Hybride",
    power: "400 ch",
    seats: 5,
    doors: 4,
    trunk: "632 L",
    price: 280,
    agencyId: "3",
    agencyName: "Monaco Premium Fleet",
    category: "SUV",
    features: ["Climatisation", "Caméra 360°", "Toit panoramique", "Sièges cuir"],
    description: "Le Range Rover Velar combine élégance britannique et technologie de pointe. Confort absolu et présence imposante.",
    chauffeurAvailable: true,
    chauffeurPrice: 100,
    conditions: { minAge: 23, licenseYears: 2, deposit: 4000, kmPerDay: 350 },
  },
  {
    id: "5",
    name: "Audi RS6 Avant",
    year: 2024,
    transmission: "Auto",
    fuel: "Essence",
    power: "600 ch",
    seats: 5,
    doors: 5,
    trunk: "565 L",
    price: 420,
    agencyId: "2",
    agencyName: "Riviera Luxury Cars",
    category: "Berline",
    features: ["Climatisation", "GPS intégré", "Sièges sport", "Bang & Olufsen"],
    description: "L'Audi RS6 Avant est le break sportif ultime. 600 ch, design agressif et praticité familiale dans un même véhicule.",
    chauffeurAvailable: true,
    chauffeurPrice: 130,
    conditions: { minAge: 26, licenseYears: 4, deposit: 7000, kmPerDay: 300 },
  },
  {
    id: "6",
    name: "Tesla Model S Plaid",
    year: 2024,
    transmission: "Auto",
    fuel: "Électrique",
    power: "1020 ch",
    seats: 5,
    doors: 4,
    trunk: "793 L",
    price: 350,
    agencyId: "4",
    agencyName: "Côte d'Azur Motors",
    category: "Électrique",
    features: ["Autopilot", "Écran tactile 17\"", "Climatisation", "Audio Premium"],
    description: "La Tesla Model S Plaid redéfinit la performance électrique. 0-100 km/h en 2.1s, la berline la plus rapide du monde.",
    chauffeurAvailable: true,
    chauffeurPrice: 110,
    conditions: { minAge: 25, licenseYears: 3, deposit: 5500, kmPerDay: 400 },
  },
];

export interface Booking {
  id: string;
  vehicleId: string;
  vehicleName: string;
  agencyName: string;
  startDate: string;
  endDate: string;
  startTime: string;
  endTime: string;
  status: "active" | "confirmed" | "completed";
  total: number;
  reference: string;
  pickupMethod: string;
  deliveryAddress?: string;
  withChauffeur: boolean;
}

export const bookings: Booking[] = [
  {
    id: "1",
    vehicleId: "1",
    vehicleName: "Porsche 911 Carrera S",
    agencyName: "Prestige Auto Nice",
    startDate: "2026-06-12",
    endDate: "2026-06-15",
    startTime: "10:00",
    endTime: "18:00",
    status: "active",
    total: 1370,
    reference: "MF-2026-0847",
    pickupMethod: "delivery",
    deliveryAddress: "14 Rue de France, Nice",
    withChauffeur: true,
  },
  {
    id: "2",
    vehicleId: "4",
    vehicleName: "Range Rover Velar",
    agencyName: "Monaco Premium Fleet",
    startDate: "2026-04-08",
    endDate: "2026-04-11",
    startTime: "09:00",
    endTime: "19:00",
    status: "confirmed",
    total: 980,
    reference: "MF-2026-0832",
    pickupMethod: "agency",
    withChauffeur: false,
  },
  {
    id: "3",
    vehicleId: "2",
    vehicleName: "Mercedes-AMG GT",
    agencyName: "Prestige Auto Nice",
    startDate: "2026-03-15",
    endDate: "2026-03-17",
    startTime: "14:00",
    endTime: "14:00",
    status: "completed",
    total: 1200,
    reference: "MF-2026-0789",
    pickupMethod: "agency",
    withChauffeur: false,
  },
];

export const categories: string[] = [
  "Toutes",
  "Berline",
  "SUV",
  "Sportive",
  "Cabriolet",
  "Électrique",
  "Avec chauffeur",
];

export interface LoyaltyTier {
  id: string;
  name: string;
  points: number;
  color: string;
  benefits: string[];
}

export interface LoyaltyHistoryItem {
  id: string;
  type: "earned" | "spent";
  amount: number;
  description: string;
  date: string;
}

export const loyaltyTiers: LoyaltyTier[] = [
  {
    id: "bronze",
    name: "Bronze",
    points: 0,
    color: "#2E1C2B",
    benefits: [
      "2% de réduction sur toutes les locations",
      "Support par email",
      "Points sur chaque location",
    ],
  },
  {
    id: "silver",
    name: "Argent",
    points: 1000,
    color: "#2E1C2B",
    benefits: [
      "5% de réduction sur toutes les locations",
      "Livraison gratuite",
      "Accès prioritaire aux nouveautés",
      "Support dédié",
    ],
  },
  {
    id: "gold",
    name: "Or",
    points: 3000,
    color: "#4A1942",
    benefits: [
      "10% de réduction sur toutes les locations",
      "Livraison et retour gratuits",
      "Surclassement gratuit selon disponibilité",
      "Accès VIP aux nouveautés",
      "Support prioritaire 24/7",
    ],
  },
  {
    id: "platinum",
    name: "Platine",
    points: 7000,
    color: "#4A1942",
    benefits: [
      "15% de réduction sur toutes les locations",
      "Tous les services gratuits",
      "Surclassement garanti",
      "Accès exclusif aux véhicules de collection",
      "Concierge dédié 24/7",
      "Champagne de bienvenue",
    ],
  },
];

export const loyaltyHistory: LoyaltyHistoryItem[] = [
  {
    id: "1",
    type: "earned",
    amount: 320,
    description: "Location Porsche 911",
    date: "15 Juin",
  },
  {
    id: "2",
    type: "earned",
    amount: 80,
    description: "Avis laissé",
    date: "16 Juin",
  },
  {
    id: "3",
    type: "spent",
    amount: -500,
    description: "Réduction utilisée",
    date: "20 Juin",
  },
  {
    id: "4",
    type: "earned",
    amount: 280,
    description: "Location Range Rover",
    date: "8 Avril",
  },
];

export interface Review {
  id: string;
  agencyId: string;
  userName: string;
  rating: number;
  date: string;
  comment: string;
  agencyResponse: string | null;
}

export const reviews: Review[] = [
  {
    id: "1",
    agencyId: "1",
    userName: "Sophie Martin",
    rating: 5,
    date: "15 Mars 2026",
    comment:
      "Service impeccable ! La Porsche était dans un état parfait et l'équipe très professionnelle. Je recommande vivement.",
    agencyResponse:
      "Merci Sophie pour votre confiance ! Au plaisir de vous revoir bientôt.",
  },
  {
    id: "2",
    agencyId: "1",
    userName: "Ahmed Benali",
    rating: 4,
    date: "10 Mars 2026",
    comment:
      "Très belle expérience. Petit bémol sur le délai de livraison mais le véhicule était exceptionnel.",
    agencyResponse: null,
  },
  {
    id: "3",
    agencyId: "1",
    userName: "Jean-Pierre Dupont",
    rating: 5,
    date: "5 Mars 2026",
    comment:
      "Une agence au top ! Personnel accueillant, véhicules de qualité et tarifs compétitifs.",
    agencyResponse:
      "Merci beaucoup Jean-Pierre ! C'est toujours un plaisir.",
  },
];

export type NotificationType = "booking" | "delivery" | "loyalty" | "kyc" | "review";

export interface Notification {
  id: string;
  type: NotificationType;
  title: string;
  time: string;
  read: boolean;
}

export const notifications: Notification[] = [
  {
    id: "1",
    type: "booking",
    title: "Votre réservation #MF-2026-0847 est confirmée",
    time: "2h",
    read: false,
  },
  {
    id: "2",
    type: "delivery",
    title: "Votre véhicule est en route — arrivée estimée à 10:15",
    time: "3h",
    read: false,
  },
  {
    id: "3",
    type: "loyalty",
    title: "Vous avez gagné 320 points de fidélité",
    time: "1j",
    read: true,
  },
  {
    id: "4",
    type: "kyc",
    title: "Votre identité a été vérifiée avec succès",
    time: "2j",
    read: true,
  },
  {
    id: "5",
    type: "review",
    title: "N'oubliez pas de laisser un avis pour votre dernière location",
    time: "3j",
    read: true,
  },
];

export const vehicleImages: string[] = [
  "https://images.unsplash.com/photo-1654159866733-09f0614c3b79?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400",
  "https://images.unsplash.com/photo-1629086314381-8f4c852a3c03?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400",
  "https://images.unsplash.com/photo-1771670305417-41ab8254689e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400",
  "https://images.unsplash.com/photo-1506616995931-556bc0c90c16?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400",
  "https://images.unsplash.com/photo-1648482845536-8882f465df95?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400",
  "https://images.unsplash.com/photo-1648571902986-fd8cd71256b3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400",
];
