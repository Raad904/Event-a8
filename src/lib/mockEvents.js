/**
 * Mock MongoDB event data simulating database records.
 * In production: db.collection('events').find({ date: { $gte: new Date() } }).sort({ date: 1 }).limit(6)
 */
export const mockEvents = [
  {
    _id: "e1",
    title: "Community Clean-Up Drive",
    date: new Date("2026-11-05T09:00:00"),
    location: "Green Valley Park",
    description: "Join 200+ volunteers for a city-wide clean-up and recycling awareness campaign.",
    image: "https://images.unsplash.com/photo-1559027615-cd462c6fb5e6?w=600&q=80",
  },
  {
    _id: "e2",
    title: "Free Health Screening Camp",
    date: new Date("2026-11-12T10:00:00"),
    location: "Community Wellness Center",
    description: "Free health checkups, blood donation, and wellness consultations for all ages.",
    image: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=600&q=80",
  },
  {
    _id: "e3",
    title: "Youth Education Workshop",
    date: new Date("2026-11-18T14:00:00"),
    location: "Public Library Hall",
    description: "Interactive workshops focused on digital literacy and STEM skills for underprivileged students.",
    image: "https://images.unsplash.com/photo-1524178232363-1fb2b075b655?w=600&q=80",
  },
  {
    _id: "e4",
    title: "Tree Plantation Marathon",
    date: new Date("2026-11-22T07:30:00"),
    location: "Riverside Trail",
    description: "Plant 500 native trees along the riverbank. Tools and saplings provided.",
    image: "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=600&q=80",
  },
  {
    _id: "e5",
    title: "Food Distribution Program",
    date: new Date("2026-11-28T11:00:00"),
    location: "Central Food Bank",
    description: "Distribute nutritious meal packs to families in need across three neighborhoods.",
    image: "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?w=600&q=80",
  },
  {
    _id: "e6",
    title: "Senior Companion Visit",
    date: new Date("2026-12-03T15:00:00"),
    location: "Golden Age Home",
    description: "Spend quality time with senior residents through games, storytelling, and music.",
    image: "https://images.unsplash.com/photo-1517457373958-b7bdd4587205?w=600&q=80",
  },
  {
    _id: "e7",
    title: "Beach Cleanup Initiative",
    date: new Date("2026-12-10T08:00:00"),
    location: "Sunset Beach",
    description: "Protect marine life by removing plastic waste and debris from our coastline.",
    image: "https://images.unsplash.com/photo-1500375592092-040eb43e8fc5?w=600&q=80",
  },
];
