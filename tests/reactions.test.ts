import assert from "node:assert/strict"
import { test } from "node:test"
import { reactions, reactionsFor } from "../src/data/reactions.ts"

test("gallery has 12 original stickers and 3 bonus poses", () => {
  assert.equal(reactions.length, 15)
  assert.equal(reactions.filter((item) => item.group === "original").length, 12)
  assert.equal(reactions.filter((item) => item.group === "bonus").length, 3)
  assert.deepEqual(reactionsFor("joy").map((item) => item.name), ["Happy", "Laughing", "Excited"])
  assert.deepEqual(reactionsFor("hard").map((item) => item.name), ["Sad", "Angry", "Scared", "Shocked", "Tired"])
  assert.deepEqual(reactionsFor("thinking").map((item) => item.name), ["Confused"])
  assert.deepEqual(reactionsFor("attitude").map((item) => item.name), ["Smug", "Embarrassed"])
  assert.deepEqual(reactionsFor("affection").map((item) => item.name), ["Loving"])
  assert.deepEqual(reactionsFor("bonus").map((item) => item.name), ["Building", "Medal Overload", "Rocket Ready"])
  assert.equal(reactionsFor("all").length, 15)
  const files = new Set(reactions.map((item) => item.png1024))
  assert.equal(files.size, 15)
})
