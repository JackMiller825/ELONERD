import { BrowserRouter, Route, Routes } from "react-router-dom"
import { Shell } from "./components/Shell.tsx"
import { CommunityPage } from "./pages/CommunityPage.tsx"
import { HomePage } from "./pages/HomePage.tsx"
import { NotFoundPage } from "./pages/NotFoundPage.tsx"
import { TokenPage } from "./pages/TokenPage.tsx"

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Shell />}>
          <Route index element={<HomePage />} />
          <Route path="token" element={<TokenPage />} />
          <Route path="community" element={<CommunityPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}
