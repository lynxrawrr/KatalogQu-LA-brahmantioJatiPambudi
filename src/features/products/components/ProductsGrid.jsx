import ProductCard from "./ProductCard.jsx";

export default function ProductsGrid({ items, onEdit, onDelete, onDetail }) {
  if (!items?.length) {
    return (
      <div className="rounded-3xl border border-slate-200 bg-white p-10 text-center shadow-sm dark:bg-slate-900 dark:border-slate-800 transition-colors duration-300">
        <div className="text-lg font-semibold text-slate-900 dark:text-white">
          Tidak ada produk
        </div>
        <div className="mt-1 text-sm text-slate-500 dark:text-slate-400">
          Coba ubah filter atau tambah produk baru.
        </div>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {items.map((p) => (
        <ProductCard
          key={p.id}
          product={p}
          onEdit={onEdit}
          onDelete={onDelete}
          onDetail={onDetail}
        />
      ))}
    </div>
  );
}
