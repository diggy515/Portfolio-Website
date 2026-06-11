/** Featured track — hosted on Cloudflare R2. Paste public URLs once uploaded. */
export const FEATURED_TRACK = {
  id: "so-into-you",
  title: "So Into You",
  meta: "Featured · Single",
  /** Audio file URL on R2. Leave empty until uploaded. */
  audioUrl: "https://media.tanmayawahal.com/SIY.wav",
  /** Peaks JSON URL on R2. Format: { peaks: number[], duration: number }. Leave empty until uploaded. */
  peaksUrl: "https://media.tanmayawahal.com/SIY.peaks.json",
  /** Cover art — drop in /public/assets/ or use an external URL. */
  coverArt: "https://media.tanmayawahal.com/SIY%20Cover%20Art.png",
  coverAlt: "So Into You — cover art",
  /** Duration in seconds (used as placeholder before peaks JSON loads). */
  duration: 222,
};

/** Spotify embeds — each needs the track ID and the `si` tracking param. */
export const SPOTIFY_EMBEDS = [
  { title: "Hodrick Reflex", id: "05juC04lmsb7WODpISrcJI", si: "241b4867df244796" },
  { title: "Goldmine",       id: "6i8F8FFKKqgmVkZgnSqvIG", si: "bfc281e14de2414d" },
  { title: "Kahani",         id: "2RiZNenrEdYtIu8SwhEyMe", si: "028bd641e1f24fb3" },
  { title: "For You",        id: "2MIe3wQALrpv3SMjLK2YpE", si: "bbf22dcc2b3c4380" },
  { title: "one blink",      id: "1EoQIFrP96ZCr8LWdqugS7", si: "e2fc9eaee29a4e78" },
  { title: "City Lights",    id: "0lQ9axoi6RCUFNtohsm6W9", si: "7727207645644e1e" },
  { title: "RUNNING",        id: "6YrNEbpJtQu8A40WBpcX5H", si: "18912ab59112434c" },
];
