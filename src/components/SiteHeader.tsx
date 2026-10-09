import { useEffect, useId, useRef, useState } from "react"
import { NavLink } from "react-router-dom"
import { assetUrl } from "../lib/assetUrl.ts"
import { shared } from "../content/website.ts"
import { Icon } from "./Icon.tsx"
import { LinkButton } from "./Button.tsx"

const links = [
  { to: "/", label: shared.home, end: true },
  { to: "/token", label: shared.token, end: false },
  { to: "/community", label: shared.community, end: false },
]

export function SiteHeader() {
  const dialogRef = useRef<HTMLDialogElement>(null)
  const menuButtonRef = useRef<HTMLButtonElement>(null)
  const restoreFocus = useRef(true)
  const [open, setOpen] = useState(false)
  const menuId = useId()

  function closeMenu(shouldRestore: boolean) {
    restoreFocus.current = shouldRestore
    const dialog = dialogRef.current
    if (dialog?.open) dialog.close()
    setOpen(false)
  }

  function openMenu() {
    restoreFocus.current = true
    dialogRef.current?.showModal()
    setOpen(true)
  }

  useEffect(() => {
    const dialog = dialogRef.current
    if (!dialog) return
    const onClose = () => {
      setOpen(false)
      if (restoreFocus.current) menuButtonRef.current?.focus()
    }
    dialog.addEventListener("close", onClose)
    return () => dialog.removeEventListener("close", onClose)
  }, [])

  useEffect(() => {
    const media = window.matchMedia("(min-width: 1024px)")
    const onChange = () => {
      if (media.matches) dialogRef.current?.close()
    }
    media.addEventListener("change", onChange)
    return () => media.removeEventListener("change", onChange)
  }, [])

  return (
    <header className="site-header">
      <div className="container header-bar">
        <NavLink to="/" className="brand" aria-label="Elonerd home" onClick={() => closeMenu(false)}>
          <img src={assetUrl("assets/elonerd/branding/elonerd-logo-transparent.png")} alt="" width={1024} height={1024} />
          <span>Elonerd</span>
        </NavLink>
        <nav className="desktop-nav" aria-label="Primary">
          {links.map((link) => (
            <NavLink key={link.to} to={link.to} end={link.end}>
              {link.label}
            </NavLink>
          ))}
        </nav>
        <LinkButton to="/community" className="desktop-cta">
          {shared.joinClub}
        </LinkButton>
        <button
          ref={menuButtonRef}
          type="button"
          className="menu-button"
          aria-expanded={open}
          aria-controls={menuId}
          onClick={() => (open ? closeMenu(false) : openMenu())}
        >
          <Icon name="menu" />
          {shared.openMenu}
        </button>
      </div>
      <dialog
        ref={dialogRef}
        id={menuId}
        className="nav-dialog"
        aria-label="Primary"
        onClick={(event) => {
          if (event.target === event.currentTarget) closeMenu(true)
        }}
      >
        <div className="nav-dialog-panel">
          <div className="nav-dialog-top">
            <span className="brand-lockup">Elonerd</span>
            <button type="button" className="menu-button" onClick={() => closeMenu(true)}>
              <Icon name="close" />
              {shared.closeMenu}
            </button>
          </div>
          <nav className="mobile-nav">
            {links.map((link) => (
              <NavLink key={link.to} to={link.to} end={link.end} onClick={() => closeMenu(false)}>
                {link.label}
              </NavLink>
            ))}
          </nav>
          <LinkButton to="/community" onClick={() => closeMenu(false)}>
            {shared.joinClub}
          </LinkButton>
        </div>
      </dialog>
    </header>
  )
}
