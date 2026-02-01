import { NavLink } from "react-router-dom";
import { FiArrowLeft, FiHome } from "react-icons/fi";

export default function NotFoundPage() {
  return (
    <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm dark:bg-slate-900 dark:border-slate-800 transition-colors">
      <div className="text-sm font-semibold text-slate-500 dark:text-slate-400">
        Error 404
      </div>

      <h1 className="mt-2 text-2xl font-bold tracking-tight text-slate-900 dark:text-white">
        Halaman tidak ditemukan
      </h1>

      <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">
        URL yang kamu buka tidak ada. Coba kembali ke halaman utama.
      </p>

      <div className="mt-6 flex flex-wrap gap-2">
        <NavLink
          to="/products"
          className="inline-flex items-center gap-2 rounded-2xl bg-slate-900 px-4 py-2 text-sm font-semibold text-white hover:bg-slate-800 dark:bg-blue-600 dark:hover:bg-blue-500"
        >
          <FiHome />
          Ke Products
        </NavLink>

        <NavLink
          to={-1}
          className="inline-flex items-center gap-2 rounded-2xl border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-50 dark:bg-slate-800 dark:border-slate-700 dark:text-slate-200 dark:hover:bg-slate-700"
        >
          <FiArrowLeft />
          Kembali
        </NavLink>
      </div>
    </div>
  );
}
