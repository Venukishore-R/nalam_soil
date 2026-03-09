import appLogo from "../assets/logo/logo.png";

export default function HomePage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-950/40 px-6">
      <div className="flex flex-col items-center gap-6 rounded-3xl border border-white/30 bg-white/70 p-12 shadow-[0_40px_120px_rgba(2,6,23,0.35)] backdrop-blur-lg">
        <img
          src={appLogo}
          alt="Nalam Soil logo"
          className="h-16 w-16 rounded-2xl border border-slate-200 bg-white p-2"
        />

        <h1 className="text-3xl font-semibold text-slate-900">Nalam Soil</h1>

        <p className="text-lg font-medium text-slate-600">
          🚧 Dashboard Under Development
        </p>

        <p className="text-sm text-slate-500 text-center max-w-sm">
          The farmer dashboard is currently being built. New features and data
          visualization will be available soon.
        </p>
      </div>
    </div>
  );
}
