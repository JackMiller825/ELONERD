import assert from "node:assert/strict"
import { test } from "node:test"
import { validateMedalForm } from "../src/lib/medalForm.ts"

test("victory is required and capped at 80 characters", () => {
  const empty = validateMedalForm({ name: "", victory: "   ", category: "Printer Whisperer" })
  assert.equal(empty.ok, false)
  if (!empty.ok) assert.equal(empty.error.message, "Add a tiny victory first.")

  const tooLong = validateMedalForm({ name: "Ada", victory: "a".repeat(81), category: "Printer Whisperer" })
  assert.equal(tooLong.ok, false)
  if (!tooLong.ok) assert.equal(tooLong.error.message, "Keep your victory to 80 characters or fewer.")

  const exact = validateMedalForm({ name: "", victory: "b".repeat(80), category: "Helpful Human" })
  assert.equal(exact.ok, true)
  if (exact.ok) {
    assert.equal(exact.displayName, "A proud nerd")
    assert.equal(exact.victory.length, 80)
    assert.equal(exact.category, "Helpful Human")
  }
})

test("unicode graphemes count toward the limit and names are not truncated", () => {
  const victory = "🔧".repeat(80)
  const ok = validateMedalForm({ name: "  ", victory, category: "Side-Project Finisher" })
  assert.equal(ok.ok, true)
  const over = validateMedalForm({ name: "n".repeat(31), victory: "Fixed it", category: "Printer Whisperer" })
  assert.equal(over.ok, false)
  if (!over.ok) assert.equal(over.error.field, "name")
})
