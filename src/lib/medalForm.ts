export const NAME_LIMIT = 30
export const VICTORY_LIMIT = 80
export const DEFAULT_DISPLAY_NAME = "A proud nerd"

export const medalCategories = [
  "Printer Whisperer",
  "Side-Project Finisher",
  "Helpful Human",
] as const

export type MedalCategory = (typeof medalCategories)[number]

export function textLength(value: string): number {
  if (typeof Intl !== "undefined" && "Segmenter" in Intl) {
    return [...new Intl.Segmenter(undefined, { granularity: "grapheme" }).segment(value)].length
  }
  return [...value].length
}

export type MedalFieldError = {
  field: "name" | "victory"
  message: string
}

export function validateMedalForm(input: {
  name: string
  victory: string
  category: string
}): { ok: true; displayName: string; victory: string; category: MedalCategory } | { ok: false; error: MedalFieldError } {
  const name = input.name.trim()
  const victory = input.victory.trim()
  const category = medalCategories.find((item) => item === input.category) ?? medalCategories[0]

  if (textLength(name) > NAME_LIMIT) {
    return { ok: false, error: { field: "name", message: "Keep your name to 30 characters or fewer." } }
  }
  if (!victory) {
    return { ok: false, error: { field: "victory", message: "Add a tiny victory first." } }
  }
  if (textLength(victory) > VICTORY_LIMIT) {
    return { ok: false, error: { field: "victory", message: "Keep your victory to 80 characters or fewer." } }
  }
  return {
    ok: true,
    displayName: name || DEFAULT_DISPLAY_NAME,
    victory,
    category,
  }
}
