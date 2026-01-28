import { PopularityDashboard } from "./components/PopularityDashboard";

function App() {
  return (
    <div className="min-h-screen bg-gray-50">
      <PopularityDashboard />
      <footer className="border-t p-8 text-center text-xs text-gray-400">
        Data courtesy of Digital Extremes - 2025 Stats
      </footer>
    </div>
  );
}

export default App;
