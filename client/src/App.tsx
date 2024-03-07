import Register from "./components/Register";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Plant from "./components/Plant";
import PlantDetail from "./components/PlantDetail";
import { NavigationMenuDemo } from "./components/Navbar";
import "../globals.css";

function App() {
  return (
    <Router>
      <>
        <NavigationMenuDemo />
        <p className="text-center">🪴🌿🌵</p>
        <Routes>
          <Route path="/register" element={<Register />} />
          <Route path="/" element={<Plant />} />
          <Route path="/plants/:plantId" element={<PlantDetail />} />
        </Routes>
      </>
    </Router>
  );
}

export default App;
