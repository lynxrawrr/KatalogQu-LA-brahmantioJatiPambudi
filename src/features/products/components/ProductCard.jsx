import { FiEdit2, FiTrash2, FiTag } from "react-icons/fi";

export default function ProductCard({ product, onEdit, onDelete, onDetail }) {
  const title = product?.title ?? "Untitled";
  const image = product?.image ?? "";
  const category = product?.category ?? "—";
  const price =
    typeof product?.price === "number"
      ? product.price
      : Number(product?.price || 0);

  return (
    <article 
      className="group relative flex flex-col h-full overflow-hidden rounded-4xl bg-white transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_20px_40px_-12px_rgba(0,0,0,0.1)] shadow-[0_2px_10px_-3px_rgba(6,81,237,0.1)] border border-slate-100 dark:bg-slate-900 dark:border-slate-800 dark:shadow-none dark:hover:shadow-[0_10px_30px_-10px_rgba(0,0,0,0.5)]"
    >
      <div className="relative flex h-52 sm:h-64 w-full items-center justify-center bg-white p-6 dark:bg-slate-800">
        
        {/* Detail Click overlay */}
        <div 
            onClick={() => onDetail?.(product)}
            className="absolute inset-0 z-10 cursor-pointer" 
        />
        
        {image ? (
          <img
            src={image}
            alt={title}
            className="max-h-full w-full object-contain transition-transform duration-500 group-hover:scale-110"
            loading="lazy"
          />
        ) : (
          <div className="text-sm text-slate-400">No image</div>
        )}
        
        {/* Category Badge Floating */}
        <div className="absolute top-4 left-4 z-20">
             <span className="inline-flex items-center gap-1.5 rounded-full border border-slate-100 bg-white/90 px-3 py-1 text-[10px] font-bold uppercase tracking-wide text-slate-600 backdrop-blur-sm shadow-sm dark:bg-slate-900/90 dark:border-slate-700 dark:text-slate-300">
                <FiTag className="text-[10px]" />
                {category}
             </span>
        </div>
      </div>

      {/* Content Area */}
      <div className="flex flex-1 flex-col p-5 border-t border-slate-50 dark:border-slate-800">
        <div className="mb-4 flex-1 cursor-pointer" onClick={() => onDetail?.(product)}>
          <h3 className="line-clamp-2 text-base font-bold leading-snug text-slate-800 transition group-hover:text-blue-600 dark:text-slate-100 dark:group-hover:text-blue-400">
            {title}
          </h3>
        </div>

        <div className="flex items-center justify-between pt-2">
          <div className="text-lg font-bold text-slate-900 dark:text-white">
            ${price.toFixed(2)}
          </div>
          
          <div className="flex gap-2">
            <button
              type="button"
              onClick={() => onEdit(product)}
              className="group/btn grid h-9 w-9 place-items-center rounded-full bg-slate-50 text-slate-500 transition hover:bg-slate-900 hover:text-white dark:bg-slate-800 dark:text-slate-400 dark:hover:bg-slate-700 dark:hover:text-white"
              title="Edit"
            >
              <FiEdit2 className="text-sm" />
            </button>
            <button
              type="button"
              onClick={() => onDelete(product)}
              className="group/btn grid h-9 w-9 place-items-center rounded-full bg-rose-50 text-rose-500 transition hover:bg-rose-600 hover:text-white dark:bg-slate-800 dark:text-rose-400 dark:hover:bg-rose-600 dark:hover:text-white"
              title="Delete"
            >
              <FiTrash2 className="text-sm" />
            </button>
          </div>
        </div>
      </div>
    </article>
  );
}