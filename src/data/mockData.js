// 個人資料
export const MY_UPDATES = [
  {
    id: "u1",
    date: "20/04/2026",
    content: "Morning run in the park! Feel AMAZING 🌞",
    stats: { distance: "5.2", time: "32", pace: "6'09\"" },
    likes: 14,
    comments: 3,
    shares: 12,
  },
  {
    id: "u2",
    date: "18/04/2026",
    content: "Pushing my limits today! 🔥",
    stats: { distance: "10.5", time: "65", pace: "6'12\"" },
    likes: 28,
    comments: 5,
    shares: 8,
  },
];
// Home 排行榜使用
export const MOCK_USERS = [
  {
    id: 1,
    name: "Mike Chen",
    avatarId: 1,
    lastRun: "2 hours ago",
    pace: "6'09\"",
    weeklyKm: 42,
    streakDays: 5,
  },
  {
    id: 2,
    name: "Alison",
    avatarId: 2,
    lastRun: "4 hours ago",
    pace: "8'09\"",
    weeklyKm: 28,
    streakDays: 3,
  },
  {
    id: 3,
    name: "Jason",
    avatarId: 3,
    lastRun: "Yesterday",
    pace: "5'45\"",
    weeklyKm: 55,
    streakDays: 12,
  },
];
// 朋友post
export const MOCK_POSTS = [
  {
    id: "1",
    userId: 1, // 對應 Mike Chen
    name: "Mike Chen",
    timeAgo: "10 min ago",
    content: "Morning run in the park! Feel AMAZING 🌞",
    stats: { distanceKm: 5.2, timeMin: 32, pace: "6'09\"" },
    likes: 24,
    comments: 3,
    shares: 12,
    coords: [
      { lat: 35.6895, lng: 139.6917 },
      { lat: 35.69, lng: 139.6925 },
    ],
  },
  {
    id: "2",
    userId: 2, // 對應 Alison
    name: "Alison",
    timeAgo: "55 min ago",
    content: "Slow and steady wins the race 🐢",
    stats: { distanceKm: 3.5, timeMin: 40, pace: "8'09\"" },
    likes: 12,
    comments: 1,
    shares: 2,
    coords: [
      { lat: 35.7, lng: 139.7 },
      { lat: 35.71, lng: 139.71 },
    ],
  },
  {
    id: "3",
    userId: 3, // 對應 Alison
    name: "Jason",
    timeAgo: "2 hours ago",
    content: "Breaking my personal record today! 🔥",
    stats: { distanceKm: 23.5, timeMin: 90, pace: "7'09\"" },
    likes: 482,
    comments: 121,
    shares: 10,
    coords: [
      { lat: 35.7, lng: 219.7 },
      { lat: 35.71, lng: 219.71 },
    ],
  },
];
