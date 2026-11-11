export type EventCategory = "Music" | "Speaking" | "Shows";
export type CategoryFilter = "All" | EventCategory;

export type TicketTier = {
  id: string;
  name: string;
  description: string;
  price: number;
};

export type Event = {
  slug: string;
  title: string;
  category: EventCategory;
  date: string;
  time: string;
  venue: string;
  location: string;
  price: number;
  image: string;
  description: string;
  lineup: string[];
  ticketTiers: TicketTier[];
};

export const events: Event[] = [
  {
    slug: "neon-tides-live-in-concert",
    title: "Neon Tides: Live in Concert",
    category: "Music",
    date: "Sat, Mar 14",
    time: "8:00 PM",
    venue: "Harbor Pavilion",
    location: "Seattle, WA",
    price: 45,
    image: "photo-1501386761578-eac5c94b800a",
    description:
      "A night of synth-driven indie rock under open skies. Neon Tides returns with a full light show, strings section and surprise guests.",
    lineup: ["Neon Tides", "Static Bloom", "DJ Marlowe"],
    ticketTiers: [
      {
        id: "general-admission",
        name: "General Admission",
        description: "Standing floor access",
        price: 45,
      },
      {
        id: "balcony",
        name: "Balcony",
        description: "Reserved seat, great view",
        price: 86,
      },
      {
        id: "vip-backstage",
        name: "VIP Backstage",
        description: "Meet and greet, merch bundle",
        price: 190,
      },
    ],
  },
  {
    slug: "future-forward-summit-2026",
    title: "Future Forward Summit 2026",
    category: "Speaking",
    date: "Sat, Mar 28",
    time: "9:00 AM",
    venue: "Grand Convention Hall",
    location: "Austin, TX",
    price: 120,
    image: "photo-1475721027785-f74eccf877e2",
    description:
      "A full day of bold ideas and practical conversations with the people shaping what comes next.",
    lineup: ["Avery Chen", "Dr. Maya Brooks", "The Future Forward Panel"],
    ticketTiers: [
      {
        id: "general-admission",
        name: "General Admission",
        description: "Full-day conference access",
        price: 120,
      },
      {
        id: "reserved-seating",
        name: "Reserved Seating",
        description: "Front section seating",
        price: 180,
      },
      {
        id: "vip-pass",
        name: "VIP Pass",
        description: "Priority seating and speaker lounge",
        price: 320,
      },
    ],
  },
  {
    slug: "midnight-comedy-showcase",
    title: "Midnight Comedy Showcase",
    category: "Shows",
    date: "Fri, Apr 3",
    time: "9:30 PM",
    venue: "The Velvet Room",
    location: "Chicago, IL",
    price: 25,
    image: "photo-1585699324551-f6c309eedeca",
    description:
      "A late-night lineup of sharp stand-up, unexpected guests and good drinks in an intimate room.",
    lineup: ["Rae Collins", "Milo James", "Tess Rivera"],
    ticketTiers: [
      {
        id: "general-admission",
        name: "General Admission",
        description: "Floor seating",
        price: 25,
      },
      {
        id: "reserved-seat",
        name: "Reserved Seat",
        description: "Reserved table seating",
        price: 42,
      },
      {
        id: "vip-table",
        name: "VIP Table",
        description: "Front-row table for two",
        price: 95,
      },
    ],
  },
  {
    slug: "open-air-sessions",
    title: "Open Air Sessions",
    category: "Music",
    date: "Sun, Apr 12",
    time: "5:00 PM",
    venue: "Riverside Park",
    location: "Portland, OR",
    price: 32,
    image: "photo-1492684223066-81342ee5ff30",
    description:
      "An easygoing evening of live music, local food and open-air views by the river.",
    lineup: ["Luna Park", "The Good Hours", "Moss & Meadow"],
    ticketTiers: [
      {
        id: "general-admission",
        name: "General Admission",
        description: "Lawn access",
        price: 32,
      },
      {
        id: "front-lawn",
        name: "Front Lawn",
        description: "Closer stage access",
        price: 58,
      },
      {
        id: "backstage-pass",
        name: "Backstage Pass",
        description: "Artist lounge access",
        price: 140,
      },
    ],
  },
  {
    slug: "ideas-that-move-us",
    title: "Ideas That Move Us",
    category: "Speaking",
    date: "Thu, Apr 23",
    time: "6:30 PM",
    venue: "The Foundry",
    location: "New York, NY",
    price: 55,
    image: "photo-1505373877841-8d25f7d46678",
    description:
      "An evening of fresh perspectives and stories from people turning ambitious ideas into meaningful change.",
    lineup: ["Jordan Lee", "Samira Patel", "Chris Okafor"],
    ticketTiers: [
      {
        id: "general-admission",
        name: "General Admission",
        description: "Standard seating",
        price: 55,
      },
      {
        id: "premium-seat",
        name: "Premium Seat",
        description: "Reserved center seating",
        price: 88,
      },
      {
        id: "vip-reception",
        name: "VIP Reception",
        description: "Premium seat and speaker reception",
        price: 165,
      },
    ],
  },
  {
    slug: "electric-dreams-after-dark",
    title: "Electric Dreams: After Dark",
    category: "Shows",
    date: "Sat, May 2",
    time: "10:00 PM",
    venue: "The Glasshouse",
    location: "Los Angeles, CA",
    price: 38,
    image: "photo-1506157786151-b8491531f063",
    description:
      "A late-night celebration of sound, lights and live performance at one of the city's most electric venues.",
    lineup: ["Nova Lights", "Soft Circuit", "Kairo"],
    ticketTiers: [
      {
        id: "general-admission",
        name: "General Admission",
        description: "Main floor access",
        price: 38,
      },
      {
        id: "balcony",
        name: "Balcony",
        description: "Elevated view of the stage",
        price: 64,
      },
      {
        id: "vip-experience",
        name: "VIP Experience",
        description: "Lounge access and express entry",
        price: 125,
      },
    ],
  },
];
