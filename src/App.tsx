import { Suspense, lazy } from "react";

const PopularityDashboard = lazy(() =>
  import("./components/PopularityDashboard").then((m) => ({
    default: m.PopularityDashboard,
  })),
);

function App() {
  return (
    <div className="flex min-h-screen flex-col bg-gray-50">
      <main className="grow">
        <Suspense
          fallback={
            <div className="flex h-screen items-center justify-center">
              <div className="h-8 w-8 animate-spin rounded-full border-4 border-blue-600 border-t-transparent"></div>
            </div>
          }
        >
          <PopularityDashboard />
        </Suspense>
      </main>
      <footer className="border-t p-8 text-center text-xs text-gray-400">
        Data courtesy of Digital Extremes - Warframe Usage Data 2022-2025
      </footer>
    </div>
  );
}

export default App;
