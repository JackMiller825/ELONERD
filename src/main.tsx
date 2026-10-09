import { StrictMode } from "react"
import { createRoot } from "react-dom/client"
import "@fontsource/fredoka/latin-600.css"
import "@fontsource/fredoka/latin-700.css"
import "@fontsource/nunito/latin-400.css"
import "@fontsource/nunito/latin-600.css"
import "@fontsource/nunito/latin-700.css"
import "./styles/global.css"
import App from "./App.tsx"

const root = document.getElementById("root")
if (!root) throw new Error("Root element missing")

createRoot(root).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
