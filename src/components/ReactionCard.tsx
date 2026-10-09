import { useState } from "react"
import type { Reaction } from "../data/reactions.ts"
import { galleryCopy } from "../content/website.ts"
import { ResponsiveImage } from "./ResponsiveImage.tsx"
import { Button } from "./Button.tsx"

export function ReactionCard({
  reaction,
  onView,
}: {
  reaction: Reaction
  onView: (reaction: Reaction, trigger: HTMLButtonElement) => void
}) {
  const [failed, setFailed] = useState(false)
  return (
    <article className="card reaction-card">
      {reaction.group === "bonus" ? <p className="tag">{galleryCopy.bonusTag}</p> : null}
      {failed ? (
        <p className="art-fallback">{galleryCopy.imageFailure}</p>
      ) : (
        <ResponsiveImage
          className="reaction-art"
          src={reaction.thumb}
          webp={reaction.thumbWebp}
          alt={`Elonerd — ${reaction.name}`}
          width={512}
          height={512}
          onError={() => setFailed(true)}
        />
      )}
      <h3>{reaction.name}</h3>
      <Button
        variant="turquoise"
        onClick={(event) => onView(reaction, event.currentTarget)}
      >
        {galleryCopy.view}
      </Button>
    </article>
  )
}
