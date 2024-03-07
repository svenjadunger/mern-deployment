import Plant from "./components/Plant";
import "../globals.css";
import { NavigationMenuDemo } from "./components/Navbar";

function App() {
  return (
    <>
      <NavigationMenuDemo />
      <p className="text-center">🪴🌿🌵</p>

      <Plant />
    </>
  );
}

export default App;
