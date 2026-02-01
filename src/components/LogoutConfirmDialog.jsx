import { FiLogOut, FiX } from "react-icons/fi";

export default function LogoutConfirmDialog({
  open,
  title = "Logout?",
  description = "Kamu akan keluar dari akun ini dan perlu login lagi untuk masuk.",
  confirmText = "Logout",
  cancelText = "Batal",
  busy,
  onConfirm,
  onCancel,
}) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 grid place-items-center bg-slate-900/40 p-4 backdrop-blur-sm dark:bg-black/60">
      <div className="w-full max-w-md overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-2xl dark:bg-slate-900 dark:border-slate-800">
        {/* Header */}
        <div className="flex items-start justify-between gap-3 border-b border-slate-200 p-5 dark:border-slate-800">
          <div className="flex items-start gap-3">
            <div className="mt-0.5 grid h-10 w-10 place-items-center rounded-2xl bg-rose-50 text-rose-700 dark:bg-rose-900/30 dark:text-rose-300">
              <FiLogOut />
            </div>

            <div className="min-w-0">
              <div className="text-base font-semibold text-slate-900 dark:text-white">
                {title}
              </div>
              <div className="mt-1 text-sm text-slate-600 dark:text-slate-400">
                {description}
              </div>
            </div>
          </div>

          <button
            type="button"
            onClick={onCancel}
            disabled={busy}
            className="rounded-2xl p-2 text-slate-500 hover:bg-slate-100 hover:text-slate-700 disabled:opacity-60 dark:text-slate-400 dark:hover:bg-slate-800 dark:hover:text-white"
            aria-label="Close logout dialog"
          >
            <FiX />
          </button>
        </div>

        {/* Actions */}
        <div className="flex flex-col gap-2 p-5 sm:flex-row sm:justify-end">
          <button
            type="button"
            onClick={onCancel}
            disabled={busy}
            className="inline-flex items-center justify-center rounded-2xl border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-50 disabled:opacity-60 dark:bg-slate-800 dark:border-slate-700 dark:text-slate-300 dark:hover:bg-slate-700"
          >
            {cancelText}
          </button>

          <button
            type="button"
            onClick={onConfirm}
            disabled={busy}
            className="inline-flex items-center justify-center gap-2 rounded-2xl bg-rose-700 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-rose-800 disabled:opacity-60 dark:bg-rose-600 dark:hover:bg-rose-500"
          >
            {busy ? "Logging out..." : confirmText}
          </button>
        </div>
      </div>
    </div>
  );
}
