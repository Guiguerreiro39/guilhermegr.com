"use client";

import { cn } from "@/lib/utils";
import { ComponentProps } from "react";

type Props = ComponentProps<"button"> & {
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
};

export const Button = ({
  leftIcon,
  children,
  rightIcon,
  className,
  ...props
}: Props) => {
  return (
    <button
      className={cn(
        "group flex-center text-primary-foreground font-secondary theme-element bg-primary relative z-10 h-fit w-fit cursor-pointer gap-2 overflow-hidden rounded-full px-7 py-3 focus:outline-none",
        className,
      )}
      {...props}
    >
      {leftIcon}
      <span className="inclide-flex japanese:text-base relative overflow-hidden text-sm uppercase">
        {children}
      </span>
      {rightIcon}
    </button>
  );
};
