import { PopularityDashboard } from "./components/PopularityDashboard";

function App() {
  return (
    <div className="flex min-h-screen flex-col bg-gray-50">
      <main className="grow">
        <PopularityDashboard />
      </main>
      <footer className="border-t p-8 text-center text-xs text-gray-400">
        Data courtesy of Digital Extremes - Warframe Usage Data 2022-2025
      </footer>
    </div>
  );
}

export default App;
