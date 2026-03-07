import appLogo from "../assets/logo/logo.png";

const tableData = [
  {
    id: "FARM-001",
    farmer: "Meena Devi",
    village: "Yadamaipalayam",
    land: "2.5 ha",
    crop: "Rice",
    status: "Active",
    updated: "Mar 6, 2026",
  },
  {
    id: "FARM-002",
    farmer: "Ravi Kumar",
    village: "Kovilpatti",
    land: "1.8 ha",
    crop: "Millets",
    status: "Active",
    updated: "Mar 4, 2026",
  },
  {
    id: "FARM-003",
    farmer: "Radha Rani",
    village: "Ponnamaravathi",
    land: "3.3 ha",
    crop: "Cotton",
    status: "Needs follow-up",
    updated: "Mar 1, 2026",
  },
  {
    id: "FARM-004",
    farmer: "Suresh Babu",
    village: "Periyakulam",
    land: "1.2 ha",
    crop: "Groundnut",
    status: "Active",
    updated: "Feb 28, 2026",
  },
];

export default function HomePage() {
  return (
    <div className="min-h-screen bg-slate-950/40 py-10 px-6">
      <div className="mx-auto w-full max-w-6xl space-y-10 rounded-3xl border border-white/30 bg-white/70 p-8 shadow-[0_40px_120px_rgba(2,6,23,0.35)] backdrop-blur-lg">
        <header className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <img
              src={appLogo}
              alt="Nalam Soil logo"
              className="h-12 w-12 rounded-2xl border border-slate-200 bg-white p-1"
            />
            <div>
              <p className="text-sm uppercase tracking-[0.4em] text-slate-400">
                Nalam Soil
              </p>
              <p className="text-2xl font-semibold text-slate-900">
                Farmer dashboard
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="text-right">
              <p className="text-sm font-semibold text-slate-900">Agri Officer</p>
              <p className="text-xs text-slate-500">officer@nalamsoil.gov</p>
            </div>
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-rose-900 to-orange-500 text-white shadow-lg shadow-rose-900/40">
              AR
            </div>
          </div>
        </header>

        <section className="space-y-4 rounded-2xl border border-slate-200/70 bg-white/80 p-6 shadow-sm shadow-slate-500/10">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs uppercase tracking-[0.4em] text-slate-400">
                Farming activity
              </p>
              <h2 className="text-2xl font-semibold text-slate-900">
                Latest field registrations
              </h2>
            </div>
            <button className="rounded-full border border-slate-200 px-4 py-1 text-xs font-semibold uppercase tracking-tight text-slate-500 transition hover:border-slate-400">
              Export
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="min-w-full text-left text-sm">
              <thead>
                <tr className="text-xs uppercase tracking-[0.3em] text-slate-400">
                  <th className="px-4 py-2">Farm ID</th>
                  <th className="px-4 py-2">Farmer</th>
                  <th className="px-4 py-2">Village</th>
                  <th className="px-4 py-2">Land</th>
                  <th className="px-4 py-2">Crop</th>
                  <th className="px-4 py-2">Status</th>
                  <th className="px-4 py-2">Updated</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-slate-600">
                {tableData.map((row) => (
                  <tr key={row.id} className="transition hover:bg-slate-50">
                    <td className="px-4 py-3 font-semibold text-slate-800">
                      {row.id}
                    </td>
                    <td className="px-4 py-3">{row.farmer}</td>
                    <td className="px-4 py-3">{row.village}</td>
                    <td className="px-4 py-3">{row.land}</td>
                    <td className="px-4 py-3">{row.crop}</td>
                    <td
                      className={`px-4 py-3 font-semibold ${
                        row.status === "Active"
                          ? "text-emerald-600"
                          : "text-amber-600"
                      }`}
                    >
                      {row.status}
                    </td>
                    <td className="px-4 py-3">{row.updated}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <section className="grid gap-6 md:grid-cols-3">
          {[
            { label: "Total farmers", value: "1,248" },
            { label: "Fields added this week", value: "64" },
            { label: "Average land per famer", value: "2.1 ha" },
          ].map((stat) => (
            <div
              key={stat.label}
              className="rounded-2xl border border-slate-200/70 bg-white/80 px-6 py-5 text-center shadow-sm"
            >
              <p className="text-xs uppercase tracking-[0.4em] text-slate-400">
                {stat.label}
              </p>
              <p className="mt-3 text-3xl font-semibold text-slate-900">
                {stat.value}
              </p>
            </div>
          ))}
        </section>
      </div>
    </div>
  );
}
