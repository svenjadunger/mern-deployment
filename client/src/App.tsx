import Plant from "./components/Plant";
import "../globals.css";
function App() {
  return (
    <>
      <p className="text-center">Scroll down to see 🪴🌿🌵</p>
      <style>
        {`
          @keyframes spin {
            from { transform: rotate(0deg); }
            to { transform: rotate(360deg); }
          }
          .spin {
            animation: spin 2s linear infinite;
          }
        `}
      </style>
      <div className="flex justify-center items-center min-h-screen">
        <h1 className="text-7xl spin">I ❤️ Svenja Dunger</h1>
      </div>
      <Plant />
    </>
  );
}

export default App;
