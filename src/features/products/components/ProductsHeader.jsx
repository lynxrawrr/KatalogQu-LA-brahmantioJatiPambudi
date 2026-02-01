import {
  FiPlus,
  FiRefreshCw,
  FiSearch,
  FiFilter,
  FiPackage,
  FiEye,
} from "react-icons/fi";

export default function ProductsHeader({
  total,
  showing,
  query,
  onQueryChange,
  category,
  categories,
  onCategoryChange,
  onAdd,
  onRefresh,
  busy,
}) {
  return (
    // Add Section
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-white">
            Produk
          </h1>
          <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
            Kelola produk toko Anda dengan cepat dan rapi.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={onRefresh}
            disabled={busy}
            className="group grid h-10 w-10 place-items-center rounded-full border border-slate-200 bg-white text-slate-500 transition hover:border-slate-300 hover:text-slate-900 disabled:opacity-50 dark:bg-slate-800 dark:border-slate-700 dark:text-slate-400 dark:hover:text-white dark:hover:border-slate-600"
            title="Refresh Data"
          >
            <FiRefreshCw
              className={`transition ${busy ? "animate-spin" : "group-hover:rotate-180"}`}
            />
          </button>

          <button
            type="button"
            onClick={onAdd}
            disabled={busy}
            className="inline-flex h-10 items-center justify-center gap-2 rounded-full bg-slate-900 px-6 text-sm font-semibold text-white shadow-lg shadow-slate-900/20 transition hover:bg-slate-800 hover:translate-y-px disabled:opacity-70 dark:bg-blue-600 dark:shadow-blue-900/20 dark:hover:bg-blue-500"
          >
            <FiPlus className="text-lg" />
            <span>Tambah Produk</span>
          </button>
        </div>
      </div>

      {/* Filter Section */}
      <div className="rounded-3xl border border-slate-200 bg-white p-2 shadow-sm dark:bg-slate-900 dark:border-slate-800">
        <div className="grid gap-2 sm:grid-cols-[1fr,minmax(200px,auto)]">
          <label className="relative">
            <FiSearch className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              value={query}
              onChange={(e) => onQueryChange(e.target.value)}
              placeholder="Cari nama produk"
              className="w-full rounded-2xl border-none bg-slate-50 py-3 pl-11 pr-4 text-sm font-medium text-slate-900 ring-1 ring-transparent transition focus:bg-white focus:ring-slate-200 focus:outline-none placeholder:text-slate-400 dark:bg-slate-800 dark:text-white dark:focus:bg-slate-800 dark:focus:ring-slate-600"
            />
          </label>

          <div className="relative">
            <FiFilter className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
            <select
              value={category}
              onChange={(e) => onCategoryChange(e.target.value)}
              className="w-full appearance-none rounded-2xl border-none bg-slate-50 py-3 pl-11 pr-10 text-sm font-medium text-slate-900 ring-1 ring-transparent transition focus:bg-white focus:ring-slate-200 focus:outline-none cursor-pointer dark:bg-slate-800 dark:text-white dark:focus:bg-slate-800 dark:focus:ring-slate-600"
            >
              <option value="all">Semua Kategori</option>
              {(categories || []).map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
            <div className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 border-l border-slate-200 pl-3 dark:border-slate-700">
              <svg
                className="h-4 w-4 text-slate-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </div>
          </div>
        </div>
      </div>

      {/* Chips Section */}
      <div className="flex items-center gap-2 px-1">
        <div className="inline-flex items-center gap-2 rounded-full bg-white border border-slate-200 px-3 py-1 shadow-sm dark:bg-slate-900 dark:border-slate-800">
          <FiPackage className="text-[14px] text-slate-500 dark:text-slate-300" />
          <span className="text-xs font-medium text-slate-600 dark:text-slate-300">
            Total: {total}
          </span>
        </div>
        <div className="inline-flex items-center gap-2 rounded-full bg-white border border-slate-200 px-3 py-1 shadow-sm dark:bg-slate-900 dark:border-slate-800">
          <FiEye className="text-[14px] text-slate-500 dark:text-slate-300" />
          <span className="text-xs font-medium text-slate-600 dark:text-slate-300">
            Showing: {showing}
          </span>
        </div>
      </div>
    </div>
  );
}
