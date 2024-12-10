import React from "react";

const buttonVariants = (variant, size) => {
  const baseClasses =
    "inline-flex items-center justify-center gap-2 whitespace-nowrap text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50";

  const variantClasses = {
    default:
      "bg-white rounded-full text-primary-foreground hover:bg-primary/90",
    destructive:
      "bg-destructive  rounded-full text-destructive-foreground hover:bg-destructive/90",
    outline:
      "border  rounded-full border-gray-600 bg-background hover:bg-accent hover:text-accent-foreground",
    secondary:
      "bg-secondary  rounded-full text-secondary-foreground hover:bg-secondary/80",
    ghost: "hover:bg-accent  rounded-full hover:text-accent-foreground",
    link: "text-primary  rounded-full underline-offset-4 hover:underline",
  };

  const sizeClasses = {
    default: "h-10 px-4 py-2",
    sm: "h-9  px-3",
    lg: "h-11  px-8",
    icon: "h-10 w-10",
  };

  return `${baseClasses} ${variantClasses[variant] || variantClasses.default} ${
    sizeClasses[size] || sizeClasses.default
  }`;
};

const Button = React.forwardRef(
  (
    {
      className = "",
      variant = "default",
      size = "default",
      asChild = false,
      children,
      ...props
    },
    ref
  ) => {
    const Component = asChild ? "span" : "button"; // Replace with "span" for asChild functionality
    return (
      <Component
        className={`${buttonVariants(variant, size)} ${className}`}
        ref={ref}
        {...props}
      >
        {children}
      </Component>
    );
  }
);

Button.displayName = "Button";

export { Button };
