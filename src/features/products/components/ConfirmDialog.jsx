import { FiAlertTriangle } from "react-icons/fi";

export default function ConfirmDialog({
  open,
  title,
  description,
  confirmText = "Confirm",
  cancelText = "Cancel",
  onConfirm,
  onCancel,
  danger,
  busy,
}) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 grid place-items-center bg-slate-900/40 p-4 backdrop-blur-sm dark:bg-black/60 animate-in fade-in duration-500">
      <div className="w-full max-w-md overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-2xl dark:bg-slate-900 dark:border-slate-800 animate-in fade-in zoom-in-95 slide-in-from-top-8 duration-500 ease-out">
        <div className="flex items-start gap-3 border-b border-slate-200 p-5 dark:border-slate-800">
          <div
            className={`mt-0.5 grid h-10 w-10 place-items-center rounded-2xl ${
              danger ? "bg-rose-50 text-rose-700 dark:bg-rose-900/30 dark:text-rose-400" : "bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300"
            }`}
          >
            <FiAlertTriangle />
          </div>
          <div className="min-w-0">
            <div className="text-base font-semibold text-slate-900 dark:text-white">{title}</div>
            <div className="mt-1 text-sm text-slate-600 dark:text-slate-400">{description}</div>
          </div>
        </div>

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
            className={`inline-flex items-center justify-center rounded-2xl px-4 py-2 text-sm font-semibold text-white shadow-sm disabled:opacity-60 ${
              danger ? "bg-rose-700 hover:bg-rose-800 dark:bg-rose-600 dark:hover:bg-rose-500" : "bg-slate-900 hover:bg-slate-800 dark:bg-blue-600 dark:hover:bg-blue-500"
            }`}
          >
            {confirmText}
          </button>
        </div>
      </div>
    </div>
  );
}