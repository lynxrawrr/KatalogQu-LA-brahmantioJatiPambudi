import { FiX, FiTag } from "react-icons/fi";

export default function ProductDetailModal({ open, product, onClose }) {
  if (!open || !product) return null;

  const title = product.title ?? "Untitled";
  const image = product.image ?? "";
  const category = product.category ?? "—";
  const price =
    typeof product.price === "number" ? product.price : Number(product.price || 0);
  const desc = product.description ?? "—";

  return (
    <div className="fixed inset-0 z-40 grid place-items-center bg-slate-900/40 p-4 backdrop-blur-sm dark:bg-black/60">
      <div className="w-full max-w-3xl overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-2xl dark:bg-slate-900 dark:border-slate-800 animate-in fade-in zoom-in-95 duration-200">
        <div className="flex items-center justify-between border-b border-slate-200 px-5 py-4 dark:border-slate-800">
          <div className="min-w-0">
            <div className="truncate text-base font-semibold text-slate-900 dark:text-white">
              Detail Produk
            </div>
            <div className="mt-0.5 truncate text-sm text-slate-500 dark:text-slate-400">{title}</div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="rounded-2xl p-2 text-slate-500 hover:bg-slate-100 hover:text-slate-700 dark:text-slate-400 dark:hover:bg-slate-800 dark:hover:text-white"
            aria-label="Close detail modal"
          >
            <FiX />
          </button>
        </div>

        <div className="grid gap-6 p-5 md:grid-cols-[320px,1fr]">
          <div className="rounded-3xl border border-slate-200 bg-slate-50 p-4 dark:bg-slate-800 dark:border-slate-700">
            {image ? (
              <img
                src={image}
                alt={title}
                className="h-64 w-full object-contain"
                loading="lazy"
              />
            ) : (
              <div className="grid h-64 place-items-center text-sm text-slate-500">
                No image
              </div>
            )}

            <div className="mt-4 flex flex-wrap items-center gap-2">
              <span className="inline-flex items-center gap-1 rounded-2xl bg-white px-2.5 py-1 text-xs font-medium text-slate-700 shadow-sm dark:bg-slate-900 dark:text-slate-300">
                <FiTag />
                {category}
              </span>
              <span className="inline-flex items-center gap-1 rounded-2xl bg-slate-900 px-2.5 py-1 text-xs font-semibold text-white dark:bg-blue-600">
                ${price.toFixed(2)}
              </span>
            </div>
          </div>

          <div className="min-w-0">
            <h2 className="text-lg font-semibold text-slate-900 dark:text-white">{title}</h2>
            <p className="mt-3 whitespace-pre-wrap text-sm leading-relaxed text-slate-600 dark:text-slate-300">
              {desc}
            </p>

            <div className="mt-6 flex justify-end">
              <button
                type="button"
                onClick={onClose}
                className="rounded-2xl border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-50 dark:bg-slate-800 dark:border-slate-700 dark:text-white dark:hover:bg-slate-700"
              >
                Tutup
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}