import { FiGithub, FiMoon, FiSun, FiLogOut } from "react-icons/fi";
import { useLocation } from "react-router-dom";
import { useState } from "react";
import Logo from "../assets/katalogqu.png";
import useHideOnScroll from "../hooks/useHideOnScroll.js";
import useDarkMode from "../hooks/useDarkMode.js";
import LogoutConfirmDialog from "./LogoutConfirmDialog.jsx";

export default function Layout({ children, isAuthed, username, onLogout }) {
  const hidden = useHideOnScroll({ threshold: 10, topOffset: 8 });
  const { isDark, toggle } = useDarkMode();
  const loc = useLocation();

  const onLoginPage = loc.pathname === "/login";
  const [logoutOpen, setLogoutOpen] = useState(false);

  function askLogout() {
    setLogoutOpen(true);
  }
  function cancelLogout() {
    setLogoutOpen(false);
  }
  function confirmLogout() {
    setLogoutOpen(false);
    onLogout?.();
  }

  return (
    <div className="min-h-dvh w-full flex flex-col font-sans text-slate-900 dark:text-slate-100 selection:bg-blue-500 selection:text-white transition-colors duration-300">
      <div className="fixed inset-0 -z-10 h-full w-full bg-[#f8fafc] dark:bg-slate-950 transition-colors duration-300" />

      <header
        className={[
          "sticky top-0 z-30 w-full text-white shadow-lg shadow-slate-900/5 dark:shadow-black/20",
          "bg-slate-900 dark:bg-slate-900/80 dark:backdrop-blur-md dark:border-b dark:border-slate-800",
          "transition-all duration-300 will-change-transform",
          hidden ? "-translate-y-full" : "translate-y-0",
        ].join(" ")}
      >
        <div className="mx-auto flex max-w-7xl items-center gap-4 px-4 py-4 sm:px-6 lg:px-8">
          {/* Brand */}
          <div className="flex items-center gap-4 shrink-0">
            <div className="flex items-center gap-3">
              <div className="grid h-10 w-10 place-items-center rounded-xl bg-white shadow-sm ring-1 ring-white/20">
                <img src={Logo} alt="KatalogQu Logo" className="h-8 w-8" />
              </div>
              <div className="leading-tight">
                <div className="font-bold tracking-tight text-white sm:text-lg">
                  KatalogQu
                </div>
                <div className="text-[10px] font-medium uppercase tracking-wider text-slate-400">
                  Dashboard
                </div>
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="flex items-center gap-3 shrink-0 ml-auto">
            {!onLoginPage && isAuthed ? (
              <>
                <div className="hidden sm:flex h-9 items-center gap-2 rounded-full border border-slate-700 bg-slate-800 px-3 py-2 text-sm font-semibold text-slate-200">
                  <span className="text-slate-400">Hi,</span>
                  <span className="text-white">{username || "User"}</span>
                </div>

                <button
                  onClick={toggle}
                  className="group grid h-9 w-9 place-items-center rounded-full bg-slate-800 text-slate-300 transition hover:bg-slate-700 hover:text-white dark:bg-slate-800 dark:text-yellow-400 dark:hover:bg-slate-700"
                  aria-label="Toggle Dark Mode"
                >
                  {isDark ? (
                    <FiSun className="text-lg" />
                  ) : (
                    <FiMoon className="text-lg" />
                  )}
                </button>

                <button
                  type="button"
                  onClick={askLogout}
                  className="grid h-9 w-9 place-items-center rounded-full border border-slate-700 bg-slate-800 text-slate-200 transition hover:bg-slate-700 hover:text-white hover:border-slate-600"
                  aria-label="Logout"
                  title="Logout"
                >
                  <FiLogOut className="transition group-hover:scale-110" />
                </button>
              </>
            ) : (
              <>
                <button
                  onClick={toggle}
                  className="group grid h-9 w-9 place-items-center rounded-full bg-slate-800 text-slate-300 transition hover:bg-slate-700 hover:text-white dark:bg-slate-800 dark:text-yellow-400 dark:hover:bg-slate-700"
                  aria-label="Toggle Dark Mode"
                >
                  {isDark ? (
                    <FiSun className="text-lg" />
                  ) : (
                    <FiMoon className="text-lg" />
                  )}
                </button>

                <a
                  className="group inline-flex items-center gap-2 rounded-full border border-slate-700 bg-slate-800 px-4 py-2 text-sm font-semibold text-slate-200 transition hover:bg-slate-700 hover:text-white hover:border-slate-600"
                  href="https://github.com/lynxrawrr"
                  target="_blank"
                  rel="noreferrer"
                  aria-label="Open GitHub"
                >
                  <FiGithub className="transition group-hover:scale-110" />
                  <span className="hidden sm:inline">GitHub</span>
                </a>
              </>
            )}
          </div>
        </div>
      </header>

      <main className="mx-auto flex-1 w-full max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        {children}
      </main>

      <LogoutConfirmDialog
        open={logoutOpen}
        onCancel={cancelLogout}
        onConfirm={confirmLogout}
        title="Logout?"
        description="Kamu akan keluar dari sesi saat ini."
        confirmText="Logout"
        cancelText="Batal"
      />

      <footer className="border-t border-slate-200 bg-slate-100 py-10 text-center dark:border-slate-800 dark:bg-slate-900 transition-colors duration-300">
        <div className="mx-auto max-w-7xl px-4 text-sm font-medium text-slate-500 dark:text-slate-400 sm:px-6">
          <p>Copyright &copy; 2026 KatalogQu. All Rights Reserved.</p>
          <div className="mt-3 flex items-center justify-center gap-2">
            <p>
              Made with ❤️ by{" "}
              <span className="text-slate-900 font-bold dark:text-white">
                Bramii
              </span>
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
