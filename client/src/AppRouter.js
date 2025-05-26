import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import GestionMagasin from "./components/GestionMagasin";
import App from "./App"; // Ou ta page produits, selon ton structure

export default function AppRouter() {
  return (
    <Router>
      <Routes>
        {/* Redirige la racine "/" vers "/magasin" */}
        <Route path="/" element={<Navigate to="/magasin" replace />} />
        <Route path="/magasin" element={<GestionMagasin />} />
        <Route path="/produits" element={<App />} />
      </Routes>
    </Router>
  );
}
