import { useState } from "react";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";

const Input = ({
  value,
  onChange,
  placeholder,
  label,
  type = "text",
  hint,
  error,
  ...rest
}) => {
  const [showPassword, setShowPassword] = useState(false);
  const inputType =
    type === "password" ? (showPassword ? "text" : "password") : type;

  return (
    <div className="flex flex-col gap-1.5">
      {label && (
        <label className="text-[13px] font-medium text-slate-700">{label}</label>
      )}
      <div className="relative">
        <input
          {...rest}
          type={inputType}
          value={value}
          placeholder={placeholder}
          onChange={(e) => onChange?.(e)}
          className={`input-box ${
            error ? "border-rose-300! focus:border-rose-500!" : ""
          } ${type === "password" ? "pr-11" : ""}`}
        />
        {type === "password" && (
          <button
            type="button"
            aria-label={showPassword ? "Hide password" : "Show password"}
            onClick={() => setShowPassword((s) => !s)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-700 cursor-pointer"
          >
            {showPassword ? <FaRegEye size={18} /> : <FaRegEyeSlash size={18} />}
          </button>
        )}
      </div>
      {error ? (
        <p className="text-xs text-rose-600">{error}</p>
      ) : (
        hint && <p className="text-xs text-slate-500">{hint}</p>
      )}
    </div>
  );
};

export default Input;
