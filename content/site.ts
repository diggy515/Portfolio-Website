export const SITE = {
  name: "Tanmaya Wahal",
  tagline: ["Music Producer", "Sound Designer", "Guitarist"],
  description: "Tanmaya Wahal — Music Producer, Sound Designer, Playback Engineer, Guitarist.",
  url: "https://tanmayawahal.com",
};

export const NAV = [
  { label: "About", href: "/about", key: "about" },
  { label: "Music", href: "/music", key: "music" },
  { label: "Sound Design", href: "/sound-design", key: "sound-design" },
  { label: "Limbo", href: "/limbo", key: "limbo" },
  { label: "Contact", href: "/contact", key: "contact" },
] as const;

export type NavKey = (typeof NAV)[number]["key"];
