import { useEffect, useRef, useState } from "react"
import { galleryCopy } from "../content/website.ts"
import { reactionFilters, reactionsFor, stickerPackPath, type Reaction, type ReactionFilter } from "../data/reactions.ts"
import { assetUrl } from "../lib/assetUrl.ts"
import { ReactionCard } from "./ReactionCard.tsx"
import { Button } from "./Button.tsx"

export function ReactionGallery() {
  const [filter, setFilter] = useState<ReactionFilter>("all")
  const [selected, setSelected] = useState<Reaction | null>(null)
  const [imageFailed, setImageFailed] = useState(false)
  const dialogRef = useRef<HTMLDialogElement>(null)
  const triggerRef = useRef<HTMLButtonElement | null>(null)
  const visible = reactionsFor(filter)

  useEffect(() => {
    const dialog = dialogRef.current
    if (!dialog || !selected || dialog.open) return
    dialog.showModal()
  }, [selected])

  function closeDialog() {
    dialogRef.current?.close()
    setSelected(null)
    triggerRef.current?.focus()
  }

  return (
    <div>
      <div className="filter-row" role="group" aria-label="Reaction filters">
        {reactionFilters.map((item) => (
          <button
            key={item.id}
            type="button"
            className="filter-button"
            aria-pressed={filter === item.id}
            onClick={() => setFilter(item.id)}
          >
            {item.label}
          </button>
        ))}
      </div>
      <p className="status" role="status" aria-live="polite">
        {galleryCopy.showing(visible.length)}
      </p>
      {visible.length === 0 ? (
        <p>{galleryCopy.empty}</p>
      ) : (
        <div className="gallery">
          {visible.map((reaction) => (
            <ReactionCard
              key={reaction.id}
              reaction={reaction}
              onView={(next, trigger) => {
                triggerRef.current = trigger
                setImageFailed(false)
                setSelected(next)
              }}
            />
          ))}
        </div>
      )}
      <div className="pack-row">
        <a className="btn btn-gold" href={assetUrl(stickerPackPath)} download="elonerd-12-stickers.zip">
          {galleryCopy.pack}
        </a>
      </div>
      <dialog
        ref={dialogRef}
        className="sticker-dialog"
        aria-labelledby="sticker-title"
        onClose={() => {
          setSelected(null)
          triggerRef.current?.focus()
        }}
      >
        {selected ? (
          <div>
            <h2 id="sticker-title">{selected.name}</h2>
            <p>{galleryCopy.description}</p>
            {imageFailed ? (
              <p>{galleryCopy.imageFailure}</p>
            ) : (
              <img
                src={assetUrl(selected.png1024)}
                alt=""
                width={1024}
                height={1024}
                onError={() => setImageFailed(true)}
              />
            )}
            <div className="dialog-actions">
              <a className="btn btn-gold" href={assetUrl(selected.png512)} download={selected.file512}>
                {galleryCopy.download512}
              </a>
              <a className="btn btn-turquoise" href={assetUrl(selected.png1024)} download={selected.file1024}>
                {galleryCopy.download1024}
              </a>
              {imageFailed ? (
                <p>
                  {galleryCopy.downloadFailure}{" "}
                  <a href={assetUrl(selected.png1024)}>Open the image directly</a>
                </p>
              ) : null}
              <Button variant="outline" onClick={closeDialog}>
                {galleryCopy.close}
              </Button>
            </div>
          </div>
        ) : null}
      </dialog>
    </div>
  )
}
