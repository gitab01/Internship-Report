import { useEffect } from "react";
import { LuX } from "react-icons/lu";

const Modal = ({ children, isOpen, onClose, title, description }) => {
  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e) => e.key === "Escape" && onClose?.();
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-slate-900/40 p-0 sm:p-4 overflow-y-auto"
      onMouseDown={(e) => e.target === e.currentTarget && onClose?.()}
    >
      <div className="relative w-full max-w-md bg-white rounded-t-2xl sm:rounded-2xl border border-line shadow-xl">
        <div className="flex items-start justify-between gap-4 px-5 sm:px-6 py-4 border-b border-line">
          <div>
            {title && (
              <h3 className="text-base font-semibold text-slate-900">{title}</h3>
            )}
            {description && (
              <p className="text-xs text-slate-500 mt-0.5">{description}</p>
            )}
          </div>
          <button
            type="button"
            aria-label="Close"
            onClick={onClose}
            className="-mr-1 p-1.5 rounded-lg text-slate-400 hover:text-slate-900 hover:bg-slate-100 transition cursor-pointer"
          >
            <LuX size={18} />
          </button>
        </div>
        <div className="px-5 sm:px-6 py-5 max-h-[70vh] overflow-y-auto">
          {children}
        </div>
      </div>
    </div>
  );
};

export default Modal;
