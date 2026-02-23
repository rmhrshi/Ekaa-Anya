"use client";
import { createContext, useContext, useState, useCallback, ReactNode } from "react";

type ToastType = "success" | "error" | "info";
interface Toast { id: number; message: string; type: ToastType; }
interface ToastCtx { showToast: (message: string, type?: ToastType) => void; }

const ToastContext = createContext<ToastCtx>({ showToast: () => {} });
export const useToast = () => useContext(ToastContext);

const borderColor: Record<ToastType, string> = {
  success: "#22c55e",
  error: "#ef4444",
  info: "#C9956A",
};
const bgColor: Record<ToastType, string> = {
  success: "#f0fdf4",
  error: "#fef2f2",
  info: "#fdf8f5",
};

let toastId = 0;

export function ToastProvider({ children }: { children: ReactNode }) {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const showToast = useCallback((message: string, type: ToastType = "info") => {
    const id = ++toastId;
    setToasts(prev => [...prev, { id, message, type }]);
    setTimeout(() => {
      setToasts(prev => prev.filter(t => t.id !== id));
    }, 4200);
  }, []);

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      <div className="fixed bottom-6 right-6 z-[9000] flex flex-col gap-3 pointer-events-none">
        {toasts.map(toast => (
          <div
            key={toast.id}
            className="toast-enter pointer-events-auto w-72 rounded-xl shadow-xl overflow-hidden"
            style={{ background: bgColor[toast.type] }}
          >
            <div className="flex items-center gap-3 px-4 py-3" style={{ borderLeft: `3px solid ${borderColor[toast.type]}` }}>
              <span className="text-sm font-medium text-[#1A1A2E]">{toast.message}</span>
            </div>
            <div className="h-0.5 bg-gray-100">
              <div
                className="h-full toast-progress"
                style={{ background: borderColor[toast.type], animationDuration: "4s" }}
              />
            </div>
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  );
}
