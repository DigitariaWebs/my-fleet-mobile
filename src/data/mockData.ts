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
    description: "Icône sportive par excellence.",
    chauffeurAvailable: true,
    chauffeurPrice: 120,
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
    description: "La sportivité pure.",
    chauffeurAvailable: true,
    chauffeurPrice: 150,
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
    description: "Sportivité extrême et praticité.",
    chauffeurAvailable: true,
    chauffeurPrice: 120,
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
    description: "Élégance britannique et technologie de pointe.",
    chauffeurAvailable: true,
    chauffeurPrice: 100,
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
    description: "Le break sportif ultime.",
    chauffeurAvailable: true,
    chauffeurPrice: 130,
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
    description: "La berline la plus rapide du monde.",
    chauffeurAvailable: true,
    chauffeurPrice: 110,
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

export const vehicleImages: string[] = [
  "https://images.unsplash.com/photo-1654159866733-09f0614c3b79?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400",
  "https://images.unsplash.com/photo-1629086314381-8f4c852a3c03?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400",
  "https://images.unsplash.com/photo-1771670305417-41ab8254689e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400",
  "https://images.unsplash.com/photo-1506616995931-556bc0c90c16?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400",
  "https://images.unsplash.com/photo-1648482845536-8882f465df95?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400",
  "https://images.unsplash.com/photo-1648571902986-fd8cd71256b3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400",
];
