import React from "react";

type Props = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "primary" | "secondary" | "ghost";
  size?: "sm" | "md" | "lg";
};

const base =
  "inline-flex items-center justify-center gap-2 rounded-xl font-semibold transition focus:outline-none focus:ring-2 focus:ring-cyan-400/40 disabled:opacity-60 disabled:cursor-not-allowed";

const variants: Record<string, string> = {
  primary:
    "bg-cyan-500 text-slate-950 hover:bg-cyan-400 shadow-[0_0_0_1px_rgba(34,211,238,0.25)]",
  secondary:
    "bg-white/5 text-white hover:bg-white/10 border border-white/10",
  ghost: "bg-transparent text-white/80 hover:text-white hover:bg-white/5",
};

const sizes: Record<string, string> = {
  sm: "px-3 py-2 text-sm",
  md: "px-4 py-3 text-sm",
  lg: "px-5 py-3.5 text-base",
};

export default function Button({
  variant = "primary",
  size = "md",
  className = "",
  ...props
}: Props) {
  return (
    <button
      className={`${base} ${variants[variant]} ${sizes[size]} ${className}`}
      {...props}
    />
  );
}
