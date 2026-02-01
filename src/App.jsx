import { Navigate, Route, Routes } from "react-router-dom";
import Layout from "./components/Layout.jsx";
import ProtectedRoute from "./components/ProtectedRoute.jsx";
import ProductsPageContainer from "./features/products/containers/ProductsPageContainer.jsx";
import LoginPageContainer from "./features/auth/containers/LoginPageContainer.jsx";
import NotFoundPage from "./features/misc/pages/NotFoundPage.jsx";

import useAuth from "./hooks/useAuth.js";

export default function App() {
  const { isAuthed, username, login, logout } = useAuth();

  return (
    <Layout isAuthed={isAuthed} username={username} onLogout={logout}>
      <Routes>
        <Route
          path="/login"
          element={
            isAuthed ? (
              <Navigate to="/products" replace />
            ) : (
              <LoginPageContainer onLogin={login} />
            )
          }
        />

        <Route element={<ProtectedRoute isAuthed={isAuthed} />}>
          <Route path="/products" element={<ProductsPageContainer />} />
        </Route>

        <Route
          path="/"
          element={<Navigate to={isAuthed ? "/products" : "/login"} replace />}
        />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </Layout>
  );
}
