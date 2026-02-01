import { useEffect, useMemo, useState } from "react";
import { productsApi } from "../../../api/products.api.js";
import { useToast } from "../../../components/toast/toast.context.js";
import Spinner from "../../../components/Spinner.jsx";
import ProductsHeader from "../components/ProductsHeader.jsx";
import ProductsGrid from "../components/ProductsGrid.jsx";
import ProductFormModal from "../components/ProductFormModal.jsx";
import ConfirmDialog from "../components/ConfirmDialog.jsx";
import ProductDetailModal from "../components/ProductDetailModal.jsx";
import ErrorState from "../../../components/ErrorState.jsx";

function normalizePayload(form) {
  return {
    title: String(form.title || "").trim(),
    price: Number(form.price || 0),
    description: String(form.description || "").trim(),
    category: String(form.category || "").trim(),
    image: String(form.image || "").trim(),
  };
}

export default function ProductsPageContainer() {
  // core data state (READ)
  const [items, setItems] = useState([]);
  const [categories, setCategories] = useState([]);

  // ui state
  const [loading, setLoading] = useState(true);
  const [mutating, setMutating] = useState(false);
  const [error, setError] = useState("");

  // filters
  const [query, setQuery] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");

  // modal state
  const [formOpen, setFormOpen] = useState(false);
  const [editing, setEditing] = useState(null); 

  // confirm delete state
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [deleting, setDeleting] = useState(null);

  // toast
  const toast = useToast();

  // detail modal
  const [detailOpen, setDetailOpen] = useState(false);
  const [selected, setSelected] = useState(null);

  function openDetail(product) {
    setSelected(product);
    setDetailOpen(true);
  }

  async function loadAll() {
    setError("");
    setLoading(true);
    try {
      const [list, cats] = await Promise.all([
        productsApi.list(),
        productsApi.categories(),
      ]);
      setItems(Array.isArray(list) ? list : []);
      setCategories(Array.isArray(cats) ? cats : []);
    } catch (e) {
      setError(e?.message || "Failed to load products");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadAll();
  }, []);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return items.filter((p) => {
      const matchQuery =
        !q ||
        String(p.title || "")
          .toLowerCase()
          .includes(q) ||
        String(p.category || "")
          .toLowerCase()
          .includes(q);

      const matchCat =
        categoryFilter === "all" || String(p.category || "") === categoryFilter;

      return matchQuery && matchCat;
    });
  }, [items, query, categoryFilter]);

  // CREATE: buat produk via API lalu update UI state
  async function handleCreate(formValues) {
    const payload = normalizePayload(formValues);
    if (!payload.title)
      return toast.error("Validasi gagal", "Title wajib diisi.");
    if (!payload.category)
      return toast.error("Validasi gagal", "Category wajib diisi.");
    if (!payload.image)
      return toast.error("Validasi gagal", "Image URL wajib diisi.");
    setMutating(true);
    try {
      const created = await productsApi.create(payload);
      const local = {
        ...created,
        id: created?.id ?? Date.now(),
        ...payload,
      };

      setItems((prev) => [local, ...prev]);
      setFormOpen(false);
      setEditing(null);
      toast.success(
        "Produk ditambahkan",
        "Berhasil membuat produk baru.",
      );
    } catch (e) {
      toast.error(
        "Gagal menambah produk",
        e?.message || "Request failed",
      );
    } finally {
      setMutating(false);
    }
  }

  // UPDATE: update via API lalu replace item di state berdasarkan id
  async function handleUpdate(id, formValues) {
    const payload = normalizePayload(formValues);
    if (!payload.title)
      return toast.error("Validasi gagal", "Title wajib diisi.");
    if (!payload.category)
      return toast.error("Validasi gagal", "Category wajib diisi.");
    if (!payload.image)
      return toast.error("Validasi gagal", "Image URL wajib diisi.");

    setMutating(true);
    try {
      const updated = await productsApi.update(id, payload);

      const merged = { ...updated, ...payload, id };
      setItems((prev) => prev.map((p) => (p.id === id ? merged : p)));

      setFormOpen(false);
      setEditing(null);
      toast.success("Produk diperbarui", "Perubahan berhasil disimpan.");
    } catch (e) {
      toast.error("Gagal update produk", e?.message || "Request failed");
    } finally {
      setMutating(false);
    }
  }

  // DELETE: hapus via API lalu remove item dari state lokal.
  function askDelete(product) {
    setDeleting(product);
    setConfirmOpen(true);
  }

  async function confirmDelete() {
    if (!deleting) return;
    const id = deleting.id;

    setMutating(true);
    try {
      await productsApi.remove(id);
      setItems((prev) => prev.filter((p) => p.id !== id));
      toast.success(
        "Produk dihapus",
        "Produk berhasil dihapus dari daftar.",
      );
    } catch (e) {
      toast.error("Gagal hapus produk", e?.message || "Request failed");
    } finally {
      setMutating(false);
      setConfirmOpen(false);
      setDeleting(null);
    }
  }

  function openCreate() {
    setEditing(null);
    setFormOpen(true);
  }

  function openEdit(product) {
    setEditing(product);
    setFormOpen(true);
  }

  return (
    <>
      <div className="space-y-5">
        <div className="rounded-3xl border border-slate-200 bg-white p-4 shadow-sm sm:p-5 dark:bg-slate-900 dark:border-slate-800 transition-colors duration-300">
          <ProductsHeader
            total={items.length}
            showing={filtered.length}
            query={query}
            onQueryChange={setQuery}
            category={categoryFilter}
            categories={categories}
            onCategoryChange={setCategoryFilter}
            onAdd={openCreate}
            onRefresh={loadAll}
            busy={loading || mutating}
          />
        </div>

        {loading ? (
          <Spinner label="Memuat produk..." />
        ) : error ? (
          <ErrorState
            title="Gagal memuat data"
            message={error}
            actionText="Coba Lagi"
            onAction={loadAll}
          />
        ) : (
          <ProductsGrid
            items={filtered}
            onEdit={openEdit}
            onDelete={askDelete}
            onDetail={openDetail}
          />
        )}
      </div>

      <ProductFormModal
        key={editing ? `edit-${editing.id}` : "create"}
        open={formOpen}
        mode={editing ? "edit" : "create"}
        initial={editing}
        categories={categories}
        busy={mutating}
        onClose={() => {
          if (mutating) return;
          setFormOpen(false);
          setEditing(null);
        }}
        onSubmit={(values) => {
          if (editing) return handleUpdate(editing.id, values);
          return handleCreate(values);
        }}
      />

      <ConfirmDialog
        open={confirmOpen}
        title="Hapus produk?"
        description={
          deleting
            ? `Produk “${deleting.title}” akan dihapus dari daftar.`
            : "Produk akan dihapus."
        }
        confirmText={mutating ? "Menghapus..." : "Hapus"}
        cancelText="Batal"
        danger
        busy={mutating}
        onCancel={() => {
          if (mutating) return;
          setConfirmOpen(false);
          setDeleting(null);
        }}
        onConfirm={confirmDelete}
      />

      <ProductDetailModal
        open={detailOpen}
        product={selected}
        onClose={() => {
          setDetailOpen(false);
          setSelected(null);
        }}
      />
    </>
  );
}
