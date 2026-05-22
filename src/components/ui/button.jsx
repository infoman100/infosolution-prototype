import React from "react";

export function Button({
  children,
  className = "",
  variant = "default",
  ...props
}) {
  const base =
    "inline-flex items-center justify-center rounded-md px-4 py-2 text-sm font-medium transition disabled:pointer-events-none disabled:opacity-50";

  const variants = {
    default: "bg-slate-950 text-white hover:bg-slate-800",
    outline:
      "border border-slate-200 bg-white text-slate-950 hover:bg-slate-50",
  };

  return (
    <button
      className={`${base} ${variants[variant] || variants.default} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}