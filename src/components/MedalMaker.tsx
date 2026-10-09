import { useEffect, useId, useRef, useState, type FormEvent } from "react"
import { awards, maker } from "../content/website.ts"
import { assetUrl } from "../lib/assetUrl.ts"
import { medalCategories, textLength, validateMedalForm, VICTORY_LIMIT, type MedalCategory } from "../lib/medalForm.ts"
import { Button } from "./Button.tsx"
import { ResponsiveImage } from "./ResponsiveImage.tsx"

type Preview = {
  displayName: string
  victory: string
  category: MedalCategory
}

export function MedalMaker() {
  const [name, setName] = useState("")
  const [victory, setVictory] = useState("")
  const [category, setCategory] = useState<MedalCategory>(medalCategories[0])
  const [error, setError] = useState<{ field: "name" | "victory"; message: string } | null>(null)
  const [preview, setPreview] = useState<Preview | null>(null)
  const [status, setStatus] = useState("")
  const [busy, setBusy] = useState(false)
  const [downloadUrl, setDownloadUrl] = useState<string | null>(null)
  const [shareFile, setShareFile] = useState<File | null>(null)
  const [canShare, setCanShare] = useState(false)
  const nameRef = useRef<HTMLInputElement>(null)
  const victoryRef = useRef<HTMLTextAreaElement>(null)
  const nameId = useId()
  const victoryId = useId()
  const categoryId = useId()
  const errorId = useId()
  const nameHelpId = useId()
  const victoryHelpId = useId()

  useEffect(() => {
    return () => {
      if (downloadUrl) URL.revokeObjectURL(downloadUrl)
    }
  }, [downloadUrl])

  const pose = awards.categories.find((item) => item.title === (preview?.category ?? category)) ?? awards.categories[0]
  const victoryCount = textLength(victory)

  function resetShare(nextUrl: string | null) {
    setDownloadUrl((current) => {
      if (current && current !== nextUrl) URL.revokeObjectURL(current)
      return nextUrl
    })
    setShareFile(null)
    setCanShare(false)
  }

  function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const result = validateMedalForm({ name, victory, category })
    if (!result.ok) {
      setError(result.error)
      setPreview(null)
      resetShare(null)
      if (result.error.field === "name") nameRef.current?.focus()
      else victoryRef.current?.focus()
      return
    }
    setError(null)
    setPreview({ displayName: result.displayName, victory: result.victory, category: result.category })
    setStatus("")
    resetShare(null)
  }

  function startOver() {
    setName("")
    setVictory("")
    setCategory(medalCategories[0])
    setError(null)
    setPreview(null)
    setStatus("")
    resetShare(null)
    nameRef.current?.focus()
  }

  async function downloadCard() {
    if (!preview || busy) return
    setBusy(true)
    setStatus(maker.loading)
    try {
      const { exportMedalCard } = await import("../lib/exportMedalCard.ts")
      const blob = await exportMedalCard({
        displayName: preview.displayName,
        category: preview.category,
        victory: preview.victory,
        imageUrl: assetUrl(pose.png),
      })
      const file = new File([blob], maker.filename, { type: "image/png" })
      const url = URL.createObjectURL(blob)
      resetShare(url)
      setShareFile(file)
      const shareable = typeof navigator.canShare === "function" && navigator.canShare({ files: [file] })
      setCanShare(shareable)
      const anchor = document.createElement("a")
      anchor.href = url
      anchor.download = maker.filename
      document.body.append(anchor)
      anchor.click()
      anchor.remove()
      setStatus(maker.success)
    } catch {
      setStatus(maker.failure)
    } finally {
      setBusy(false)
    }
  }

  async function shareCard() {
    if (!shareFile || busy) return
    if (!navigator.canShare?.({ files: [shareFile] })) {
      setStatus(maker.shareFallback)
      return
    }
    try {
      await navigator.share({ files: [shareFile], title: maker.resultTitle })
    } catch (reason) {
      if (reason instanceof DOMException && reason.name === "AbortError") return
      setStatus(maker.shareFallback)
      const anchor = document.createElement("a")
      if (!downloadUrl) return
      anchor.href = downloadUrl
      anchor.download = maker.filename
      document.body.append(anchor)
      anchor.click()
      anchor.remove()
    }
  }

  return (
    <div className="maker-grid">
      <form className="card maker-form" onSubmit={onSubmit} noValidate>
        <h3>{maker.title}</h3>
        <div className="field">
          <label htmlFor={nameId}>{maker.nameLabel}</label>
          <input
            ref={nameRef}
            id={nameId}
            name="display-name"
            value={name}
            placeholder={maker.namePlaceholder}
            aria-invalid={error?.field === "name"}
            aria-describedby={`${nameHelpId}${error?.field === "name" ? ` ${errorId}` : ""}`}
            onChange={(event) => setName(event.target.value)}
          />
          <p id={nameHelpId} className="helper">
            {maker.nameHelper}
          </p>
        </div>
        <div className="field">
          <label htmlFor={victoryId}>{maker.victoryLabel}</label>
          <textarea
            ref={victoryRef}
            id={victoryId}
            name="victory"
            value={victory}
            placeholder={maker.victoryPlaceholder}
            rows={4}
            aria-invalid={error?.field === "victory"}
            aria-describedby={`${victoryHelpId}${error?.field === "victory" ? ` ${errorId}` : ""}`}
            onChange={(event) => setVictory(event.target.value)}
          />
          <p id={victoryHelpId} className="helper">
            {maker.victoryHelper} <span className="counter">{victoryCount}/{VICTORY_LIMIT}</span>
          </p>
        </div>
        <div className="field">
          <label htmlFor={categoryId}>{maker.categoryLabel}</label>
          <select
            id={categoryId}
            name="category"
            value={category}
            onChange={(event) => setCategory(event.target.value as MedalCategory)}
          >
            {medalCategories.map((item) => (
              <option key={item} value={item}>
                {item}
              </option>
            ))}
          </select>
        </div>
        {error ? (
          <p id={errorId} className="form-error" role="alert">
            {error.message}
          </p>
        ) : null}
        <Button type="submit" variant="gold">
          {maker.generate}
        </Button>
      </form>
      <div className="maker-preview">
        {preview ? (
          <article className="medal-card" aria-label="Medal card preview">
            <div>
              <h3>{maker.resultTitle}</h3>
              <p className="medal-caption">
                {preview.displayName} · {preview.category}
              </p>
              <p>{preview.victory}</p>
              <p className="medal-brand">{maker.brand}</p>
              <p className="helper">{maker.smallPrint}</p>
            </div>
            <ResponsiveImage src={pose.png} webp={pose.webp} alt={pose.alt} width={800} height={800} />
          </article>
        ) : (
          <ResponsiveImage
            src={maker.blankPath}
            alt=""
            width={1200}
            height={630}
          />
        )}
        <div className="dialog-actions">
          {preview ? (
            <>
              {downloadUrl ? (
                <a className="btn btn-turquoise" href={downloadUrl} download={maker.filename}>
                  {maker.download}
                </a>
              ) : (
                <Button variant="turquoise" onClick={downloadCard} disabled={busy}>
                  {maker.download}
                </Button>
              )}
              {canShare && shareFile ? (
                <Button variant="outline" onClick={shareCard} disabled={busy}>
                  {maker.share}
                </Button>
              ) : null}
              <Button
                variant="outline"
                onClick={() => {
                  nameRef.current?.focus()
                }}
              >
                {maker.edit}
              </Button>
              <Button variant="plum" onClick={startOver}>
                {maker.reset}
              </Button>
            </>
          ) : null}
        </div>
        <p className="status" role="status" aria-live="polite">
          {status}
        </p>
        <p>{maker.privacy}</p>
        <p>{maker.staticAlternative}</p>
        <p>
          <a className="btn btn-outline" href={assetUrl(maker.blankPath)} download="elonerd-medal-card-template-1200x630.png">
            {maker.blank}
          </a>
        </p>
        <p>{maker.sharingInstruction}</p>
      </div>
    </div>
  )
}
