import { Routes, Route, Navigate } from "react-router-dom";
import { Auth } from "@/layouts";

function App() {

  return (
    <Routes>
      <Route path="/page/*" element={<Auth />} />
      <Route path="*" element={<Navigate to="/page/accueil" replace />} />
    </Routes>
  )
}

export default App
