export const dummyUser = {
  id: "U001",
  name: "Alexander",
  points: 1250,
};

export const categories = [
  { id: "c1", name: "Kopitiam Signatures" },
  { id: "c2", name: "Rice Dishes" },
  { id: "c3", name: "Noodles" },
  { id: "c4", name: "Toasts & Snacks" },
  { id: "c5", name: "Drinks" },
];

export const menuItems = [
  {
    id: "m1",
    categoryId: "c1",
    name: "Hainanese Chicken Rice",
    description: "Classic poached chicken with fragrant rice and ginger-garlic sauce.",
    price: 45000,
    image: "https://images.unsplash.com/photo-1626804475297-4160aeea1a52?auto=format&fit=crop&q=80&w=500",
  },
  {
    id: "m2",
    categoryId: "c3",
    name: "Char Kway Teow",
    description: "Stir-fried flat rice noodles with prawns, egg, and Chinese sausage.",
    price: 42000,
    image: "https://images.unsplash.com/photo-1610057099443-fde8c4d50f91?auto=format&fit=crop&q=80&w=500",
  },
  {
    id: "m3",
    categoryId: "c4",
    name: "Kaya Butter Toast",
    description: "Crispy toast with traditional coconut jam and cold butter slice.",
    price: 25000,
    image: "https://images.unsplash.com/photo-1525268771113-32d9e9021a97?auto=format&fit=crop&q=80&w=500",
  },
  {
    id: "m4",
    categoryId: "c5",
    name: "Kopi O Peng",
    description: "Iced traditional black coffee with sugar.",
    price: 18000,
    image: "https://images.unsplash.com/photo-1541167760496-1628856ab772?auto=format&fit=crop&q=80&w=500",
  },
  {
    id: "m5",
    categoryId: "c5",
    name: "Teh Tarik",
    description: "Pulled milk tea, frothy and perfectly sweet.",
    price: 20000,
    image: "https://images.unsplash.com/photo-1576092762791-dd9e2220afa1?auto=format&fit=crop&q=80&w=500",
  },
  {
    id: "m6",
    categoryId: "c2",
    name: "Nasi Lemak",
    description: "Coconut rice with fried chicken, anchovies, peanuts, egg and sambal.",
    price: 48000,
    image: "https://images.unsplash.com/photo-1604908176997-125f25cc6f3d?auto=format&fit=crop&q=80&w=500",
  },
  {
    id: "m7",
    categoryId: "c4",
    name: "Half-Boiled Eggs",
    description: "Two perfectly soft-boiled eggs with soy sauce and white pepper.",
    price: 15000,
    image: "https://images.unsplash.com/photo-1504151932400-72d4384f0e14?auto=format&fit=crop&q=80&w=500",
  }
];

export const recentOrders = [
  {
    id: "ORD-8821",
    date: "2026-05-09T10:30:00Z",
    status: "completed",
    total: 88000,
    items: "Char Kway Teow, Teh Tarik",
  },
  {
    id: "ORD-8845",
    date: "2026-05-10T12:15:00Z",
    status: "ready", // created, confirmed, ready, completed
    total: 63000,
    items: "Hainanese Chicken Rice, Kopi O Peng",
  }
];

export const rewards = [
  {
    id: "r1",
    name: "Free Kopi O",
    pointsRequired: 500,
  },
  {
    id: "r2",
    name: "Free Kaya Toast",
    pointsRequired: 800,
  },
  {
    id: "r3",
    name: "10% Off Total Bill",
    pointsRequired: 1500,
  }
];
