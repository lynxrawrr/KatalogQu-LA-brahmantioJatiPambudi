export default function ErrorState({
  title = "Gagal memuat data",
  message,
  actionText = "Coba lagi",
  onAction,
}) {
  return (
    <div className="rounded-3xl border border-rose-200 bg-rose-50 p-5 text-rose-800 dark:bg-rose-950/50 dark:border-rose-900 dark:text-rose-200 transition-colors">
      {" "}
      <div className="text-lg font-bold">{title}</div>{" "}
      {message ? (
        <div className="mt-1 text-sm text-rose-600 dark:text-rose-300">
          {" "}
          {message}{" "}
        </div>
      ) : null}{" "}
      {onAction ? (
        <button
          type="button"
          onClick={onAction}
          className="mt-4 inline-flex items-center rounded-2xl bg-rose-700 px-4 py-2 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-rose-800 dark:bg-rose-600 dark:hover:bg-rose-500"
        >
          {" "}
          {actionText}{" "}
        </button>
      ) : null}{" "}
    </div>
  );
}
