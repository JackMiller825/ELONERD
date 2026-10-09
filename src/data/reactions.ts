export type ReactionFilter = "all" | "joy" | "hard" | "thinking" | "attitude" | "affection" | "bonus"

export type Reaction = {
  id: string
  name: string
  group: "original" | "bonus"
  filter: Exclude<ReactionFilter, "all">
  thumb: string
  thumbWebp?: string
  png512: string
  png1024: string
  file512: string
  file1024: string
}

const sticker = (file: string) => ({
  png512: `assets/elonerd/website/stickers/chat-512/${file}`,
  png1024: `assets/elonerd/website/stickers/masters-1024/${file}`,
  file512: file,
  file1024: file,
})

export const reactions: Reaction[] = [
  { id: "happy", name: "Happy", group: "original", filter: "joy", thumb: sticker("001-elonerd-happy.png").png512, ...sticker("001-elonerd-happy.png") },
  { id: "laughing", name: "Laughing", group: "original", filter: "joy", thumb: sticker("002-elonerd-laughing.png").png512, ...sticker("002-elonerd-laughing.png") },
  { id: "excited", name: "Excited", group: "original", filter: "joy", thumb: sticker("003-elonerd-excited.png").png512, ...sticker("003-elonerd-excited.png") },
  { id: "sad", name: "Sad", group: "original", filter: "hard", thumb: sticker("004-elonerd-sad.png").png512, ...sticker("004-elonerd-sad.png") },
  { id: "angry", name: "Angry", group: "original", filter: "hard", thumb: sticker("005-elonerd-angry.png").png512, ...sticker("005-elonerd-angry.png") },
  { id: "scared", name: "Scared", group: "original", filter: "hard", thumb: sticker("006-elonerd-scared.png").png512, ...sticker("006-elonerd-scared.png") },
  { id: "shocked", name: "Shocked", group: "original", filter: "hard", thumb: sticker("007-elonerd-shocked.png").png512, ...sticker("007-elonerd-shocked.png") },
  { id: "confused", name: "Confused", group: "original", filter: "thinking", thumb: sticker("008-elonerd-confused.png").png512, ...sticker("008-elonerd-confused.png") },
  { id: "smug", name: "Smug", group: "original", filter: "attitude", thumb: sticker("009-elonerd-smug.png").png512, ...sticker("009-elonerd-smug.png") },
  { id: "embarrassed", name: "Embarrassed", group: "original", filter: "attitude", thumb: sticker("010-elonerd-embarrassed.png").png512, ...sticker("010-elonerd-embarrassed.png") },
  { id: "loving", name: "Loving", group: "original", filter: "affection", thumb: sticker("011-elonerd-loving.png").png512, ...sticker("011-elonerd-loving.png") },
  { id: "tired", name: "Tired", group: "original", filter: "hard", thumb: sticker("012-elonerd-tired.png").png512, ...sticker("012-elonerd-tired.png") },
  {
    id: "building",
    name: "Building",
    group: "bonus",
    filter: "bonus",
    thumb: "assets/elonerd/website/elonerd-reaction-building-512.png",
    thumbWebp: "assets/elonerd/website/optimized/elonerd-reaction-building-transparent.webp",
    png512: "assets/elonerd/website/elonerd-reaction-building-512.png",
    png1024: "assets/elonerd/website/elonerd-reaction-building-transparent.png",
    file512: "elonerd-reaction-building-512.png",
    file1024: "elonerd-reaction-building-transparent.png",
  },
  {
    id: "medal-overload",
    name: "Medal Overload",
    group: "bonus",
    filter: "bonus",
    thumb: "assets/elonerd/website/elonerd-reaction-medal-overload-512.png",
    thumbWebp: "assets/elonerd/website/optimized/elonerd-reaction-medal-overload-transparent.webp",
    png512: "assets/elonerd/website/elonerd-reaction-medal-overload-512.png",
    png1024: "assets/elonerd/website/elonerd-reaction-medal-overload-transparent.png",
    file512: "elonerd-reaction-medal-overload-512.png",
    file1024: "elonerd-reaction-medal-overload-transparent.png",
  },
  {
    id: "rocket-ready",
    name: "Rocket Ready",
    group: "bonus",
    filter: "bonus",
    thumb: "assets/elonerd/website/elonerd-reaction-rocket-ready-512.png",
    thumbWebp: "assets/elonerd/website/optimized/elonerd-reaction-rocket-ready-transparent.webp",
    png512: "assets/elonerd/website/elonerd-reaction-rocket-ready-512.png",
    png1024: "assets/elonerd/website/elonerd-reaction-rocket-ready-transparent.png",
    file512: "elonerd-reaction-rocket-ready-512.png",
    file1024: "elonerd-reaction-rocket-ready-transparent.png",
  },
]

export const reactionFilters: { id: ReactionFilter; label: string }[] = [
  { id: "all", label: "All" },
  { id: "joy", label: "Joy" },
  { id: "hard", label: "Hard days" },
  { id: "thinking", label: "Thinking" },
  { id: "attitude", label: "Attitude" },
  { id: "affection", label: "Affection" },
  { id: "bonus", label: "Bonus" },
]

export function reactionsFor(filter: ReactionFilter): Reaction[] {
  if (filter === "all") return reactions
  return reactions.filter((reaction) => reaction.filter === filter)
}

export const stickerPackPath = "assets/elonerd/website/downloads/elonerd-12-stickers.zip"
