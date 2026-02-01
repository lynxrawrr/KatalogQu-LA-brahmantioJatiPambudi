# KatalogQu - Dashboard Inventaris

Sebuah website dashboard untuk mengelola produk (Create, Read, Update, Delete) menggunakan **FakeStoreAPI** dan **React**.  Website memiliki **Auth (Login/Logout)** dan **proteksi halaman**.

---

##  Fitur Utama
- Read: menampilkan daftar produk dari FakeStoreAPI
- Create: menambah produk baru melalui form modal
- Update: mengedit produk melalui form modal
- Delete: menghapus produk dengan konfirmasi dialog
- Search & Filter: cari produk dan filter kategori
- Auth: login dengan username & password dari FakeStoreAPI
- Dark Mode: toggle light/dark
- Toast Notification: notifikasi sukses/gagal aksi CRUD

---

## Tech Stack

- React + Vite
- Tailwind CSS
- Axios
- React Icons
- React Router DOM

---

## Struktur Project
``` txt
katalog-qu-cth/
|_ public/
|_ src/
|   |_ api/
|   |   |_ http.js
|   |   |_ products.api.js
|   |   |_ auth.api.js
|   |
|   |_ assets/
|   |   |_ katalogqu.png
|   |
|   |_ components/
|   |   |_ Layout.jsx
|   |   |_ ProtectedRoute.jsx
|   |   |_ LogoutConfirmDialog.jsx
|   |   |_ ErrorState.jsx
|   |   |_ Spinner.jsx
|   |   |_ toast/
|   |       |_ Toast.jsx
|   |       |_ ToastProvider.jsx
|   |       |_ toast.context.js
|   |
|   |_ features/
|   |   |_ auth/
|   |   |   |_ components/
|   |   |   |   |_ LoginForm.jsx
|   |   |   |_ containers/
|   |   |       |_ LoginPageContainer.jsx
|   |   |
|   |   |_ misc/
|   |   |   |_ pages/
|   |   |       |_ NotFoundPage.jsx
|   |   |
|   |   |_ products/
|   |       |_ components/
|   |       |   |_ ConfirmDialog.jsx
|   |       |   |_ ProductCard.jsx
|   |       |   |_ ProductDetailModal.jsx
|   |       |   |_ ProductFormModal.jsx
|   |       |   |_ ProductsGrid.jsx
|   |       |   |_ ProductsHeader.jsx
|   |       |_ containers/
|   |           |_ ProductsPageContainer.jsx
|   |
|   |_ hooks/
|   |   |_ useAuth.js
|   |   |_ useDarkMode.js
|   |   |_ useHideOnScroll.js
|   |
|   |_ styles/
|   |   |_ global.css
|   |
|   |_ App.jsx
|   |_ main.jsx
|
|_ index.html
|_ package.json
|_ vite.config.js
|_ README.md
```
---

## Instalasi & Menjalankan Project
#### 1) Clone repository
```bash
git clone <URL_REPO_KAMU>
cd katalog-qu
```

#### 2) Install dependencies dan jalankan development server
```bash
npm install
npm run dev
```

---
## Akun Login
```txt
Username: mor_2314
Password: 83r5^_
```

---
## Routes
- `/login` : halaman login
- `/products` : halaman produk (protected)
- `/*` : Not Found

---
## API yang Digunakan
Base URL: `https://fakestoreapi.com`

**Products**
- `GET /products` 
- `GET /products/categories` 
- `POST /products` 
- `PUT /products/:id` 
- `DELETE /products/:id` 

**Auth**
- `POST /auth/login`


## Penerapan Container/Presentational Pattern

#### 1. Container (Stateful)
**`ProductsPageContainer.jsx`**
- Mengelola state utama: list products, categories, loading, error, filter, modal state
- Menjalankan side effect fetch data (useEffect)
- Menangani aksi CRUD dan update state client
- Mengirim data + handler ke komponen UI via props

#### 2. Presentational (Stateless)
- `src/features/products/components/*`
- `src/features/auth/components/*`
- `src/components/*`

---

## Referensi
- https://medium.com/@vitorbritto/react-design-patterns-the-container-presentational-pattern-775b91aa0c49
- https://fakestoreapi.com/docs
- https://tailwindcss.com/docs/installation/using-vite
- https://medium.com/@okonidorenyin73/demo-store-api-documentation-a-sample-rest-api-for-e-commerce-applications-4b99d7f55f2b
- https://stackoverflow.com/questions/70622541/how-can-i-use-previous-location-to-redirect-user-in-react-router-v6