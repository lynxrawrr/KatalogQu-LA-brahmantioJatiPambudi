import { useMemo, useRef, useState } from "react";
import Toast from "./Toast.jsx";
import { ToastCtx } from "./toast.context.js";

export default function ToastProvider({ children }) {
  const [toast, setToast] = useState({ open: false, type: "info", title: "", message: "" });
  const tRef = useRef(null);

  const api = useMemo(() => {
    function show(type, title, message, ms = 2600) {
      setToast({ open: true, type, title, message });
      clearTimeout(tRef.current);
      tRef.current = setTimeout(() => setToast((t) => ({ ...t, open: false })), ms);
    }
    return {
      show,
      success: (title, message, ms) => show("success", title, message, ms),
      error: (title, message, ms) => show("error", title, message, ms),
      info: (title, message, ms) => show("info", title, message, ms),
      close: () => setToast((t) => ({ ...t, open: false })),
    };
  }, []);

  return (
    <ToastCtx.Provider value={api}>
      {children}
      <Toast
        open={toast.open}
        type={toast.type}
        title={toast.title}
        message={toast.message}
        onClose={() => setToast((t) => ({ ...t, open: false }))}
      />
    </ToastCtx.Provider>
  );
}
