interface ButtonProps {
  label: string;
  onClick: () => void;
  variant?: "primary" | "secondary" | "danger" | "ghost";
  size?: "sm" | "md" | "lg";
  disabled?: boolean;
  fullWidth?: boolean;
  className?: string;
}

export default function Button({
  label,
  onClick,
  variant = "primary",
  size = "md",
  disabled = false,
  fullWidth = false,
  className = "",
}: ButtonProps) {
  const baseClass =
    "font-bold rounded-[9px] transition-all cursor-pointer border-none";

  const variantClass = {
    primary: "bg-[#c96332] text-white hover:bg-[#a34e24]",
    secondary:
      "bg-[#faf8f4] text-[#4a4438] border-2 border-[#ddd8cc] hover:border-[#c96332]",
    danger:
      "bg-[#edeae2] text-red-600 font-bold rounded-lg border-2 border-red-200 hover:bg-red-50",
    ghost: "bg-transparent text-[#c96332] hover:bg-[#faeade]",
  };

  const sizeClass = {
    sm: "px-3 py-1.5 text-xs",
    md: "px-4 py-2.5 text-sm",
    lg: "px-6 py-3.5 text-base",
  };

  const widthClass = fullWidth ? "w-full" : "";
  const disabledClass = disabled ? "opacity-50 cursor-not-allowed" : "";

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`${baseClass} ${variantClass[variant]} ${sizeClass[size]} ${widthClass} ${disabledClass} ${className}`}
    >
      {label}
    </button>
  );
}
