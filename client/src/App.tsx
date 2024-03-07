import Plant from "./components/Plant";
import "../globals.css";
import { NavigationMenuDemo } from "./components/Navbar";

function App() {
  return (
    <>
      <NavigationMenuDemo />
      <p className="text-center">Scroll down to see 🪴🌿🌵</p>

      <Plant />
    </>
  );
}

export default App;
