import { existsSync, readFileSync } from "node:fs"
import { join } from "node:path"

const inputRoot = "design-inputs/elonerd"
const publicRoot = "public/assets/elonerd"
const csv = readFileSync(join(inputRoot, "assets-manifest.csv"), "utf8")
const rows = csv.trim().split(/\r?\n/).slice(1)
let missing = 0
for (const row of rows) {
  const relative = row.slice(0, row.indexOf(","))
  if (!existsSync(join(inputRoot, relative))) {
    console.error(`missing input ${relative}`)
    missing += 1
  }
  if (/^(branding|website|social)\//.test(relative) && !existsSync(join(publicRoot, relative))) {
    console.error(`missing public ${relative}`)
    missing += 1
  }
}
if (missing) {
  console.error(`${missing} asset paths failed`)
  process.exit(1)
}
console.log(`manifest ok (${rows.length} entries)`)
