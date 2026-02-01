import { useMemo, useState } from "react";
import { FiX, FiSave, FiPlus, FiImage } from "react-icons/fi";

function getInitialValues(mode, initial) {
  if (mode === "edit" && initial) {
    return {
      title: initial.title ?? "",
      price: initial.price ?? "",
      description: initial.description ?? "",
      category: initial.category ?? "",
      image: initial.image ?? "",
    };
  }
  return { title: "", price: "", description: "", category: "", image: "" };
}

export default function ProductFormModal({
  open,
  mode = "create",
  initial,
  categories = [],
  busy,
  onClose,
  onSubmit,
}) {
  const titleText = mode === "edit" ? "Edit Produk" : "Tambah Produk";
  const actionText = mode === "edit" ? "Simpan" : "Tambah";

  const [values, setValues] = useState(() => getInitialValues(mode, initial));

  const categoryOptions = useMemo(() => {
    const set = new Set((categories || []).filter(Boolean));
    const current = String(values.category || "").trim();
    if (current) set.add(current);
    return Array.from(set);
  }, [categories, values.category]);

  if (!open) return null;

  function setField(key, val) {
    setValues((prev) => ({ ...prev, [key]: val }));
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
      <div
        className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm transition-opacity dark:bg-black/60"
        onClick={onClose}
      />

      <div className="relative flex flex-col w-full max-w-xl max-h-[90vh] overflow-hidden rounded-4xl bg-white shadow-2xl animate-in fade-in zoom-in-95 duration-200 dark:bg-slate-900 dark:shadow-black/50 dark:border dark:border-slate-800">
        {/* Header */}
        <div className="flex flex-none items-center justify-between border-b border-slate-100 px-6 py-4 bg-white z-10 dark:bg-slate-900 dark:border-slate-800">
          <div>
            <h2 className="text-lg font-bold text-slate-900 dark:text-white">
              {titleText}
            </h2>
          </div>
          <button
            type="button"
            onClick={onClose}
            disabled={busy}
            className="rounded-full bg-slate-50 p-2 text-slate-400 hover:bg-slate-100 hover:text-slate-700 transition dark:bg-slate-800 dark:hover:bg-slate-700 dark:hover:text-white"
          >
            <FiX className="text-lg" />
          </button>
        </div>

        {/* Body */}
        <div className="flex-1 overflow-y-auto p-6 scroll-smooth">
          <form
            id="product-form"
            className="flex flex-col gap-5"
            onSubmit={(e) => {
              e.preventDefault();
              onSubmit(values);
            }}
          >
            <div className="flex gap-4 items-start">
              <div className="flex-none w-24 h-24 sm:w-28 sm:h-28 overflow-hidden rounded-2xl border border-slate-200 bg-slate-50 dark:bg-slate-800 dark:border-slate-700">
                {values.image ? (
                  <img
                    src={values.image}
                    alt="Preview"
                    className="h-full w-full object-contain p-1"
                  />
                ) : (
                  <div className="flex h-full flex-col items-center justify-center text-slate-400 dark:text-slate-600">
                    <FiImage className="text-2xl" />
                  </div>
                )}
              </div>
              <div className="flex-1 space-y-3">
                <div className="space-y-1">
                  <label className="text-[10px] font-bold uppercase tracking-wide text-slate-500 dark:text-slate-400">
                    URL Gambar
                  </label>
                  <input
                    value={values.image}
                    onChange={(e) => setField("image", e.target.value)}
                    className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-sm outline-none focus:bg-white focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition dark:bg-slate-800 dark:border-slate-700 dark:text-white dark:focus:bg-slate-800"
                    placeholder="Tambahkan URL gambar produk"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-[10px] font-bold uppercase tracking-wide text-slate-500 dark:text-slate-400">
                    Kategori
                  </label>
                  <select
                    value={values.category}
                    onChange={(e) => setField("category", e.target.value)}
                    className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition cursor-pointer dark:bg-slate-800 dark:border-slate-700 dark:text-white"
                    required
                  >
                    <option value="">Pilih Kategori</option>
                    {categoryOptions.map((c) => (
                      <option key={c} value={c}>
                        {c}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>

            <div className="space-y-1">
              <label className="text-[10px] font-bold uppercase tracking-wide text-slate-500 dark:text-slate-400">
                Nama Produk
              </label>
              <input
                value={values.title}
                onChange={(e) => setField("title", e.target.value)}
                className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5 text-sm font-medium outline-none focus:bg-white focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition dark:bg-slate-800 dark:border-slate-700 dark:text-white dark:focus:bg-slate-800"
                placeholder="Tambahkan nama produk"
                required
              />
            </div>

            <div className="space-y-1">
              <label className="text-[10px] font-bold uppercase tracking-wide text-slate-500 dark:text-slate-400">
                Harga
              </label>
              <input
                value={values.price}
                onChange={(e) => setField("price", e.target.value)}
                className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5 text-sm font-medium outline-none focus:bg-white focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition dark:bg-slate-800 dark:border-slate-700 dark:text-white dark:focus:bg-slate-800"
                placeholder="Tambahkan harga produk"
                inputMode="decimal"
                required
              />
            </div>

            <div className="space-y-1">
              <label className="text-[10px] font-bold uppercase tracking-wide text-slate-500 dark:text-slate-400">
                Deskripsi
              </label>
              <textarea
                value={values.description}
                onChange={(e) => setField("description", e.target.value)}
                rows={4}
                className="w-full resize-none rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5 text-sm font-medium outline-none focus:bg-white focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition dark:bg-slate-800 dark:border-slate-700 dark:text-white dark:focus:bg-slate-800"
                placeholder="Tambahkan deskripsi produk"
              />
            </div>
          </form>
        </div>

        {/* Footer */}
        <div className="flex flex-none items-center justify-end gap-3 border-t border-slate-100 px-6 py-4 bg-slate-50 dark:bg-slate-900 dark:border-slate-800">
          <button
            type="button"
            onClick={onClose}
            disabled={busy}
            className="rounded-xl px-5 py-2.5 text-sm font-semibold text-slate-600 hover:bg-white hover:shadow-sm disabled:opacity-50 transition dark:text-slate-400 dark:hover:bg-slate-800"
          >
            Batal
          </button>
          <button
            type="submit"
            form="product-form"
            disabled={busy}
            className="inline-flex items-center gap-2 rounded-xl bg-slate-900 px-6 py-2.5 text-sm font-semibold text-white shadow-lg shadow-slate-900/20 hover:bg-slate-800 disabled:opacity-70 transition transform hover:-translate-y-px dark:bg-blue-600 dark:shadow-blue-900/20 dark:hover:bg-blue-500"
          >
            {mode === "edit" ? <FiSave /> : <FiPlus />}
            {busy ? "Menyimpan..." : actionText}
          </button>
        </div>
      </div>
    </div>
  );
}
