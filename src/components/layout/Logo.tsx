import Link from "next/link";
import { cn } from "@/lib/utils";

interface LogoProps {
  className?: string;
  size?: "sm" | "md" | "lg";
}

export function Logo({ className, size = "md" }: LogoProps) {
  const sizeClasses = {
    sm: "h-7 w-auto max-h-7",
    md: "h-9 w-auto max-h-9",
    lg: "h-12 w-auto max-h-12",
  };

  return (
    <Link href="/" className={cn("inline-flex items-center gap-2", className)}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/Logo-BG.png"
        alt="Mall ku Logo"
        className={cn(sizeClasses[size], "object-contain block")}
      />
    </Link>
  );
}