import { maker } from "../content/website.ts"

export type MedalExportInput = {
  displayName: string
  category: string
  victory: string
  imageUrl: string
}

function graphemes(value: string): string[] {
  if (typeof Intl !== "undefined" && "Segmenter" in Intl) {
    return [...new Intl.Segmenter(undefined, { granularity: "grapheme" }).segment(value)].map((part) => part.segment)
  }
  return [...value]
}

export function wrapMeasuredText(ctx: CanvasRenderingContext2D, text: string, maxWidth: number): string[] {
  const words =
    typeof Intl !== "undefined" && "Segmenter" in Intl
      ? [...new Intl.Segmenter(undefined, { granularity: "word" }).segment(text)].map((part) => part.segment)
      : text.split(/(\s+)/)
  const lines: string[] = []
  let line = ""

  const pushBroken = (chunk: string) => {
    let current = ""
    for (const glyph of graphemes(chunk)) {
      const trial = current + glyph
      if (ctx.measureText(trial).width <= maxWidth || current.length === 0) current = trial
      else {
        lines.push(current)
        current = glyph
      }
    }
    line = current
  }

  for (const word of words) {
    const trial = line + word
    if (ctx.measureText(trial).width <= maxWidth) {
      line = trial
      continue
    }
    if (line.trim()) {
      lines.push(line.trimEnd())
      line = ""
    }
    if (ctx.measureText(word).width <= maxWidth) line = word
    else pushBroken(word.trimStart())
  }
  if (line.trim()) lines.push(line.trimEnd())
  return lines.length > 0 ? lines : [""]
}

function loadImage(src: string): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const image = new Image()
    image.onload = () => {
      if (image.decode) {
        image.decode().then(() => resolve(image)).catch(() => resolve(image))
        return
      }
      resolve(image)
    }
    image.onerror = () => reject(new Error("image"))
    image.src = src
  })
}

async function assertFont(spec: string) {
  await document.fonts.load(spec)
  await document.fonts.ready
  if (!document.fonts.check(spec)) throw new Error("font")
}

function rounded(ctx: CanvasRenderingContext2D, x: number, y: number, w: number, h: number, r: number) {
  ctx.beginPath()
  ctx.roundRect(x, y, w, h, r)
}

export async function exportMedalCard(input: MedalExportInput): Promise<Blob> {
  const canvas = document.createElement("canvas")
  canvas.width = 1200
  canvas.height = 630
  const ctx = canvas.getContext("2d")
  if (!ctx) throw new Error("canvas")

  await assertFont("700 72px Fredoka")
  await assertFont("700 28px Nunito")
  const image = await loadImage(input.imageUrl)

  ctx.fillStyle = "#EADDF7"
  ctx.fillRect(0, 0, 1200, 630)
  rounded(ctx, 28, 28, 1144, 574, 36)
  ctx.fillStyle = "#FFF9ED"
  ctx.fill()
  ctx.lineWidth = 8
  ctx.strokeStyle = "#241235"
  ctx.stroke()
  rounded(ctx, 44, 44, 1112, 542, 28)
  ctx.lineWidth = 4
  ctx.strokeStyle = "#F7BF47"
  ctx.stroke()

  ctx.fillStyle = "#28C9CA"
  rounded(ctx, 72, 78, 280, 42, 21)
  ctx.fill()
  ctx.fillStyle = "#241235"
  ctx.font = "700 18px Nunito"
  ctx.fillText("TINY VICTORY", 104, 106)

  ctx.font = "700 58px Fredoka"
  ctx.fillStyle = "#241235"
  ctx.fillText("Certified tiny victory.", 72, 196)

  ctx.font = "700 28px Nunito"
  ctx.fillStyle = "#241235"
  const caption = `${input.displayName} · ${input.category}`
  const captionLines = wrapMeasuredText(ctx, caption, 640)
  captionLines.forEach((captionLine, index) => {
    ctx.fillText(captionLine, 72, 250 + index * 36)
  })

  let fontSize = 36
  ctx.font = `700 ${fontSize}px Nunito`
  let victoryLines = wrapMeasuredText(ctx, input.victory, 620)
  while (victoryLines.length > 4 && fontSize > 24) {
    fontSize -= 2
    ctx.font = `700 ${fontSize}px Nunito`
    victoryLines = wrapMeasuredText(ctx, input.victory, 620)
  }
  const victoryTop = 250 + captionLines.length * 36 + 28
  victoryLines.forEach((victoryLine, index) => {
    ctx.fillText(victoryLine, 72, victoryTop + index * (fontSize + 8))
  })

  ctx.font = "700 28px Fredoka"
  ctx.fillStyle = "#241235"
  ctx.fillText(maker.brand, 72, 500)
  ctx.font = "700 20px Nunito"
  ctx.fillStyle = "#241235"
  ctx.fillText(maker.smallPrint, 72, 540)

  const boxX = 760
  const boxY = 120
  const boxW = 340
  const boxH = 400
  const scale = Math.min(boxW / image.width, boxH / image.height)
  const dw = image.width * scale
  const dh = image.height * scale
  ctx.drawImage(image, boxX + (boxW - dw) / 2, boxY + (boxH - dh) / 2, dw, dh)

  const blob = await new Promise<Blob | null>((resolve) => {
    canvas.toBlob((result) => resolve(result), "image/png")
  })
  if (!blob) throw new Error("blob")
  return blob
}
