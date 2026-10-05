import type { ButtonHTMLAttributes, ReactNode } from "react";
import Link from "next/link";
import styles from "./button.module.sass";

type ButtonSize = "small" | "medium" | "big";
type ButtonVariant = "primary" | "secondary";
type IconPosition = "left" | "right";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  href?: string;
  size?: ButtonSize;
  variant?: ButtonVariant;
  rounded?: boolean;
  icon?: ReactNode;
  iconPosition?: IconPosition;
  children?: ReactNode;
}

export const Button = ({
  size = "medium",
  variant = "primary",
  rounded = false,
  icon,
  iconPosition = "right",
  children,
  className,
  href,
  type = "button",
  ...props
}: ButtonProps) => {
  const classes = [
    styles["site-btn"],
    styles[`site-btn--${size}`],
    styles[`site-btn--${variant}`],
    rounded && styles["site-btn--rounded"],
    icon && styles[`site-btn--icon-${iconPosition}`],
    className,
  ]
    .filter(Boolean)
    .join(" ");

  const iconElement = icon && (
    <span className={styles["site-btn__icon"]}>{icon}</span>
  );

  const content = (
    <span className={styles["site-btn__inside"]}>
      {iconPosition === "left" && iconElement}
      {children}
      {iconPosition === "right" && iconElement}
    </span>
  );

  if (href) {
    return (
      <Link className={classes} href={href}>
        {content}
      </Link>
    );
  }

  return (
    <button className={classes} type={type} {...props}>
      {content}
    </button>
  );
};
