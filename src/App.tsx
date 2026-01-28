import { Suspense, lazy } from "react";

const PopularityDashboard = lazy(() =>
  import("./components/PopularityDashboard").then((m) => ({
    default: m.PopularityDashboard,
  })),
);

function App() {
  return (
    <div className="bg-background selection:bg-primary/20 flex min-h-screen flex-col">
      <div className="pointer-events-none fixed inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(200,164,92,0.03),transparent_40%)]" />
      <main className="relative grow">
        <Suspense
          fallback={
            <div className="flex h-screen items-center justify-center">
              <div className="border-primary/20 border-t-primary h-8 w-8 animate-spin rounded-full border"></div>
            </div>
          }
        >
          <PopularityDashboard />
        </Suspense>
      </main>
      <footer className="relative border-t border-white/5 p-8 text-center text-[9px] tracking-[0.2em] text-white/20 uppercase">
        This is a fan-made project. All data and trademarks are property of
        Digital Extremes.
      </footer>
    </div>
  );
}

export default App;
