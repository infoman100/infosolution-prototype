import React from "react";

export function Card({ children, className = "", ...props }) {
  return (
    <div
      className={`rounded-xl border bg-white text-slate-950 shadow ${className}`}
      {...props}
    >
      {children}
    </div>
  );
}

export function CardContent({ children, className = "", ...props }) {
  return (
    <div className={`p-6 ${className}`} {...props}>
      {children}
    </div>
  );
}