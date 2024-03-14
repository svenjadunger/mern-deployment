import Register from "./components/Register";
import Login from "./components/Login";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Plant from "./components/Plant";
import PlantDetail from "./components/PlantDetail";
import { NavigationMenuDemo } from "./components/Navbar";
import "../globals.css";
import ImageUpload from "./components/ImageUpload";

function App() {
  return (
    <Router>
      <>
        <NavigationMenuDemo />
        <p className="text-center">🪴🌿🌵</p>
        <Routes>
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/imageUpload" element={<ImageUpload />} />
          <Route path="/" element={<Plant />} />
          <Route path="/plants/:plantId" element={<PlantDetail />} />
        </Routes>
      </>
    </Router>
  );
}

export default App;
