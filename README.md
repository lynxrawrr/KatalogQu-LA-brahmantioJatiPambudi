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
katalog-qu/
|__ public/
|__ src/
|   |__ api/
|   |   |__ http.js
|   |   |__ products.api.js
|   |   |__ auth.api.js
|   |
|   |__ assets/
|   |   |__ katalogqu.png
|   |
|   |__ components/
|   |   |__ Layout.jsx
|   |   |__ ProtectedRoute.jsx
|   |   |__ LogoutConfirmDialog.jsx
|   |   |__ ErrorState.jsx
|   |   |__ Spinner.jsx
|   |   |__ toast/
|   |       |_ Toast.jsx
|   |       |_ ToastProvider.jsx
|   |       |_ toast.context.js
|   |
|   |__ features/
|   |   |__ auth/
|   |   |   |__ components/
|   |   |   |   |__ LoginForm.jsx
|   |   |   |__ containers/
|   |   |       |__ LoginPageContainer.jsx
|   |   |
|   |   |__ misc/
|   |   |   |__ pages/
|   |   |       |__ NotFoundPage.jsx
|   |   |
|   |   |__ products/
|   |       |__ components/
|   |       |   |__ ConfirmDialog.jsx
|   |       |   |__ ProductCard.jsx
|   |       |   |__ ProductDetailModal.jsx
|   |       |   |__ ProductFormModal.jsx
|   |       |   |__ ProductsGrid.jsx
|   |       |   |__ ProductsHeader.jsx
|   |       |__ containers/
|   |           |__ ProductsPageContainer.jsx
|   |
|   |__ hooks/
|   |   |__ useAuth.js
|   |   |__ useDarkMode.js
|   |   |__ useHideOnScroll.js
|   |
|   |__ styles/
|   |   |__ global.css
|   |
|   |__ App.jsx
|   |__ main.jsx
|
|__ index.html
|__ package.json
|__ vite.config.js
|__ README.md
```
---

## Instalasi & Menjalankan Project
#### 1) Clone repository
```bash
git clone https://github.com/lynxrawrr/KatalogQu-LA-brahmantioJatiPambudi.git
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