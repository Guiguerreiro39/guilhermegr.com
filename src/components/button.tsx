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
        "group flex-center text-foreground theme-element bg-primary relative z-10 h-fit w-fit cursor-pointer gap-2 overflow-hidden rounded-full px-7 py-4 focus:outline-none",
        className,
      )}
      {...props}
    >
      {leftIcon}
      <span className="inclide-flex font-text relative overflow-hidden text-xs uppercase">
        {children}
      </span>
      {rightIcon}
    </button>
  );
};
