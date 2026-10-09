import { useEffect, useLayoutEffect, useRef } from "react"
import { Outlet, useLocation, useNavigate, useNavigationType } from "react-router-dom"
import { SiteFooter } from "./SiteFooter.tsx"
import { SiteHeader } from "./SiteHeader.tsx"
import { shared } from "../content/website.ts"

function scrollToHash(hash: string) {
  const id = decodeURIComponent(hash.replace(/^#/, ""))
  if (!id) return false
  const target = document.getElementById(id)
  if (!target) return false
  target.scrollIntoView({ block: "start" })
  if (!target.hasAttribute("tabindex")) target.setAttribute("tabindex", "-1")
  target.focus({ preventScroll: true })
  return true
}

export function Shell() {
  const location = useLocation()
  const navigate = useNavigate()
  const navType = useNavigationType()
  const first = useRef(true)

  useLayoutEffect(() => {
    if (location.pathname.length > 1 && location.pathname.endsWith("/")) {
      navigate(`${location.pathname.replace(/\/+$/, "")}${location.search}${location.hash}`, { replace: true })
    }
  }, [location.hash, location.pathname, location.search, navigate])

  useEffect(() => {
    const initial = first.current
    first.current = false
    if (navType === "POP" && !initial) return
    if (location.hash && scrollToHash(location.hash)) return
    if (initial) return
    window.scrollTo(0, 0)
    document.getElementById("content")?.focus()
  }, [location.pathname, location.hash, navType])

  return (
    <>
      <a className="skip" href="#content">
        {shared.skip}
      </a>
      <SiteHeader />
      <main id="content" tabIndex={-1} className="route-fade" key={location.pathname}>
        <Outlet />
      </main>
      <SiteFooter />
    </>
  )
}
