import { useState } from "react";
import { useToast } from "../../../components/toast/toast.context.js";
import LoginForm from "../components/LoginForm.jsx";

export default function LoginPageContainer({ onLogin }) {
  const toast = useToast();
  const [busy, setBusy] = useState(false);

  async function handleSubmit(values) {
    setBusy(true);
    try {
      await onLogin(values);
      toast.success("Login berhasil", "Kamu berhasil masuk");
    } catch (e) {
      toast.error("Login gagal", e?.message);
    } finally {
      setBusy(false);
    }
  }

  return (
    <>
      <div className="mx-auto w-full max-w-xl px-4 sm:px-6">
        <div className="rounded-4xl border border-slate-200 bg-white p-6 shadow-sm dark:bg-slate-900 dark:border-slate-800 sm:p-8">
          <h1 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white">
            Login
          </h1>
          <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
            Masuk untuk mengelola produk dan melihat daftar user.
          </p>

          <div className="mt-6">
            <LoginForm busy={busy} onSubmit={handleSubmit} />
          </div>
        </div>
      </div>
    </>
  );
}
