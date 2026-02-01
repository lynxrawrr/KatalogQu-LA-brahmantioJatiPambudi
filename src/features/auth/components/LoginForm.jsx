import { useState } from "react";
import { FiUser, FiLock, FiLogIn } from "react-icons/fi";

export default function LoginForm({ busy, onSubmit }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  return (
    <form
      className="space-y-4"
      onSubmit={(e) => {
        e.preventDefault();
        onSubmit({ username, password });
      }}
    >
      <div className="space-y-1">
        <label className="text-[10px] font-bold uppercase tracking-wide text-slate-500 dark:text-slate-400">
          Username
        </label>
        <div className="relative">
          <FiUser className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-full rounded-2xl border border-slate-200 bg-slate-50 py-3 pl-10 pr-4 text-sm font-medium text-slate-900 outline-none transition focus:bg-white focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 dark:bg-slate-800 dark:border-slate-700 dark:text-white dark:focus:bg-slate-800"
            placeholder="Masukkan username"
            autoComplete="username"
            required
          />
        </div>
      </div>

      <div className="space-y-1">
        <label className="text-[10px] font-bold uppercase tracking-wide text-slate-500 dark:text-slate-400">
          Password
        </label>
        <div className="relative">
          <FiLock className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full rounded-2xl border border-slate-200 bg-slate-50 py-3 pl-10 pr-4 text-sm font-medium text-slate-900 outline-none transition focus:bg-white focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 dark:bg-slate-800 dark:border-slate-700 dark:text-white dark:focus:bg-slate-800"
            placeholder="Masukkan password"
            type="password"
            autoComplete="current-password"
            required
          />
        </div>
      </div>

      <button
        type="submit"
        disabled={busy}
        className="inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-slate-900 px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-slate-900/20 transition hover:bg-slate-800 disabled:opacity-70 dark:bg-blue-600 dark:hover:bg-blue-500"
      >
        <FiLogIn />
        {busy ? "Memproses..." : "Login"}
      </button>
    </form>
  );
}
