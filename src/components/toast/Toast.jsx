import { FiCheckCircle, FiAlertTriangle, FiInfo, FiX } from "react-icons/fi";

function iconByType(type) {
  if (type === "success") return <FiCheckCircle className="text-emerald-600 dark:text-emerald-400" />;
  if (type === "error") return <FiAlertTriangle className="text-rose-600 dark:text-rose-400" />;
  return <FiInfo className="text-sky-600 dark:text-sky-400" />;
}

export default function Toast({ open, type = "info", title, message, onClose }) {
  if (!open) return null;

  return (
    <div className="fixed bottom-5 right-5 z-50 w-[min(92vw,420px)] animate-in slide-in-from-right-5 fade-in duration-300">
      <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-xl dark:bg-slate-800 dark:border-slate-700 dark:shadow-black/30">
        <div className="flex items-start gap-3">
          <div className="mt-0.5 text-lg">{iconByType(type)}</div>

          <div className="min-w-0 flex-1">
            <div className="text-sm font-semibold text-slate-900 dark:text-white">
              {title || "Info"}
            </div>
            {message ? (
              <div className="mt-1 text-sm text-slate-600 dark:text-slate-300">{message}</div>
            ) : null}
          </div>

          <button
            type="button"
            onClick={onClose}
            className="rounded-xl p-2 text-slate-500 hover:bg-slate-100 hover:text-slate-700 dark:text-slate-400 dark:hover:bg-slate-700 dark:hover:text-white transition-colors"
            aria-label="Close toast"
          >
            <FiX />
          </button>
        </div>
      </div>
    </div>
  );
}