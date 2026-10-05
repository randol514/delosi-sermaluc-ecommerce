import type { HTMLAttributes } from "react";
import styles from "./loading.module.sass";

interface LoadingProps extends HTMLAttributes<HTMLDivElement> {
  message?: string;
}

export const Loading = ({ className, ...props }: LoadingProps) => {
  const classes = [styles.loading, className].filter(Boolean).join(" ");

  return (
    <div className={classes} role="status" aria-live="polite" {...props}>
      <div className={styles.loading__panel}>
        <span className={styles.loading__spinner} aria-hidden="true" />
      </div>
    </div>
  );
};
