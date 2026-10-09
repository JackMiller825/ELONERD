import { useEffect, useRef, useState } from "react"
import { hero } from "../content/website.ts"
import { Button } from "./Button.tsx"

export function MedalCelebrate() {
  const [message, setMessage] = useState("")
  const [burst, setBurst] = useState(false)
  const cooling = useRef(false)
  const timer = useRef<number | null>(null)

  useEffect(() => {
    return () => {
      if (timer.current !== null) window.clearTimeout(timer.current)
    }
  }, [])

  function celebrate() {
    if (cooling.current) return
    cooling.current = true
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches
    setMessage(hero.activated)
    setBurst(!reduce)
    if (timer.current !== null) window.clearTimeout(timer.current)
    timer.current = window.setTimeout(() => {
      cooling.current = false
      setBurst(false)
      timer.current = null
    }, 650)
  }

  return (
    <div className="medal-celebrate">
      <Button variant="gold" onClick={celebrate}>
        {hero.medalLabel}
      </Button>
      {burst ? (
        <div className="confetti" aria-hidden="true">
          {["a", "b", "c", "d", "e", "f", "g", "h"].map((piece) => (
            <span key={piece} className={`confetti-piece piece-${piece}`} />
          ))}
        </div>
      ) : null}
      <p className="status" role="status" aria-live="polite">
        {message}
      </p>
    </div>
  )
}
