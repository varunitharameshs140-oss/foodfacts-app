import { Routes, Route, Link } from "react-router-dom";
import HomePage from "./pages/HomePage.jsx";
import DetailPage from "./pages/DetailPage.jsx";
import SavedPage from "./pages/SavedPage.jsx";

function App() {
  return (
    <div style={{ textAlign: "center" }}>
      <h1>🍔 FoodFacts</h1>

      <nav style={{ marginBottom: "20px" }}>
        <Link to="/" style={{ margin: "10px" }}>Home</Link>
        <Link to="/saved" style={{ margin: "10px" }}>Saved</Link>
      </nav>

      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/product/:barcode" element={<DetailPage />} />
        <Route path="/saved" element={<SavedPage />} />
      </Routes>
    </div>
  );
}

export default App;